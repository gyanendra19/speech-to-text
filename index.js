// index.js

import express from "express";
import multer from "multer";
import fs from "fs";
import dotenv from "dotenv";
import { DeepgramClient } from "@deepgram/sdk";

dotenv.config();

const app = express();
const upload = multer({ dest: "uploads/" });

const deepgram = new DeepgramClient({
  apiKey: process.env.DEEPGRAM_API_KEY,
});

// =====================================================
// 🧠 Medical dictionaries
// =====================================================
const MEDICAL_CONDITIONS = [
  "diabetes",
  "hypertension",
  "asthma",
  "cancer",
  "fever",
  "covid",
  "arthritis",
];

const MEDICAL_NORMALIZATION = {
  "high blood sugar": "diabetes",
  sugar: "diabetes",
  bp: "hypertension",
  "high bp": "hypertension",
  "high blood pressure": "hypertension",
  "covid-19": "covid",
};

// =====================================================
// 🧠 Condition extraction
// =====================================================
function extractConditions(text) {
  const lowerText = text.toLowerCase();
  return MEDICAL_CONDITIONS.filter((c) => lowerText.includes(c));
}

// =====================================================
// 🧠 Confidence logic
// =====================================================
function getConfidence(transcript, conditions) {
  if (!transcript) return "low";
  if (conditions.length > 0 && transcript.length > 20) return "high";
  if (conditions.length > 0) return "medium";
  return "low";
}

// =====================================================
// 🧠 Speaker formatting (fallback using words)
// =====================================================
function formatSpeakersFromWords(words) {
  const speakerMap = {};
  let charCode = 65; // A
  let result = "";
  let currentSpeaker = null;

  function getLabel(speaker) {
    if (!speakerMap[speaker]) {
      speakerMap[speaker] = String.fromCharCode(charCode++);
    }
    return speakerMap[speaker];
  }

  words.forEach((w) => {
    if (w.speaker !== currentSpeaker) {
      currentSpeaker = w.speaker;
      result += `\n${getLabel(currentSpeaker)}: `;
    }
    result += w.word + " ";
  });

  return result.trim();
}

function robustCorrectionPipeline(text) {
  let corrected = text;
  const corrections = [];

  // =========================
  // 1. Preserve speaker labels
  // =========================
  const parts = corrected.split(/(A:|B:|C:|D:)/g);

  for (let i = 0; i < parts.length; i++) {
    if (!parts[i].match(/^[A-D]:$/)) {
      let segment = parts[i];
      let originalSegment = segment;

      // =========================
      // 2. Basic grammar fixes
      // =========================
      segment = segment
        .replace(/\s+/g, " ")
        .replace(/\bi\b/g, "I")
        .replace(/\s+\./g, ".")
        .replace(/\s+,/g, ",")
        .trim();

      // Capitalize sentences
      segment = segment.replace(/(^\w|\.\s+\w)/g, (c) => c.toUpperCase());

      if (segment !== originalSegment) {
        corrections.push({
          from: originalSegment.trim(),
          to: segment.trim(),
          type: "grammar",
        });
      }

      // =========================
      // 3. Medical normalization
      // =========================
      Object.entries(MEDICAL_NORMALIZATION).forEach(([key, value]) => {
        const regex = new RegExp(`\\b${key}\\b`, "gi");

        if (regex.test(segment)) {
          segment = segment.replace(regex, value);

          corrections.push({
            from: key,
            to: value,
            type: "medical_normalization",
          });
        }
      });

      // =========================
      // 4. Negation handling
      // =========================
      segment = segment.replace(
        /\b(no|not|denies)\s+(diabetes|hypertension|asthma|cancer|fever|covid|arthritis)\b/gi,
        (match, neg, condition) => {
          corrections.push({
            from: match,
            to: `no ${condition}`,
            type: "negation",
          });
          return `no ${condition}`;
        },
      );

      // =========================
      // 5. Simple typo correction (basic fuzzy)
      // =========================
      MEDICAL_CONDITIONS.forEach((condition) => {
        const typoRegex = new RegExp(
          condition.slice(0, 4), // crude fuzzy match
          "gi",
        );

        if (typoRegex.test(segment) && !segment.includes(condition)) {
          segment = segment.replace(typoRegex, condition);

          corrections.push({
            from: "possible typo",
            to: condition,
            type: "typo_fix",
          });
        }
      });

      parts[i] = segment;
    }
  }

  corrected = parts.join("");

  return {
    correctedText: corrected.trim(),
    corrections,
  };
}
// =====================================================
// 📤 Upload API
// =====================================================
app.post("/transcribe", upload.single("audio"), async (req, res) => {
  try {
    const filePath = req.file.path;

    // 🎤 Deepgram transcription
    const result = await deepgram.listen.v1.media.transcribeFile(
      fs.createReadStream(filePath),
      {
        model: "nova-3",
        smart_format: true,
        diarize: true,
        utterances: true,
        punctuate: true,
      },
    );

    const alt = result.results.channels[0].alternatives[0];

    let transcriptText = "";

    // ✅ Prefer words (speaker separation)
    if (alt.words && alt.words.length > 0) {
      transcriptText = formatSpeakersFromWords(alt.words);
    } else {
      transcriptText = alt.transcript || "";
    }

    const { correctedText, corrections } =
      robustCorrectionPipeline(transcriptText);

    const conditions = extractConditions(correctedText);
    const confidence = getConfidence(correctedText, conditions);

    fs.unlinkSync(filePath);

    res.json({
      transcript: correctedText,
      conditions,
      confidence,
      corrections,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Transcription failed" });
  }
});

// =====================================================
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

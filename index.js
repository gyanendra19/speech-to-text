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


const MEDICAL_CONDITIONS = [
  "diabetes",
  "hypertension",
  "asthma",
  "cancer",
  "fever",
  "covid",
  "arthritis",
];

function extractConditions(text) {
  const lowerText = text.toLowerCase();
  return MEDICAL_CONDITIONS.filter((c) => lowerText.includes(c));
}

function getConfidence(transcript, conditions) {
  if (!transcript) return "low";
  if (conditions.length > 0 && transcript.length > 20) return "high";
  if (conditions.length > 0) return "medium";
  return "low";
}

function formatSpeakersFromWords(words) {
  const speakerMap = {};
  let charCode = 65;
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

app.post("/transcribe", upload.single("audio"), async (req, res) => {
  try {
    const filePath = req.file.path;

    // Deepgram transcription with diarization
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

    if (alt.words && alt.words.length > 0) {
      transcriptText = formatSpeakersFromWords(alt.words);
    }

    // Final fallback
    else {
      transcriptText = alt.transcript || "";
    }

    // Extract conditions
    const conditions = extractConditions(transcriptText);

    const confidence = getConfidence(transcriptText, conditions);

    fs.unlinkSync(filePath);

    res.json({
      transcript: transcriptText,
      conditions,
      confidence,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Transcription failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

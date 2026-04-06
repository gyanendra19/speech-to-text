// index.js

import express from "express";
import multer from "multer";
import fs from "fs";
import dotenv from "dotenv";
import { DeepgramClient } from "@deepgram/sdk";
import OpenAI from "openai";

dotenv.config();

const app = express();
const upload = multer({ dest: "uploads/" });

// Deepgram
const deepgram = new DeepgramClient({
  apiKey: process.env.DEEPGRAM_API_KEY,
});

// OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// =====================================================
// 🧠 Speaker formatting
// =====================================================
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

// =====================================================
// 🧠 AI Correction + Extraction
// =====================================================
async function processWithAI(transcriptText) {
  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    text: {
      format: {
        type: "json_schema",
        name: "medical_transcript",
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            transcript: {
              type: "string",
            },
            conditions: {
              type: "array",
              items: {
                type: "string",
              },
            },
            confidence: {
              type: "string",
              enum: ["low", "medium", "high"],
            },
            corrections: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false, // ✅ THIS is the key fix
                properties: {
                  from: {
                    type: "string",
                  },
                  to: {
                    type: "string",
                  },
                },
                required: ["from", "to"],
              },
            },
          },
          required: ["transcript", "conditions", "confidence", "corrections"],
        },
      },
    },
    input: [
      {
        role: "system",
        content: `
You are a medical transcription assistant.

Tasks:
1. Fix grammar, spelling, punctuation.
2. Normalize medical terminology.
3. Keep speaker labels (A:, B:) intact.
4. Extract medical conditions.
5. Assign confidence: low / medium / high.
6. Return corrections as point-wise changes.

Rules:
- Do NOT hallucinate conditions
- Respect negations like "no diabetes"
- Keep output clean
`,
      },
      {
        role: "user",
        content: transcriptText,
      },
    ],
  });

  return JSON.parse(response.output[0].content[0].text);
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

    if (alt.words && alt.words.length > 0) {
      transcriptText = formatSpeakersFromWords(alt.words);
    } else {
      transcriptText = alt.transcript || "";
    }

    // 🧠 AI processing
    const aiResult = await processWithAI(transcriptText);

    fs.unlinkSync(filePath);

    res.json(aiResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Transcription failed" });
  }
});

// =====================================================
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

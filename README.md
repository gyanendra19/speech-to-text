# 🎤 Speech-to-Text with Deepgram + AI Correction (Node.js)

## 📌 Overview

This project provides a **Speech-to-Text API** using **Deepgram SDK (Nova-3 model)** combined with **AI-powered correction using OpenAI**.

It converts audio into **high-quality, structured medical transcripts** with:

* 🎧 Speech-to-text transcription
* 🗣️ Speaker identification (A, B, C...)
* 🧠 Medical condition extraction
* ✨ AI-based grammar & spelling correction
* 🏥 Medical terminology normalization
* 🔍 Intelligent error detection & correction tracking
* 📊 Confidence scoring

---

## 🚀 Features

### 🎤 1. Speech-to-Text (Deepgram)

* Uses **Nova-3** model
* Supports `.mp3`, `.wav`, `.m4a`, etc.
* High accuracy with punctuation and formatting

---

### 🗣️ 2. Speaker Diarization

Automatically separates speakers:

```text
A: Patient has diabetes.
B: Since when?
A: For 5 years.
```

---

### 🧠 3. AI-Powered Correction (OpenAI)

Instead of rule-based fixes, this system uses AI to:

* ✅ Fix grammar errors
* ✅ Correct spelling mistakes
* ✅ Normalize medical terminology
* ✅ Improve sentence structure
* ✅ Understand context (not just keywords)

---

### 🏥 4. Medical Terminology Normalization

AI intelligently converts informal phrases:

| Input             | Output       |
| ----------------- | ------------ |
| sugar             | diabetes     |
| high bp           | hypertension |
| breathing problem | asthma       |

---

### 🔍 5. Correction Tracking (Point-wise)

Returns structured corrections:

```json
"corrections": [
  { "from": "sugar", "to": "diabetes" },
  { "from": "diabtes", "to": "diabetes" },
  { "from": "he dont have", "to": "he doesn't have" }
]
```

---

### 🧠 6. Medical Condition Extraction

Extracts conditions from corrected transcript:

* diabetes
* hypertension
* asthma
* cancer
* fever

---

### ⚠️ 7. Intelligent Error Detection

AI can detect:

* contradictions
* incorrect phrasing
* ambiguous medical statements

---

### 📊 8. Confidence Scoring

| Level  | Meaning                       |
| ------ | ----------------------------- |
| High   | Clear transcript + conditions |
| Medium | Some ambiguity                |
| Low    | Weak or no signal             |

---

## 🏗️ Tech Stack

* Node.js (ES Modules)
* Express.js
* Multer (file uploads)
* Deepgram SDK (speech recognition)
* OpenAI API (AI correction & NLP)

---

## ⚙️ Installation

```bash
npm install
```

---

## 🔑 Environment Variables

Create `.env` file:

```env
DEEPGRAM_API_KEY=your_deepgram_key
OPENAI_API_KEY=your_openai_key
```

---

## ▶️ Running the Server

```bash
node index.js
```

Server runs at:

```
http://localhost:3000
```

---

## 📤 API Endpoint

### POST `/transcribe`

Upload an audio file.

#### Request (form-data)

```
audio: <file>
```

---

## 🧾 Sample Response

```json
{
  "transcript": "A: Patient has diabetes. B: He also has hypertension.",
  "conditions": ["diabetes", "hypertension"],
  "confidence": "high",
  "corrections": [
    { "from": "sugar", "to": "diabetes" },
    { "from": "high bp", "to": "hypertension" },
    { "from": "he dont have", "to": "he doesn't have" }
  ]
}
```

---

## 🧠 Processing Pipeline

```
Audio Upload
   ↓
Deepgram (Speech → Text + Speakers)
   ↓
Speaker Formatting (A/B/C)
   ↓
OpenAI (Grammar + Medical + Spelling Fix)
   ↓
Correction Extraction
   ↓
Condition Detection
   ↓
Confidence Scoring
   ↓
Structured JSON Response
```

---

## ⚡ Why OpenAI Instead of Rule-Based?

| Rule-Based         | AI-Based                   |
| ------------------ | -------------------------- |
| Limited rules      | Context-aware              |
| Misses edge cases  | Handles complex language   |
| Poor typo handling | Strong spelling correction |
| No understanding   | Semantic understanding     |

---

## ⚠️ Limitations

* Requires OpenAI API (paid)
* Slight latency due to AI processing
* Depends on input audio quality

---

## 🚀 Future Improvements

* 🎤 Real-time streaming transcription
* 🧠 Clinical-grade medical validation
* 👨‍⚕️ Doctor vs Patient detection
* 📊 Analytics dashboard
* 💾 Database storage

---

## 📄 License

MIT License

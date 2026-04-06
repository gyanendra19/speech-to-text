# 🎤 Speech-to-Text with Deepgram (Node.js + Express)

## 📌 Overview

This project provides a **Speech-to-Text API** using **Deepgram SDK (Nova-3 model)**.

It allows you to:

* 🎧 Convert audio files into text transcripts
* 🗣️ Identify multiple speakers (A, B, C...)
* 🧠 Extract medical conditions from speech
* ✨ Automatically fix grammar and normalize medical terms
* ⚠️ Detect basic medical inconsistencies
* 📊 Return structured JSON output with confidence levels

---

## 🚀 Features

### 🎤 1. Speech-to-Text

* Uses Deepgram **Nova-3** model for high accuracy
* Supports `.mp3`, `.wav`, `.m4a`, etc.
* Handles real-world audio with punctuation

---

### 🗣️ 2. Speaker Diarization

* Automatically detects multiple speakers
* Formats transcript like:

```
A: Patient has diabetes.
B: Since when?
A: For 5 years.
```

---

### 🧠 3. Medical Condition Extraction

* Extracts conditions like:

  * diabetes
  * hypertension
  * asthma
  * cancer
* Based on keyword detection from transcript

---

### ✨ 4. Grammar & Text Correction

* Fixes:

  * capitalization (`i` → `I`)
  * spacing issues
  * sentence formatting
* Improves readability of transcript

---

### 🏥 5. Medical Normalization

Converts informal terms into standard medical terminology:

| Input               | Output       |
| ------------------- | ------------ |
| sugar               | diabetes     |
| high bp             | hypertension |
| high blood pressure | hypertension |

---

### 🔍 6. Error Correction Tracking

Returns **point-wise corrections**:

```json
"corrections": [
  { "from": "sugar", "to": "diabetes" },
  { "from": "high bp", "to": "hypertension" }
]
```

---

### ⚠️ 7. Basic Medical Issue Detection

Detects simple inconsistencies like:

* Contradictions (`no diabetes` + `diabetes`)
* Suspicious dosage values
* Incorrect phrasing

---

### 📊 8. Confidence Scoring

| Level  | Criteria                                    |
| ------ | ------------------------------------------- |
| High   | Conditions detected + meaningful transcript |
| Medium | Conditions detected but weak context        |
| Low    | No conditions or empty transcript           |

---

## 🏗️ Tech Stack

* Node.js (ES Modules)
* Express.js
* Multer (file upload)
* Deepgram SDK (speech recognition)

---

## ⚙️ Installation

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file:

```env
DEEPGRAM_API_KEY=your_api_key_here
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
    { "from": "high bp", "to": "hypertension" }
  ],
  "issues": []
}
```

---

## 🧠 Processing Pipeline

```
Audio Upload
   ↓
Deepgram (Speech → Text + Speaker Diarization)
   ↓
Speaker Formatting (A/B/C)
   ↓
Grammar Cleaning
   ↓
Medical Normalization
   ↓
Condition Extraction
   ↓
Error Detection
   ↓
Structured JSON Response
```

---

## ⚠️ Limitations

* Rule-based system (no AI/LLM)
* Limited medical vocabulary
* Basic typo correction
* Cannot fully understand medical context

---

## 🚀 Future Improvements

* 🧠 Advanced NLP (spaCy / medical models)
* 🔍 Better typo correction (Levenshtein distance)
* 🏥 Clinical-grade validation
* 👨‍⚕️ Doctor vs Patient role detection
* 🎤 Real-time transcription (WebSocket)

---

## 📄 License

MIT License

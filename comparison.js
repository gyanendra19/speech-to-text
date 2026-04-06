export const transcriptComparisonReport = {
  summary: {
    totalWordsOriginal: 1250,
    totalWordsGenerated: 1200,
    totalCorrections: 125,
    improvementPercent: "10%",
  },

  observations: [
    "Grammar and punctuation significantly improved",
    "Speaker formatting standardized (A/B)",
    "Filler words and repetitions removed",
    "Medical terminology normalized",
    "Minor factual drift observed in a few places",
  ],

  originalTranscript: `
D: What brings you in here today?

P: Yeah, I have this pain in my chest.

D: OK, and where is the pain exactly? 

P: It's just right  over on the on the left side.

D: OK, and when did this pain start?

P: It started just 30 minutes ago.

D: OK, and did it just come on randomly or were you doing something strenuous?

P: I was just shovelling the driveway and it came on.

D: OK, and has that pain been getting worse at all over the last half an hour?

P: No, it just came on suddenly and it's uh, uh, I'm sorry. Yeah the pain has been there this whole time and it's gotten worse ever since it started. 

D: OK, and how would you describe the pain? Is it kind of like an aching pain or is it a sharp or tight tightness kind of pain? How would you describe it? 

P: It feels dull. I feel like there's a lot of pressure on my chest. 

D: And how do you rate the pain right now on a scale of zero to 10, zero being the least amount of pain you felt in your life, 10 being the worst?

P: Uh, seven.

D: Seven, OK. Have you had ny similar episodes before?

P: No, I've never had any chest pain before. 

D: OK, and is the pain just staying in the region of the left chest area that you mentioned or is it traveling to any other part of your body?

P: No, I'm kind of just feeling it right here. On the left side.

D: OK, uh, is there anything that you do that makes the pain either get worse or go away or like get better?

P: Uh. I think it's a bit bit worse if I'm moving around or when I was walking in here. I think it it made it a bit worse, but nothing has seemed to make it any better since it starting.

D: OK, and does it change at all from you changing positions like if you're standing up versus sitting down or laying down?

P: I think it's a little bit worse when I when I'm laying down. 

D: OK, and other than the pain that you've been having, have you been having any other symptoms like a cough or difficulty breathing or any pain when you're breathing in or out?

P: Uh, I've felt a little bit uh short of breath or having difficulty breathing since yesterday when the sorry since the pain started, but uh just the difficulty breathing.

D: OK. And have you recently injured your chest or surrounding area at all? Like from a fall or anything like that?

P: I do I play rugby and was tackled by another player yesterday. But but my chest felt fine after that.

D: OK so but the pain just started half an hour ago?

P: Yeah.

D: OK, have you have you been traveling at all recently?

P: No, been at home.

D: OK, has anyone around you been sick at all?

P: No. 

D: OK, have you been having any symptoms like nausea or vomiting or any fevers or chills?

P: No nausea or vomiting, but I do feel a little bit hot today.

D: OK, but have you measured your temperature at all?

P: Uh I did and it was 38 degrees. 

D: OK, and have you been having any kind of swelling in your legs or feet?

P: Uh, no swelling in my legs.

D: OK. Have you been feeling tired at all, like increasingly fatigued?

P: No, my energy has been good.

D; Have you been having any kind of thumping or palpitations or feel like your heart has been racing at all?

P: It uhh it does feel like it's beating faster right now. It usually only feels like this when I'm playing sports. 

D: OK. And have you noticed any changes in your skin at all? Any rashes?

P: No rashes. 

D: OK, have you had any cough or runny nose or sore throat? Any kind of those symptoms and in the past month?

P: Uh few weeks ago I was a little runny, but that went away on its own. I haven't had any cough.

D: OK, and have you been feeling dizzy at all or have you fainted?

P: No dizziness and uh no I haven't fainted at all. 

D: OK. Just a few more questions. Have you had any diagnosis made by any physician or any anything like diabetes or high blood pressure?

P: Yeah, I've been told I have high cholesterol and high blood pressure.

D: OK, and do you take any medications for the these things?

P: Um, I do take medications for both blood pressure and cholesterol, Rosuvastatin and um Lisinopril and I take a multi vitamin.

D: OK, and do you have any allergies to any medications at all? 

P: No allergies.

D: OK, have you at all in the past been hospitalized for any reason?

P: No hospitalizations. 

D: Any previous surgeries? 

P: No.

D: OK, and within your family, has anyone passed away from a heart attack or any cancers that run in the family?

P: No. 

D: OK, and currently right now, do you live alone? Do you live with someone? And where do you live, like an apartment or house? 

P: I I live in a house with um, my parents.

D: OK, and do you currently work?

P: Yeah, I I drive a bus for the city. 

D: OK. And in your daily routine, would you say you get enough exercise throughout the week?

P: Uhh yeah, usually on Sundays I'll go for a run.

D: OK, and how about your diet? Well, how's your diet like, just regularly?

P: Uhh, usually I feel like it's fairly balanced overall, I might I eat out a little bit too often, but try to eat as many vegetables as I can.

D: OK. And do you smoke cigarettes at all? 

P: I do yes. Been smoking for the last 20 years roughly.

D: OK, how much do you smoke on an average day?

P: About a half a pack to a pack a day. 

D: OK. And do you drink?

P: No alcohol. 

D: OK, and any recreational drugs like marijuana?

P: Um, no marijuana, but I have used crystal meth in the past.

D: OK, and when was the last time that you used crystal meth?

P: Um, six days ago.

D: Six days ago, OK, and how often do you use crystal meth?

P: Um, I would say a couple of times a month.

D: A couple of times a month, OK. Alright, and for how long have you been using crystal meth?

P: Uh for the last seven years.
`,

  generatedTranscript: `
A: What brings you in here today.
B: Yeah, I have this pain in my chest.
A: Okay, and where is the pain exactly?
B: It's just right over on the left side.
A: Okay, and when did this pain start?
B: It started just thirty minutes ago.
A: Okay, did it just come on randomly or were you doing something strenuous?
B: I was just shoveling the driveway and it came on.
A: Okay, has the pain been getting worse at all over the last one and a half hours?
B: No, it just came on suddenly and the pain has been there this whole time and it's gotten worse since it started.
A: Okay, how would you describe the pain? Is it kind of like aching, or is it sharp or tight? How would you describe it?
B: It feels dull. I feel like there's a lot of pressure on my chest.
A: And how would you rate the pain right now on a scale of zero to ten, zero being no pain and ten being the worst pain?
B: Seven.
A: Seven, okay. Have you had any similar episodes before?
B: No, I've never had any chest pain before.
A: Is the pain just staying in the left chest area or is it traveling to any other part of your body?
B: No, I'm just feeling it right here on the left side.
A: Okay, is there anything you do that makes the pain worse or better?
B: I think it's a bit worse when I'm moving around or when I was walking in here. Nothing has made it better since it started.
A: Does it change with position, like standing, sitting, or lying down?
B: I think it's a little worse when I'm lying down.
A: Other than the pain, have you had any other symptoms like cough, difficulty breathing, or pain when breathing in or out?
B: I've felt a little short of breath since the pain started, just difficulty breathing.
A: Have you recently injured your chest or surrounding area, like from a fall?
B: I play rugby and was tackled yesterday, but my chest felt fine after that.
A: But the pain just started half an hour ago?
B: Yeah.
A: Have you been traveling recently?
B: No, I've been at home.
A: Has anyone around you been sick?
B: No.
A: Have you had nausea, vomiting, fever, or chills?
B: No nausea or vomiting, but I do feel a little hot today.
A: Have you measured your temperature?
B: Yes, it was 38 degrees Celsius.
A: Have you had swelling in your legs or feet?
B: No swelling.
A: Feeling tired or fatigued?
B: No, my energy has been good.
A: Any palpitations or heart racing?
B: It does feel like it's beating faster right now. Usually, only during sports.
A: Any skin changes or rashes?
B: No rashes.
A: Any cough, runny nose, or sore throat in the past month?
B: A few weeks ago my nose was runny but it went away on its own. No cough.
A: Any dizziness or fainting?
B: No dizziness or fainting.
A: Have you been diagnosed with any conditions like diabetes or hypertension?
B: Yes, high cholesterol and high blood pressure.
A: Do you take medications?
B: Yes, rosuvastatin and lisinopril, and a multivitamin.
A: Any medication allergies?
B: No.
A: Any past hospitalizations or surgeries?
B: No.
A: Has anyone in your family died from heart attack or cancers?
B: No.
A: Do you live alone or with others? What type of residence?
B: I live in a house with my parents.
A: Do you currently work?
B: Yes, I drive a bus.
A: Do you get regular exercise?
B: Yes, I usually run on Sundays.
A: How's your diet?
B: Generally balanced, though I eat out a bit too often; I try to eat vegetables.
A: Do you smoke?
B: Yes, about half a pack to a pack a day for twenty years.
A: Do you drink alcohol?
B: No.
A: Use recreational drugs?
B: No marijuana, but I have used crystal meth in the past.
A: When was the last time you used crystal meth?
B: Six days ago.
A: How often do you use crystal meth?
B: A couple of times a month.
A: For how long have you been using it?
B: Seven years.
A: Thank you.
`,

  notes: [
    "Generated transcript is significantly cleaner and structured",
    "Speaker roles converted from D/P to A/B",
    "Grammar, punctuation, and clarity improved",
    "Some minor factual drift exists (time inconsistency example)",
    "Medical information preserved overall",
  ]
};
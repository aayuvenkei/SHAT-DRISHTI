# SHAT-DRISHTI
👁️ SHAT-DRISHTI: The 6 Aankhein

Empowering the visually impaired with a 6-sense AI ecosystem.

    "Ye 6 alag app nahi, ek hi app ke 6 Chakras hain."
    This is not 6 different apps. These are 6 Chakras of one unified life-saving system.

🚀 The Vision

Currently, visually impaired individuals rely on fragmented tools (one app for navigation, one for reading, one for object detection). They are forced to switch contexts constantly.

Shat-Drishti solves this by creating a single, unified, intelligent ecosystem powered by a multi-modal AI core. It doesn't just detect; it understands, remembers, and interacts.
🏆 The 6 Chakras (Current Demo Build v0.1)

This repository contains the working web-demo of the Shat-Drishti ecosystem. It runs directly in the browser (using device cameras, microphones, and TTS engines) to prove the concept.
1. 🌬️ AURA — The Silent Watchman

    Concept: Continuous, quiet awareness. It doesn't scream at every pixel; it only speaks when the scene changes.

    Demo: Live webcam integration. If a face leaves the frame, it warns: "No one is in front of camera." If someone approaches, it speaks: "Someone is in front of camera."

    Tech: Real-time Face Detection API + Web Speech API.

2. 🧠 SMRITI — The Memory Map

    Concept: Permanent memory for the home. "Where did I put my wallet?" -> "2 steps back, on the table, under the bag."

    Demo: A voice-controlled chat interface where the AI remembers where items are (and proactively warns if a bag is left on the floor to trip over).

3. 📳 SPARSH — The Haptic Language

    Concept: When audio fails (in a loud market or for deaf-blind users), vibration becomes the language. Left object = left vibration. Danger ahead = long vibration.

    Demo: Built a Visual & Audio Haptic Fallback for laptops/desktops. When a vibration is triggered, the screen shakes and plays a buzz frequency to simulate hardware haptics. On mobile, it triggers real vibrations.

4. ❤️ SAATHI — The Emotion Radar

    Concept: The blind know what is in front of them, but not how they feel. Are they angry? Are they joking?

    Demo: Tap an emotion card, and the AI speaks: "The lady in front is fake smiling — she is nervous." (Replaces boring, robotic captioning).

5. 🧭 DISHA — The Micro-Navigation

    Concept: A merger of 3 navigation needs: Thali (food on plate), LetsGo (finding a table in a cafe), and AAZAD (shopping in a store).

    Demo: Voice-guided spatial awareness. "Rice at 12 o'clock, dal at 3 o'clock."

6. 🌐 SANGAM — The Community Bridge

    Concept: Inclusive fun and community. Audio Instagram (Swar), Audio Chess (Khel), and Sign Language -> Vibration -> Braille (Setu).

    Demo: Shows the UI and ecosystem for how the app becomes a lifestyle, not just a utility.

🛠️ How to Run the Demo

    Clone this repository.

    Open index.html in Google Chrome (for best Face Detection and Speech Recognition support).

    Grant Camera and Microphone permissions.

    Try the Voice Command: Go to AURA, click the 🎤 Listen button, and say "Start camera" or "Turn off camera".

🌉 The Roadmap: From Demo to Reality

This web-demo is just the shell. The real magic happens when we connect it to the IGRIS(VENKEI) Core (our Python-based backend).
Phase 1: The Hardware Bridge (Next Step)

    Connect the web-frontend to a Python backend (FastAPI).

    Integrate the Gemini Live API for ultra-low latency, real-time audio conversation.

    Replace the browser's native FaceDetector with YOLOv8/OpenCV for precise object distance and spatial mapping.

Phase 2: The Wearable Integration

    Port the Shat-Drishti app to Android/iOS.

    Connect via Bluetooth to Smart Glasses (e.g., Ray-Ban Meta) or a custom ESP32-based haptic belt.

    Use the phone's LiDAR/Depth camera to calculate exact distances ("2 steps back") for SMRITI.

Phase 3: The Autonomous Ecosystem

    AURA: Ditch the cloud. Run a local tiny-LLM to process video feeds on-device for 100% privacy and zero latency.

    SPARSH: Build a dedicated haptic waistband that translates camera depth data into spatial vibrations.

    SETU: Train a custom vision model to read Sign Language in real-time.

👨‍💻 The Team

Built by: [TEAM-VENKEI]
Powered by: IGRIS AI & Web Technologies(CREATED BY TEAM VENKEI)

"We are not building an app. We are building independence."

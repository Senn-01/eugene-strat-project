# Session Completion Sound

This directory should contain:

## session-complete.wav

A brief, pleasant notification sound that plays when a focus session completes.

**Requirements:**
- Format: WAV file
- Duration: 1-3 seconds
- Volume: Moderate (not jarring)
- Tone: Positive, achievement-oriented

**Suggestions:**
- Simple bell chime
- Soft notification tone
- Achievement sound effect

**Note:** The application gracefully handles missing sound files - if `session-complete.wav` is not present, no sound will play but the timer will still function normally.

**File path expected:** `/public/sounds/session-complete.wav`
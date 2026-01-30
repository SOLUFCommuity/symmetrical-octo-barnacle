
# Troubleshooting Guide: APP QUANTUM

This guide is designed to help you resolve common issues encountered while running the "Symmetrical Octo Barnacle" application.

## 📄 Table of Contents

1.  [API Key Errors](#-api-key-errors)
2.  [Application Fails to Load](#-application-fails-to-load)
3.  [Quantum Simulator is Unresponsive](#-quantum-simulator-is-unresponsive)
4.  [Visual Glitches or Styling Issues](#-visual-glitches-or-styling-issues)
5.  [Getting Further Assistance](#-getting-further-assistance)

---

### 🔑 API Key Errors

**Symptom:**
- The AI Security Audit or other AI-powered features show an error message like "Audit Intelligence disconnected" or "Failed to analyze."
- The browser console shows a `4xx` or `5xx` error related to the Google AI API.

**Cause:**
The application relies on a Google Gemini API key being available in the environment as `process.env.API_KEY`. This error typically occurs if the key is:
- Missing or not configured in the execution environment.
- Invalid or expired.
- Lacking the necessary permissions for the Gemini models used in the app.

**Solution:**
1.  **Verify Key Presence:** Ensure that the API key is correctly set up in the environment where the application is being served. The application is designed to read this key directly and does not have a UI for inputting it.
2.  **Check Key Validity:** Confirm that your API key is active and valid in your Google AI Studio or Google Cloud project.
3.  **Check Console Logs:** Open your browser's developer console (`F12` or `Cmd+Option+I`) and look for specific error messages from the `@google/genai` library, which can provide more details.

###  trắng Application Fails to Load

**Symptom:**
- The page is blank after loading `index.html`.
- The browser's developer console shows errors like `TypeError: Failed to resolve module specifier`.

**Cause:**
- **Outdated Browser:** Your browser may not support modern JavaScript features like ES Modules or `importmap`.
- **Network Issues:** The application loads its dependencies (React, Tailwind CSS, etc.) from a CDN (`esm.sh`). A poor network connection or firewall can block these requests.
- **Ad Blockers:** Some browser extensions may mistakenly block scripts from CDNs.

**Solution:**
1.  **Update Your Browser:** Use the latest version of a modern browser like Chrome, Firefox, Edge, or Safari.
2.  **Check Network Connection:** Open the developer console's **Network** tab to see if requests to `esm.sh` are failing. Ensure you have a stable internet connection.
3.  **Disable Extensions:** Temporarily disable ad blockers or other script-blocking extensions to see if they are causing the issue.

### ⚛️ Quantum Simulator is Unresponsive

**Symptom:**
- Clicking the "RUN QUANTUM MEASUREMENT" button has no effect.
- The qubit grid does not respond to clicks.
- The UI appears frozen or stuck.

**Solution:**
1.  **Reset State:** Click the "Reset State" button (the circular arrow icon) in the Quantum State Prep panel to reset the simulation to its initial state.
2.  **Check Console:** Open the developer console to check for any JavaScript errors that may have occurred during the simulation logic.
3.  **Refresh Page:** A full page refresh (`Ctrl+R` or `Cmd+R`) will restart the application and clear any problematic state.

### 🎨 Visual Glitches or Styling Issues

**Symptom:**
- The application appears unstyled, with plain HTML elements.
- Fonts, colors, or layouts are incorrect.

**Cause:**
The stylesheet from the Tailwind CSS CDN (`cdn.tailwindcss.com`) failed to load properly.

**Solution:**
1.  **Check Network Tab:** Open the developer console's **Network** tab and verify that the request to `cdn.tailwindcss.com` completed successfully.
2.  **Clear Cache:** Your browser may have a cached, corrupted version of the stylesheet. Try a hard refresh (`Ctrl+Shift+R` or `Cmd+Shift+R`) to bypass the cache.

### 🆘 Getting Further Assistance

If the steps above do not resolve your issue, please help us by filing a bug report.

1.  Go to the project's **Issues** tab on GitHub.
2.  Create a **New Issue**.
3.  Provide a **descriptive title** and a **detailed description** of the problem, including:
    - Steps to reproduce the bug.
    - What you expected to happen vs. what actually happened.
    - Your browser and operating system version.
    - Any relevant error messages or screenshots from the **Console** and **Network** tabs of your browser's developer tools.

This information will help us diagnose and fix the problem more quickly.

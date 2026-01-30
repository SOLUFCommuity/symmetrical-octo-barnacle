
# APP QUANTUM - Symmetrical Octo Barnacle

A cutting-edge cybersecurity platform specializing in Post-Quantum Cryptography (PQC), incident response, and AES-256 secure communications. This application provides a suite of tools for visualizing quantum security principles, managing threats, and automating secure workflows.

## ✨ Key Features

- **📊 Interactive Dashboard:** A central hub for real-time threat monitoring, system status, and quick access to all security modules.
- **⚛️ QKD Simulator:** A hands-on Quantum Key Distribution (QKD) simulator that visualizes the process of generating a secure key, including noise models and QBER (Quantum Bit Error Rate) analysis.
- **🤖 Automation Center:** A powerful module for setting up and managing autonomous security playbooks, CI/CD pipelines (integrated with GitHub Actions), and custom automation scripts.
- **🔐 AES-256 Encryption Tool:** A practical tool to encrypt and decrypt messages using the AES-256 standard, with the ability to inject keys generated directly from the QKD Simulator.
- **🚨 Incident Response Hub:** A dashboard for managing and tracking security incidents, from quantum decryption attempts to standard malware threats.
- **🧠 AI Security Audit:** Leverages the Google Gemini API (specifically the fast `gemini-flash-lite-latest` model) to provide instant analysis and actionable insights on system telemetry and potential vulnerabilities.
- **🎓 Quantum Knowledge Base:** An educational section explaining the fundamental concepts of modern and post-quantum cryptography, including Cloudflare OTP integration details.

## 🛠️ Technology Stack

- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Charts & Visualization:** Recharts
- **AI Integration:** Google Gemini API (`@google/genai`)

## 🚀 Getting Started

This project is set up to run directly in a modern browser environment that supports ES Modules and `importmap`.

### Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Edge).
- A valid Google Gemini API Key.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **API Key Configuration:**
    The application requires a Google Gemini API key to function correctly. This key should be available as an environment variable `process.env.API_KEY`. It's assumed to be present in the execution environment.

3.  **Running the Application:**
    Simply open the `index.html` file in your web browser. The necessary dependencies (React, Lucide, etc.) are loaded directly via an `importmap` from a CDN (`esm.sh`), so no local installation is needed.

## 📁 File Structure

```
.
├── components/          # Contains all the individual React components (views)
│   ├── AISecurityAudit.tsx
│   ├── AutomationCenter.tsx
│   ├── Dashboard.tsx
│   ├── EncryptionTool.tsx
│   ├── IncidentResponse.tsx
│   ├── QuantumExplain.tsx
│   └── QuantumSimulator.tsx
├── App.tsx              # Main application component, handles routing and layout
├── index.html           # The entry point of the application, includes importmap
├── index.tsx            # Renders the main React application into the DOM
├── metadata.json        # Application metadata
└── types.ts             # TypeScript type definitions and enums
```

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or find any issues, please feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

*This project was developed to demonstrate advanced cybersecurity concepts in a modern web application.*

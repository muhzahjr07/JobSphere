# 🚀 JobSphere — AI-Powered Career Assistant & Job Search Autopilot

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub_Pages-blue.svg)](https://muhzahjr07.github.io/JobSphere/)

> **Live Web App:** [https://muhzahjr07.github.io/JobSphere/](https://muhzahjr07.github.io/JobSphere/)

An interactive AI-powered career assistant MVP featuring simulators for job discovery, CRM tracking, AI interview coaching, skill development, networking, and career autopilot. Built with **React**, **Vite**, and **Lucide React**.

---

## 📸 Interactive Modules & Architecture

```
+-----------------------------------------------------------------------------------+
|                                JobSphere Core                                     |
+---------------------+-----------------------+------------------+------------------+
|   Job Engine        |    Application CRM    |    AI Coach      | Career Autopilot |
|  - Real-time search |  - Kanban & table     |  - STAR prep     |  - Auto-matching |
|  - Salary filter    |  - Timeline analytics |  - Live feedback |  - Follow-up bot |
+---------------------+-----------------------+------------------+------------------+
|   Skill Academy     |  Rejection Analyzer   |    Networking    |  Career Copilot  |
|  - Gap evaluation   |  - Sentiment parsing  |  - Outreach CRM  |  - 24/7 AI chat  |
+---------------------+-----------------------+------------------+------------------+
```

### Key Modules:
- 💼 **Job Engine (`JobEngine.jsx`)**: Intelligent vacancy indexing with salary benchmarking, remote status, and requirement matching.
- 📊 **Application CRM (`ApplicationCRM.jsx`)**: Kanban-style funnel management across Saved, Applied, Interview, Offer, and Archived states.
- 🤖 **AI Interview Coach (`AICoach.jsx`)**: Mock technical & behavioral interview simulation with structured STAR scoring.
- 🎯 **Career Autopilot (`Autopilot.jsx`)**: Autonomous job qualification matcher and one-click application queue.
- 📈 **Rejection Analyzer (`RejectionAnalyzer.jsx`)**: Turn rejection communications into actionable learning points and skill recommendations.
- 🎓 **Skill Academy (`SkillAcademy.jsx`)**: Tailored curriculum tracks bridging profile discrepancies with desired roles.
- 🤝 **Networking Hub (`Networking.jsx`)**: Cold outreach template generator and recruiter relationship tracker.

---

## 🛠️ Tech Stack

- **Frontend:** React 18 (Hooks, Context API)
- **Tooling:** Vite, ESLint
- **Icons:** Lucide React
- **Styling:** Modern Responsive CSS / Tailwind Design System
- **Hosting:** GitHub Pages via automated GitHub Actions CI/CD

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ & npm

### Installation
```bash
# Clone the repository
git clone https://github.com/muhzahjr07/JobSphere.git
cd JobSphere

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.

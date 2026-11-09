# 🚀 Internship Full-Stack Project

A modern full-stack application with **React (Vite)** on the frontend and **Node.js (Express)** on the backend.

---

## ⚡ One-Command Automatic Startup

You do **NOT** need to open multiple terminals or manually connect anything!

### Run with npm:
From the root directory (`d:\INTERNSHIPS`), run:
```bash
npm run dev
```

### Or Double-Click:
Double-click [`start-project.bat`](file:///d:/INTERNSHIPS/start-project.bat) in the project folder!

Both the **Backend** (`http://localhost:5000`) and **Frontend** (`http://localhost:5173`) will launch together automatically, your browser will open, and the frontend will automatically connect to the backend without any manual setup.

---

## 🔄 How the Automatic Connection Works

1. **Concurrent Runner**: The root `package.json` runs both `npm --prefix backend run dev` and `npm --prefix frontend run dev` simultaneously with unified colored logs.
2. **Vite Reverse Proxy**: In [`frontend/vite.config.js`](file:///d:/INTERNSHIPS/frontend/vite.config.js), all calls to `/api` are automatically proxied to the backend port `5000`.
3. **Auto-Polling Reconnection**: In [`frontend/src/App.jsx`](file:///d:/INTERNSHIPS/frontend/src/App.jsx), the frontend automatically detects the backend. If the backend is booting up, the frontend retries automatically in the background until connected, then automatically pulls in the data.

---

## 📁 Project Structure

```text
INTERNSHIPS/
├── frontend/                     # React + Vite Client Application
│   ├── src/
│   │   ├── components/           # Navbar, Footer
│   │   ├── services/             # Axios API service (proxied to backend)
│   │   ├── App.jsx               # Interactive dashboard with auto-connect
│   │   ├── App.css               # Styling
│   │   ├── index.css             # Global styling
│   │   └── main.jsx              # React DOM entrypoint
│   ├── vite.config.js            # Reverse proxy + auto-open config
│   └── package.json
│
├── backend/                      # Node.js + Express REST API
│   ├── src/
│   │   ├── config/               # db.js (MongoDB Mongoose connection)
│   │   ├── controllers/          # itemController.js (CRUD business logic)
│   │   ├── middleware/           # errorHandler.js
│   │   ├── models/               # Item.js (Schema + in-memory fallback)
│   │   ├── routes/               # api.js (/api/health & /api/items)
│   │   ├── app.js                # Express app setup
│   │   └── server.js             # Server startup (Port 5000)
│   └── package.json
│
├── start-project.bat             # 1-Click launcher for Windows
├── package.json                  # Root runner script with concurrently
└── README.md
```
"# intership" 
"# intership" 

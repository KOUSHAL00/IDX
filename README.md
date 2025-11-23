A browser-based IDE built with Monaco Editor, xterm.js, Socket.IO, Docker, and React — enabling real-time terminal access, full file-system editing, and isolated React project creation inside containers.

🚀 Project Summary

This project provides a local development environment within your browser. Users can:
Edit files using the Monaco Editor (VS Code powered)
Run shell commands and see live terminal output using xterm.js
Create and bootstrap React projects on demand inside isolated Docker containers
Persist and manipulate a per-session file system exposed by the backend
Collaborate or share sessions via real-time websockets
The backend (Node.js / Express) orchestrates containers and filesystem operations; Socket.IO streams terminal I/O and file-change events between client and server.

✨ Key Features
Monaco Editor integration with syntax highlighting, IntelliSense (basic), and multi-file editing
xterm.js terminal with live stdin/stdout streaming through Socket.IO
Isolated Docker containers per session for running npm start, builds, or tests safely
Real-time filesystem sync (open/save/delete/create) between client and server
Support for creating dynamic React projects (via Vite) inside containers

🧭 Tech Stack
Frontend: React, Monaco Editor, xterm.js, Socket.IO-client
Backend: Node.js, Express, Socket.IO, Docker (dockerode or Docker CLI), fs
Dev tooling: Docker, Docker Compose


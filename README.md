<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/workflow.svg" alt="Flow-Weaver Logo" width="120" height="120">
  
  # Flow-Weaver

  **A powerful, full-stack workflow automation platform built with React & Node.js.**
  
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
</div>

<br />

**Flow-Weaver** is an intuitive visual platform for designing, connecting, and automating workflows. It provides a rich React-based canvas builder backed by a robust Node.js and MongoDB server, enabling persistent CRUD operations, real-time node-based execution, and seamless third-party integrations.

---

## Key Features

- **Visual Canvas Builder**: A drag-and-drop workflow editor powered by `@xyflow/react` (React Flow) for connecting triggers and actions seamlessly.
- **Real-Time Automation**: Connect a chain of events with conditional routing and execute complex workflows instantly.
- **Rich Integrations**:
  - **Slack**: Trigger Slack actions dynamically.
  - **Email**: Send automated emails via Nodemailer.
  - **Webhooks**: Custom incoming and outgoing webhook triggers.
- **Secure Authentication**: JWT-based secure user sessions and bcrypt hashed passwords.
- **Smooth Animations**: Premium interface interactions driven by GSAP and styled with TailwindCSS v4.
- **Persistent State**: Full backend synchronization for reliable CRUD operations backed by MongoDB.

## Technology Stack

### Frontend
- **Framework**: React 19 + Vite
- **State Management**: Zustand
- **Canvas/Nodes**: `@xyflow/react`
- **Styling**: Tailwind CSS + Lucide React (Icons)
- **Animations**: GSAP
- **Routing**: React Router v7

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT) & bcrypt
- **Utilities**: Nodemailer (Emails), Axios (API Requests)

## Getting Started

Follow these instructions to set up Flow-Weaver locally.

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18 or newer recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas URI)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/flow-weaver.git
cd flow-weaver
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and configure your environment variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

Start the backend development server:
```bash
npm run dev
```

### 3. Setup the Frontend

Open a new terminal window:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory if necessary (e.g., for API URLs):
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the Vite development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## Project Structure

```text
Flow-weaver/
├── backend/                  # Express/Node.js API Server
│   ├── controllers/          # Request handlers (e.g., webhookcontroller)
│   ├── models/               # Mongoose database schemas
│   ├── routes/               # API endpoints
│   └── index.js              # Server entry point
└── frontend/                 # React UI Application
    ├── src/
    │   ├── components/       # UI Components
    │   │   └── nodes/        # React Flow custom nodes (SlackActionNode, etc.)
    │   ├── store/            # Zustand state slices
    │   ├── pages/            # Application views
    │   └── App.jsx           # Frontend entry point
```

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/flow-weaver/issues).

## License

This project is licensed under the ISC License.

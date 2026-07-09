# 🗳️ Polling System - Full Stack Project

A complete, modern, full-stack real-time polling application with WebSocket support, designed to showcase professional software development practices.

## 📚 Documentation Overview

### 📖 Repository Structure

```
Polling System Project
│
├── 📁 polling-system (Frontend)
│   ├── Next.js 15 with React 19
│   ├── TypeScript
│   ├── Tailwind CSS
│   ├── Socket.io Client
│   └── README → Complete frontend documentation
│
└── 📁 polling-system-backend (Backend)
    ├── Express.js 5
    ├── Socket.io Server
    ├── CORS Configuration
    ├── REST API Endpoints
    └── README → Complete API documentation
```

---

## 🎯 Quick Navigation

### For Recruiters / Project Overview
👉 **START HERE**: View the complete architecture and technology stack

### Frontend Setup
📘 [Frontend README](https://github.com/Ujjwalverma2803/polling-system/blob/main/README.md)
- UI/UX Implementation
- React Component Architecture
- TypeScript Usage
- Responsive Design with Tailwind CSS

### Backend Setup
📗 [Backend README](https://github.com/Ujjwalverma2803/polling-system-backend/blob/main/README.md)
- REST API Endpoints Documentation
- WebSocket Event Handling
- Express.js Configuration
- Deployment Guidelines

---

## 🚀 Full-Stack Setup (Development)

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### 1. Backend Setup
```bash
git clone https://github.com/Ujjwalverma2803/polling-system-backend.git
cd polling-system-backend
npm install
npm start
# Server running on http://localhost:5000
```

### 2. Frontend Setup (New Terminal)
```bash
git clone https://github.com/Ujjwalverma2803/polling-system.git
cd polling-system
npm install
npm run dev
# App running on http://localhost:3000
```

### ✅ Verify Setup
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- WebSocket: ws://localhost:5000

---

## 📊 Project Architecture

```
┌─────────────────────────────────────────────────────┐
│          Client Browser (http://localhost:3000)     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │   Next.js Frontend Application              │   │
│  │  ┌────────────────────────────────────────┐ │   │
│  │  │ React Components (TypeScript)          │ │   │
│  │  │ - PollForm, PollList, VoteButton       │ │   │
│  │  └────────────────────────────────────────┘ │   │
│  │  ┌────────────────────────────────────────┐ │   │
│  │  │ Tailwind CSS Styling                   │ │   │
│  │  │ - Responsive, Mobile-First Design      │ │   │
│  │  └────────────────────────────────────────┘ │   │
│  │  ┌──────────────────────────────��─────────┐ │   │
│  │  │ Socket.io Client                       │ │   │
│  │  │ - Real-time Event Communication        │ │   │
│  │  └────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────┘   │
│                      │                              │
│                      │ HTTP/WebSocket              │
│                      ▼                              │
└─────────────────────────────────────────────────────┘
                        │
        ┌───────────────┴───────────────┐
        │                               │
        ▼ REST API                      ▼ WebSocket
   http://localhost:5000         ws://localhost:5000
        │                               │
┌───────▼───────────────────────────────▼─────────┐
│     Express.js Backend Server                   │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │ REST API Routes                          │  │
│  │ - GET /api/polls                         │  │
│  │ - POST /api/polls                        │  │
│  │ - POST /api/polls/:id/vote               │  │
│  │ - GET /api/polls/:id/results             │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │ WebSocket Event Handlers (Socket.io)     │  │
│  │ - poll_created                           │  │
│  │ - vote_cast                              │  │
│  │ - poll_updated                           │  │
│  │ - Real-time Broadcasting                 │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │ Data Management                          │  │
│  │ - Poll Storage                           │  │
│  │ - Vote Tracking                          │  │
│  │ - Live Statistics                        │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🛠 Technology Stack Summary

### Frontend
- **Framework**: Next.js 15 (React 19)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 3.4
- **Real-Time**: Socket.io Client 4.8
- **Build Tool**: Webpack (via Next.js)

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 5
- **Real-Time**: Socket.io 4.8
- **CORS**: Express CORS 2.8
- **Language**: JavaScript (ES6+)

### Development Tools
- Version Control: Git/GitHub
- Package Manager: npm/yarn
- Linting: ESLint (via Next.js)
- Type Checking: TypeScript

---

## ✨ Key Features

### Real-Time Functionality
- ⚡ Instant poll creation across all connected clients
- 🔄 Live vote updates without page refresh
- 📊 Real-time poll results aggregation
- 🔌 WebSocket-based bidirectional communication

### User Experience
- 🎨 Modern, responsive UI design
- 📱 Mobile-first approach
- ⌨️ Intuitive user interactions
- 🎯 Clean, professional interface

### Code Quality
- 🧹 Full TypeScript implementation
- 📦 Component-based architecture
- 🔒 Type safety throughout
- 📚 Well-documented code

### Performance
- ⚡ Server-side rendering with Next.js
- 🚀 Optimized bundle size
- 💾 Efficient data handling
- 🌐 Scalable WebSocket connections

---

## 📋 API Endpoints

### Polls
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/polls` | Get all polls |
| `GET` | `/api/polls/:id` | Get single poll |
| `POST` | `/api/polls` | Create new poll |
| `PUT` | `/api/polls/:id` | Update poll |
| `DELETE` | `/api/polls/:id` | Delete poll |

### Voting
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/polls/:id/vote` | Cast a vote |
| `GET` | `/api/polls/:id/results` | Get poll results |

See [Backend README](https://github.com/Ujjwalverma2803/polling-system-backend#api-documentation) for detailed API documentation.

---

## 🔌 WebSocket Events

### Server → Client
- `poll_created` - New poll broadcast
- `vote_cast` - Vote received broadcast
- `poll_updated` - Poll state updated

### Client → Server
- `create_poll` - Create new poll request
- `cast_vote` - Submit vote request
- `join_poll` - Join poll subscription

---

## 🚢 Deployment

### Frontend Deployment (Vercel - Recommended)
```bash
npm i -g vercel
vercel
```

### Backend Deployment (Heroku/Railway)
```bash
# Heroku
heroku create your-app-name
git push heroku main

# Railway - Push and deploy via UI
```

### Environment Variables

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=https://your-backend.com
NEXT_PUBLIC_SOCKET_URL=https://your-backend.com
```

**Backend (.env)**
```env
PORT=5000
NODE_ENV=production
CLIENT_URL=https://your-frontend.com
```

---

## 📁 File Organization

### Frontend Structure
```
polling-system/
├── app/              # Next.js pages and layouts
├── components/       # React components
├── hooks/           # Custom React hooks
├── types/           # TypeScript definitions
├── utils/           # Utility functions
├── public/          # Static assets
└── README.md        # Frontend documentation
```

### Backend Structure
```
polling-system-backend/
├── routes/          # API route handlers
├── controllers/     # Business logic
├── models/          # Data models
├── middleware/      # Express middleware
├── events/          # Socket.io handlers
├── index.js         # Entry point
└── README.md        # Backend documentation
```

---

## 🔒 Security Features

✅ **Input Validation** - All inputs validated before processing  
✅ **CORS Protection** - Cross-origin requests controlled  
✅ **Error Handling** - Secure error messages  
✅ **WebSocket Security** - Proper event validation  
✅ **Type Safety** - TypeScript prevents runtime errors  

---

## 🐛 Troubleshooting

### Frontend Can't Connect to Backend
```bash
# Check .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### WebSocket Connection Fails
- Verify backend is running
- Check firewall settings
- Verify Socket.io configuration

### Port Already in Use
```bash
# Frontend - Change port
npm run dev -- -p 3001

# Backend - Use .env
PORT=5001
```

---

## 📚 Learning Resources

### Technologies Used
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Socket.io Guide](https://socket.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a Pull Request

---

## 📄 License

MIT License - See LICENSE file in each repository

---

## 👨‍💻 Author

**Ujjwal Verma**

- 🐙 GitHub: [@Ujjwalverma2803](https://github.com/Ujjwalverma2803)
- 💼 LinkedIn: [Your Profile]
- 🌐 Portfolio: [Your Portfolio]

---

## 🔗 Repository Links

- **Frontend**: https://github.com/Ujjwalverma2803/polling-system
- **Backend**: https://github.com/Ujjwalverma2803/polling-system-backend

---

## 📞 Support & Questions

For issues or questions:
1. Check the individual repository READMEs
2. Open a GitHub Issue with details
3. Include error messages and steps to reproduce

---

## 🎓 Showcase Points for Recruiters

### Full-Stack Development
✨ Complete end-to-end application development  
✨ Both frontend and backend implementation  
✨ Deployment-ready code  

### Modern Technologies
✨ Latest frameworks (Next.js 15, React 19)  
✨ Real-time communication (WebSockets)  
✨ Type-safe development (TypeScript)  

### Best Practices
✨ Component-based architecture  
✨ Proper project structure  
✨ Comprehensive documentation  
✨ Error handling and validation  

### DevOps & Deployment
✨ Production-ready configuration  
✨ Environment management  
✨ Multiple deployment platforms  

---

**Built with ❤️ as a professional full-stack portfolio project**

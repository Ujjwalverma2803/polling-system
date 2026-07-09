# 🗳️ Polling System - Frontend

> A modern, full-stack real-time polling/voting application with real-time WebSocket updates

[**Live Demo**](#) | [**Backend API**](https://github.com/Ujjwalverma2803/polling-system-backend) | [**Documentation**](#documentation)

---

## 📋 Project Overview

This is a **complete full-stack polling system** designed to showcase modern web development practices. Users can create polls, vote in real-time, and see live results using WebSocket technology.

### 🔗 Connected Repositories
This project consists of two interconnected repositories:
- **Frontend** (This repo): `polling-system` - React/Next.js web application
- **Backend API**: [`polling-system-backend`](https://github.com/Ujjwalverma2803/polling-system-backend) - Express.js REST API with real-time WebSocket support

---

## ✨ Key Features

- ✅ **Create & Manage Polls** - Create custom polls with multiple options
- 🎯 **Real-Time Voting** - Vote on polls with instant UI updates via WebSocket
- 📊 **Live Results** - See poll results update in real-time as others vote
- 🎨 **Responsive Design** - Beautiful, mobile-first UI built with Tailwind CSS
- ⚡ **Fast & Modern** - Built with Next.js 15 and React 19 for optimal performance
- 🔌 **WebSocket Integration** - Real-time bidirectional communication using Socket.io
- 🧹 **Type-Safe** - Full TypeScript support for better code quality

---

## 🛠 Tech Stack

### Frontend Technologies
| Technology | Version | Purpose |
|----------|---------|---------|
| **Next.js** | ^15.3.1 | React framework with SSR/SSG |
| **React** | ^19.1.0 | UI library |
| **TypeScript** | 5.9.3 | Type-safe JavaScript |
| **Tailwind CSS** | ^3.4.17 | Utility-first CSS framework |
| **Socket.io Client** | ^4.8.1 | Real-time bidirectional communication |

### Backend Technologies (See [Backend Repo](https://github.com/Ujjwalverma2803/polling-system-backend))
- Express.js 5
- Socket.io (WebSocket server)
- CORS enabled for cross-origin requests

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**
- Backend API running on `http://localhost:5000` (or configured port)

### Installation & Setup

#### 1️⃣ Clone Repository
```bash
git clone https://github.com/Ujjwalverma2803/polling-system.git
cd polling-system
```

#### 2️⃣ Install Dependencies
```bash
npm install
# or
yarn install
```

#### 3️⃣ Configure Environment (Optional)
Create a `.env.local` file in the root:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

#### 4️⃣ Start Development Server
```bash
npm run dev
# or
yarn dev
```

The application will be available at **http://localhost:3000**

---

## 📁 Project Structure

```
polling-system/
├── app/                    # Next.js app directory
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/             # Reusable React components
│   ├── PollForm.tsx        # Create poll form
│   ├── PollList.tsx        # Display polls
│   └── VoteButton.tsx      # Vote interaction
├── hooks/                  # Custom React hooks
│   └── useSocket.ts        # WebSocket connection hook
├── types/                  # TypeScript type definitions
│   └── poll.ts             # Poll interface definitions
├── utils/                  # Utility functions
│   └── api.ts              # API client functions
├── public/                 # Static assets
├── .env.local              # Environment variables (not in repo)
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── next.config.ts          # Next.js configuration
```

---

## 🔌 API Integration

### Backend API Connection
The frontend communicates with the backend API using:

1. **REST API** - For data fetching and mutations
2. **WebSocket (Socket.io)** - For real-time updates

### Environment Configuration
```env
NEXT_PUBLIC_API_URL=http://localhost:5000        # Backend REST API
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000     # WebSocket server
```

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

### Example API Endpoints
- `GET /api/polls` - Fetch all polls
- `POST /api/polls` - Create a new poll
- `GET /api/polls/:id` - Get poll details
- `POST /api/polls/:id/vote` - Cast a vote

See [Backend API Documentation](https://github.com/Ujjwalverma2803/polling-system-backend) for complete API details.

---

## 📚 Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server (http://localhost:3000) |
| `npm run build` | Build optimized production bundle |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint to check code quality |

---

## 🔗 WebSocket Events

### Client-Side Events (Sent to Server)
```typescript
// Listen to events from backend
socket.on('poll_created', (poll) => {...})
socket.on('vote_cast', (data) => {...})
socket.on('poll_updated', (poll) => {...})

// Emit events to backend
socket.emit('create_poll', pollData)
socket.emit('cast_vote', { pollId, option })
```

---

## 🎯 Development Workflow

### Development Mode
```bash
npm run dev
```
- Hot module replacement enabled
- Development tools active
- Debugging information available

### Production Build
```bash
npm run build
npm start
```
- Optimized bundle size
- Tree-shaking enabled
- CSS minification

---

## 📋 Full-Stack Setup

To run the complete application, you need both repositories:

### Setup Both Services

**Terminal 1 - Backend:**
```bash
cd polling-system-backend
npm install
npm start
# Backend running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd polling-system
npm install
npm run dev
# Frontend running on http://localhost:3000
```

---

## 🔒 Best Practices Implemented

✅ **TypeScript** - Full type safety across the application  
✅ **Component-Based Architecture** - Reusable, maintainable components  
✅ **Real-Time Communication** - WebSocket for instant updates  
✅ **Responsive Design** - Mobile-first with Tailwind CSS  
✅ **Environment Configuration** - Flexible deployment settings  
✅ **Clean Code** - Following React/Next.js best practices  

---

## 🚢 Deployment

### Deploy to Vercel (Recommended for Next.js)
```bash
npm i -g vercel
vercel
```

### Deploy to Other Platforms
- **Netlify** - Connect GitHub repo
- **AWS Amplify** - AWS managed deployment
- **Docker** - Containerize and deploy anywhere

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📊 Performance Metrics

- ⚡ **Fast Load Times** - Optimized with Next.js
- 🎯 **Real-Time Updates** - <100ms latency with WebSockets
- 📱 **Mobile Optimized** - Responsive design
- 🔍 **SEO Ready** - Server-side rendering with Next.js

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### WebSocket Connection Failing
- Verify backend is running on correct port
- Check `NEXT_PUBLIC_SOCKET_URL` environment variable
- Ensure CORS is enabled on backend

### Build Errors
```bash
# Clear build cache
rm -rf .next
npm run build
```

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👨‍💻 Author

**Ujjwal Verma**

- GitHub: [@Ujjwalverma2803](https://github.com/Ujjwalverma2803)
- Portfolio: [Your Portfolio Link]
- LinkedIn: [Your LinkedIn Profile]

---

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Socket.io Documentation](https://socket.io/docs)
- [Tailwind CSS](https://tailwindcss.com)

---

## 📞 Support

For issues, questions, or suggestions:
1. Check existing [GitHub Issues](https://github.com/Ujjwalverma2803/polling-system/issues)
2. Create a new issue with detailed description
3. Contact via GitHub

---

**Built with ❤️ as a full-stack portfolio project**

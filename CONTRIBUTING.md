# Contributing to Polling System

Thank you for your interest in contributing to the Polling System project! This document provides guidelines and instructions for contributing.

## 🎯 Before You Start

### Understanding the Project
- This is a **full-stack polling application** with two separate repositories:
  - **Frontend**: [`polling-system`](https://github.com/Ujjwalverma2803/polling-system)
  - **Backend**: [`polling-system-backend`](https://github.com/Ujjwalverma2803/polling-system-backend)
- Read the [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) to understand the architecture
- Check the individual README files for technology-specific details

## 🚀 Getting Started

### 1. Fork the Repository
```bash
# Visit the repository and click "Fork" button
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/polling-system.git
cd polling-system
```

### 2. Set Up Development Environment

#### For Frontend
```bash
cd polling-system
npm install
npm run dev
```

#### For Backend
```bash
cd polling-system-backend
npm install
npm start
```

### 3. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
# or for bug fixes
git checkout -b fix/bug-description
```

## 📋 Development Guidelines

### Code Style
- **Frontend**: Follow React and TypeScript best practices
- **Backend**: Follow Express.js conventions
- Use consistent naming conventions
- Add meaningful comments for complex logic
- Keep functions small and focused

### TypeScript
- Always use TypeScript for new frontend code
- Define proper types/interfaces
- Avoid using `any` type
- Use strict mode

### Commit Messages
```bash
# Good commit message format
git commit -m "feat: Add real-time vote updates"
git commit -m "fix: Resolve WebSocket connection issue"
git commit -m "docs: Update API documentation"
git commit -m "refactor: Improve component structure"
```

### Pull Request Process

1. **Ensure your code is clean**
   ```bash
   npm run lint
   ```

2. **Test your changes locally**
   - Run both frontend and backend together
   - Test all related features
   - Check for console errors

3. **Create descriptive commit messages**
   - Be clear about what changes you made
   - Reference issues if applicable

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Use a clear title and description
   - Reference any related issues
   - Include screenshots for UI changes
   - Explain why the change is needed

## 🐛 Bug Reports

### Before Reporting
- Check existing issues to avoid duplicates
- Test with the latest version
- Gather relevant information

### How to Report
1. Use the **Issues** tab
2. Provide a clear title
3. Include steps to reproduce
4. Share error messages or screenshots
5. Specify your environment (Node version, OS, etc.)

**Example:**
```
Title: WebSocket connection fails on mobile devices

Description:
When accessing the app on mobile (iOS Safari), the WebSocket 
connection fails with error: "Connection refused"

Steps to reproduce:
1. Open app on iOS Safari
2. Try to create a poll
3. Observe WebSocket error in console

Environment:
- iOS 16.5
- Safari 16.5
- Device: iPhone 12
```

## ✨ Feature Requests

### Suggesting Enhancements
1. Check if the feature already exists or was rejected
2. Provide a clear use case
3. Explain the expected behavior
4. Share any design ideas or examples

**Example:**
```
Title: Add poll expiration feature

Description:
Allow polls to automatically close after a specified duration
to prevent voting on old polls.

Use case:
Real-time event polling should close when the event ends.

Expected behavior:
- User sets expiration time when creating poll
- Poll automatically closes after expiration
- Users see countdown timer on poll
```

## 📚 Documentation

### Frontend Documentation
- Update [README.md](./README.md) for frontend changes
- Document new components in code comments
- Add TypeScript interfaces documentation

### Backend Documentation
- Update [Backend README](https://github.com/Ujjwalverma2803/polling-system-backend/blob/main/README.md)
- Document new API endpoints
- Update WebSocket event documentation

### Project Documentation
- Update [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) for architecture changes
- Keep deployment guides current

## 🔍 Testing Guidelines

### Frontend Testing
```bash
# Run linting
npm run lint

# Build to check for errors
npm run build
```

### Backend Testing
```bash
# Verify all endpoints work
# Test WebSocket connections
# Check error handling
```

### Manual Testing Checklist
- [ ] Feature works as intended
- [ ] No console errors or warnings
- [ ] Responsive design works on mobile
- [ ] WebSocket communication functions correctly
- [ ] Environment variables are properly configured

## 🌟 Best Practices

### Code Quality
✅ Write clean, readable code  
✅ Use meaningful variable names  
✅ Keep functions focused and small  
✅ Remove console.log before committing  
✅ Add error handling and validation  

### Performance
✅ Optimize component rendering  
✅ Minimize bundle size  
✅ Use efficient algorithms  
✅ Handle WebSocket connections properly  

### Security
✅ Validate user inputs  
✅ Sanitize data  
✅ Use environment variables for secrets  
✅ Don't commit sensitive information  

### Accessibility
✅ Use semantic HTML  
✅ Add alt text for images  
✅ Ensure keyboard navigation  
✅ Test with screen readers  

## 📂 Project Structure Reference

### Frontend Organization
```
polling-system/
├── app/              # Next.js routes and layouts
├── components/       # React components
├── hooks/           # Custom React hooks
├── types/           # TypeScript interfaces
├── utils/           # Helper functions
└── public/          # Static assets
```

### Backend Organization
```
polling-system-backend/
├── routes/          # API route definitions
├── controllers/     # Request handlers
├── models/          # Data structures
├── middleware/      # Custom middleware
├── events/          # Socket.io handlers
└── index.js         # Entry point
```

## 🤝 Community Guidelines

### Be Respectful
- Treat all community members with respect
- Be open to constructive criticism
- Provide helpful feedback
- Focus on the code, not the person

### Communication
- Ask questions if unclear
- Help others when you can
- Share knowledge and resources
- Keep discussions professional

### Attribution
- Credit original authors
- Reference related issues and PRs
- Acknowledge inspirations and sources

## 📝 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

## 🎓 Learning Resources

### Frontend
- [Next.js Docs](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Guide](https://tailwindcss.com/docs)

### Backend
- [Express.js Guide](https://expressjs.com)
- [Socket.io Documentation](https://socket.io/docs)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides)

## ❓ Questions?

- 📖 Check the [README files](./README.md)
- 📚 Review [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)
- 💬 Open a GitHub Discussion
- 🐛 Search existing Issues

## 🎉 Thank You!

We appreciate your contribution to making the Polling System better! Your efforts help improve this project for everyone.

---

**Happy Contributing! 🚀**

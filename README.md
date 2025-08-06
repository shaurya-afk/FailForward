# 🚀 FailForward

**FailForward** is a community-driven platform where founders, developers, and dreamers share their stories of failed startups — not to mourn them, but to extract the lessons, challenges, and raw truths behind every shutdown.

The goal is to create a transparent archive of startup journeys that didn't make it — so future entrepreneurs can avoid the same pitfalls and build better.

[Failforward Backend](https://github.com/shaurya-afk/failforward-backend)

---

## ✨ Features

- **📖 Story Sharing**: Share your startup failure stories anonymously or publicly
- **🔍 Story Discovery**: Browse and search through real failure experiences
- **💬 Community Engagement**: Like stories and add comments to support others
- **🛡️ Privacy Options**: Post stories anonymously to protect your identity
- **📱 Responsive Design**: Beautiful, modern UI that works on all devices
- **⚡ Real-time Updates**: Live like counts and comment updates
- **🔐 Secure Authentication**: Powered by Clerk for reliable user management

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.3.4 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

### Backend
- **Framework**: Spring Boot (Java)
- **Database**: PostgreSQL
- **Deployment**: Render

---

## 📦 Project Status

> This project is **under development**.  
> It's live on GitHub and open to contributions.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shaurya-afk/failforward-frontend.git
   cd failforward-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Clerk configuration:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
frontend_deaddocs/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/             # About page
│   │   ├── my-stories/        # User's stories page
│   │   ├── see-stories/       # Browse all stories
│   │   ├── share-story/       # Story creation form
│   │   ├── story/[id]/        # Individual story view
│   │   ├── sign-in/           # Authentication pages
│   │   └── sign-up/
│   ├── components/            # Reusable React components
│   │   ├── ui/               # UI components (buttons, cards, etc.)
│   │   ├── Header.tsx        # Navigation header
│   │   ├── Footer.tsx        # Site footer
│   │   └── ...
│   ├── data/                 # API functions and data handling
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   ├── types/                # TypeScript type definitions
│   └── middleware.ts         # Next.js middleware
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind CSS configuration
├── next.config.ts           # Next.js configuration
└── package.json             # Dependencies and scripts
```

---

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type checking
npx tsc --noEmit     # Check TypeScript types
```

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended rules
- **Prettier**: Automatic code formatting
- **Conventional Commits**: For commit messages

### Key Development Guidelines

1. **Type Safety**: Always use TypeScript types
2. **Component Structure**: Use functional components with hooks
3. **Styling**: Use Tailwind CSS classes
4. **State Management**: Use React hooks (useState, useEffect, etc.)
5. **Error Handling**: Implement proper error boundaries and try-catch blocks

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Backend API
NEXT_PUBLIC_API_URL=https://failforward-backend.onrender.com
```

### Tailwind CSS

The project uses Tailwind CSS with custom configuration for:
- Custom color palette
- Typography scales
- Animation utilities
- Responsive breakpoints

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on push to main branch

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm run start
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test your changes**
   ```bash
   npm run build
   npm run lint
   ```
5. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Contribution Guidelines

- **Bug Reports**: Use GitHub Issues with detailed descriptions
- **Feature Requests**: Open an issue with use case and mockups
- **Code Contributions**: Follow the existing code style and patterns
- **Documentation**: Update README and add comments for complex logic

### Development Workflow

1. **Create an issue** for bugs or features
2. **Assign yourself** to the issue
3. **Create a branch** from main
4. **Make changes** and test thoroughly
5. **Update documentation** if needed
6. **Submit a PR** with clear description

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Clerk** for authentication
- **Vercel** for hosting and deployment
- **Tailwind CSS** for styling
- **Next.js** team for the amazing framework
- **All contributors** who share their stories

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/shaurya-afk/failforward-frontend/issues)
- **Discussions**: [GitHub Discussions](https://github.com/shaurya-afk/failforward-frontend/discussions)
- **Email**: [Your email here]

---

## 🔗 Links

- **Live Site**: [FailForward](https://failforward.vercel.app)
- **Backend Repository**: [FailForward Backend](https://github.com/shaurya-afk/failforward-backend)
- **Documentation**: [Wiki](https://github.com/shaurya-afk/failforward-frontend/wiki)

---

<div align="center">
  <p>Made with ❤️ by the FailForward community</p>
  <p>Every failure is a lesson waiting to be shared</p>
</div>

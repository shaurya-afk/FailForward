# Contributing to FailForward

Thank you for your interest in contributing to FailForward! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### 1. Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/failforward-frontend.git
   cd failforward-frontend
   ```

### 2. Set Up Development Environment

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Clerk keys
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### 3. Create a Branch

Create a feature branch from `main`:
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 4. Make Your Changes

- Write clean, readable code
- Follow the existing code style
- Add TypeScript types for all new code
- Write meaningful commit messages
- Test your changes thoroughly

### 5. Test Your Changes

Before submitting:
```bash
# Run the linter
npm run lint

# Check TypeScript types
npx tsc --noEmit

# Build the project
npm run build
```

### 6. Commit Your Changes

Use conventional commit messages:
```bash
git commit -m "feat: add new story sharing feature"
git commit -m "fix: resolve authentication issue"
git commit -m "docs: update README with new instructions"
```

### 7. Push and Create a Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title and description
- Reference to any related issues
- Screenshots for UI changes
- Test instructions

## 📋 Development Guidelines

### Code Style

- **TypeScript**: Use strict mode, avoid `any` types
- **React**: Use functional components with hooks
- **Styling**: Use Tailwind CSS classes
- **Naming**: Use descriptive names for variables and functions
- **Comments**: Add comments for complex logic

### File Structure

```
src/
├── app/           # Next.js pages (App Router)
├── components/    # Reusable React components
├── data/         # API functions and data handling
├── hooks/        # Custom React hooks
├── lib/          # Utility functions
└── types/        # TypeScript type definitions
```

### Component Guidelines

- Keep components small and focused
- Use TypeScript interfaces for props
- Implement proper error handling
- Add loading states where appropriate
- Make components accessible

### API Integration

- Use the existing API functions in `src/data/api.ts`
- Handle errors gracefully
- Add proper loading states
- Implement retry logic for network failures

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Step-by-step instructions
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: Browser, OS, device
6. **Screenshots**: If applicable

## 💡 Feature Requests

When requesting features, please include:

1. **Use Case**: Why this feature is needed
2. **Description**: Detailed feature description
3. **Mockups**: Visual examples if applicable
4. **Implementation Ideas**: How it could be implemented

## 🔧 Development Workflow

### Before Starting

1. Check existing issues and PRs
2. Discuss your approach in an issue first
3. Make sure your feature aligns with project goals

### During Development

1. Write tests for new functionality
2. Update documentation as needed
3. Follow the existing patterns
4. Keep commits small and focused

### Before Submitting

1. Run all tests and checks
2. Update documentation
3. Add screenshots for UI changes
4. Write a clear PR description

## 📝 Commit Message Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(auth): add social login with Google
fix(api): resolve story creation error
docs(readme): update installation instructions
style(components): format code with prettier
```

## 🧪 Testing

### Manual Testing

Test your changes on:
- [ ] Desktop (Chrome, Firefox, Safari)
- [ ] Mobile (iOS Safari, Chrome Mobile)
- [ ] Different screen sizes
- [ ] With and without authentication

### Automated Testing

Run the following commands:
```bash
npm run lint          # ESLint
npx tsc --noEmit     # TypeScript
npm run build        # Build check
```

## 📚 Documentation

When adding new features:

1. Update the README if needed
2. Add JSDoc comments for functions
3. Update type definitions
4. Add usage examples

## 🎨 UI/UX Guidelines

- Follow the existing design system
- Use the established color palette
- Maintain responsive design
- Ensure accessibility (ARIA labels, keyboard navigation)
- Test on different devices

## 🔒 Security

- Never commit sensitive data (API keys, passwords)
- Use environment variables for configuration
- Validate user input
- Follow security best practices

## 🚀 Deployment

- Test your changes in development
- Ensure the build passes
- Check that all features work as expected
- Update environment variables if needed

## 📞 Getting Help

If you need help:

1. Check existing issues and discussions
2. Ask questions in GitHub Discussions
3. Create an issue for bugs or feature requests
4. Join our community chat (if available)

## 🙏 Recognition

All contributors will be:

- Listed in the README
- Mentioned in release notes
- Given credit in the project

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to FailForward! Your help makes this project better for everyone. 🚀 
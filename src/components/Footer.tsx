// src/components/Footer.tsx
export default function Footer() {
    return (
      <footer className="w-full bg-background-cream border-t border-gray-200 mt-12 animate-fade-in-up animation-delay-500">
        <div className="container mx-auto px-6 py-8 text-center text-secondary-200">
          <p>&copy; {new Date().getFullYear()} FailForward. All rights reserved.</p>
          <p className="text-sm mt-2">A safe space to learn and grow from shared experiences.</p>
        </div>
      </footer>
    );
  }
  
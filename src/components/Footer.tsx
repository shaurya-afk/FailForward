"use client";
import React from "react";
import Link from "next/link";
import { Heart, Github, Mail, Twitter, Linkedin, Sparkles } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-t border-white/10">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                FailForward
              </h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Learn from real startup failures. Share your story, help others avoid the same mistakes. 
              Every setback is a stepping stone in disguise.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/your-repo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300 p-2 rounded-lg hover:bg-white/5"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/failforward"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300 p-2 rounded-lg hover:bg-white/5"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/failforward"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300 p-2 rounded-lg hover:bg-white/5"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:shauryasha090@gmail.com"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300 p-2 rounded-lg hover:bg-white/5"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/see-stories" 
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  Browse Stories
                </Link>
              </li>
              <li>
                <Link 
                  href="/share-story" 
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  Share Your Story
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/privacy" 
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:shauryasha090@gmail.com" 
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  Email Support
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© {currentYear} FailForward. Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>by the community</span>
            </div>
            <div className="text-gray-400 text-sm">
              <span>Open source project. </span>
              <a 
                href="https://github.com/your-repo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
              >
                Contribute on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

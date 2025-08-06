"use client";
import { motion } from "framer-motion";
import { Sparkles, Github, Mail, Linkedin, Globe } from "lucide-react";
import { useState } from "react";
import Loading from "@/components/Loading";

export default function About() {
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigation = (href: string) => {
    setIsNavigating(true);
    window.location.href = href;
  };

  if (isNavigating) return <Loading />;
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <h1 className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                About FailForward
              </h1>
              <Sparkles className="w-8 h-8 text-cyan-400" />
            </div>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              A platform where founders share their failures to help others succeed.
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Our Mission
            </h2>
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                In a world obsessed with success stories, we believe that <span className="text-purple-400 font-semibold">real learning comes from understanding failures</span>. 
                Every startup failure contains valuable lessons that can prevent others from making the same mistakes.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                FailForward is more than just a platform—it&apos;s a community of entrepreneurs who believe in transparency, 
                learning from each other, and building a stronger startup ecosystem through shared experiences.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-purple-300 mb-4">Transparency</h3>
                <p className="text-gray-300">
                  We believe in honest, unfiltered sharing of experiences—both successes and failures.
                </p>
              </div>
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-lg border border-cyan-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-cyan-300 mb-4">Learning</h3>
                <p className="text-gray-300">
                  Every story shared becomes a lesson for someone else on their entrepreneurial journey.
                </p>
              </div>
              <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-lg border border-pink-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-pink-300 mb-4">Community</h3>
                <p className="text-gray-300">
                  Building a supportive network of founders who help each other grow and succeed.
                </p>
              </div>
            </div>
          </div>

          {/* Creator Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Meet the Creator
            </h2>
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">S</span>
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Shaurya
                  </h3>
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    A backend-focused developer passionate about building performant APIs, scalable systems, and developer-friendly tools. 
                    With expertise in <span className="text-purple-400 font-semibold">Spring Boot, Java, and distributed systems</span>, 
                    I&apos;ve worked on projects ranging from hospital management systems to AI-powered bots and event-based microservices.
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/shaurya-afk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-300 p-2 rounded-lg hover:bg-white/5"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href="mailto:shauryasha090@gmail.com"
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-300 p-2 rounded-lg hover:bg-white/5"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                    <a
                      href="https://linkedin.com/in/shaurya-afk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-300 p-2 rounded-lg hover:bg-white/5"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="https://shauryasha.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-300 p-2 rounded-lg hover:bg-white/5"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Share Your Story?
            </h2>
            <p className="text-lg text-purple-200 mb-8 max-w-2xl mx-auto">
              Join our community and help other founders learn from your experiences.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={() => handleNavigation('/share-story')}
                className="px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Share Your Story
              </button>
              <button
                onClick={() => handleNavigation('/see-stories')}
                className="px-8 py-4 text-lg font-medium text-purple-400 border-2 border-purple-400 rounded-xl hover:bg-purple-400 hover:text-white transform hover:scale-105 transition-all duration-300"
              >
                Browse Stories
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

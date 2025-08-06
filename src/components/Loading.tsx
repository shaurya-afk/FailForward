import { Sparkles } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="text-center">
                <div className="relative mb-8">
                    <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Loading FailForward</h2>
                <p className="text-purple-200">Preparing your experience...</p>
            </div>
        </div>
    );
}
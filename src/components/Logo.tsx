
import { Brain, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative">
        <Brain className="w-8 h-8 text-indigo-600 transition-transform group-hover:scale-110" />
        <Sparkles className="w-4 h-4 text-purple-500 absolute -top-1 -right-1 animate-pulse" />
      </div>
      <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        Pat&Max's AI Hut
      </span>
    </Link>
  );
};

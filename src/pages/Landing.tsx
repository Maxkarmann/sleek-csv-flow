
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            UI/UX Assessment Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your CSV files and let our AI-powered system analyze your UI/UX data.
            Get instant insights and improve your design decisions.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button asChild variant="outline" className="text-lg px-6 py-6">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="text-lg px-6 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              <Link to="/signup">
                Get Started
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

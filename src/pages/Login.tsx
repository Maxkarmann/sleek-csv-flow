
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";
import { useState } from "react";
import { services } from "@/data/services";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const searchParams = new URLSearchParams(location.search);
  const serviceId = searchParams.get("service") || "";
  
  const selectedService = services.find(service => service.id === serviceId) || services[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // We'll add real auth later when integrating Supabase
    
    // For now, simulate a login and redirect
    if (email && password) {
      // Store the selected service in local storage for now
      localStorage.setItem("selectedService", selectedService.id);
      localStorage.setItem("userEmail", email);
      
      toast({
        title: "Success",
        description: `Logged into ${selectedService.name} service`,
      });
      
      navigate("/dashboard");
    } else {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="flex justify-center mb-8">
        <Logo />
      </div>
      
      <div className="max-w-md mx-auto backdrop-blur-sm bg-white/30 rounded-2xl shadow-xl border border-white/20 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Welcome to {selectedService.name}
          </h1>
          <p className="text-gray-600 mt-2">Sign in to continue using our service</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              className="w-full"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              className="w-full"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
            Sign In
          </Button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to={`/signup?service=${serviceId}`} className="text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

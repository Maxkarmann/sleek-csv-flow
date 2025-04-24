
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";
import { useState } from "react";
import { services } from "@/data/services";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const searchParams = new URLSearchParams(location.search);
  const serviceId = searchParams.get("service") || "";
  
  const selectedService = services.find(service => service.id === serviceId) || services[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // We'll add real auth later when integrating Supabase
    
    if (fullName && email && password) {
      // Store user info in local storage for now
      localStorage.setItem("selectedService", selectedService.id);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", fullName);
      
      toast({
        title: "Account created",
        description: `Welcome ${fullName}! Your account for ${selectedService.name} has been created.`,
      });
      
      navigate("/dashboard");
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields",
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
            Join {selectedService.name}
          </h1>
          <p className="text-gray-600 mt-2">Create your account to get started</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Full Name"
              className="w-full"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
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
            Create Account
          </Button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to={`/login?service=${serviceId}`} className="text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

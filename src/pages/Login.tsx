
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // We'll add real auth later
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-md mx-auto backdrop-blur-sm bg-white/30 rounded-2xl shadow-xl border border-white/20 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Welcome Back
          </h1>
          <p className="text-gray-600 mt-2">Sign in to continue to your dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              className="w-full"
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              className="w-full"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
            Sign In
          </Button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;


import { FileUpload } from "../components/FileUpload";
import { FileCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>("");
  
  useEffect(() => {
    // Check if user is logged in
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    } else {
      // Redirect to login page if not logged in
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center mb-6">
            <FileCheck className="h-12 w-12 text-indigo-600 animate-pulse" />
          </div>
          <h1 className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            CSV Workflow Trigger
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Streamline your workflow by uploading your CSV file. Our AI-powered system will handle the processing seamlessly.
          </p>
        </div>
        <div className="backdrop-blur-sm bg-white/30 rounded-2xl shadow-xl border border-white/20 p-8">
          {userEmail && (
            <FileUpload 
              serviceId="csv-workflow-trigger" 
              serviceName="CSV Workflow Trigger" 
              userEmail={userEmail} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;

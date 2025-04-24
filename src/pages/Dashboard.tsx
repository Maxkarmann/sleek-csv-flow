
import { useEffect, useState } from "react";
import { FileUpload } from "../components/FileUpload";
import { ServiceUsage, getUserServiceUsage } from "../models/UserServiceUsage";
import { services } from "../data/services";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [serviceUsage, setServiceUsage] = useState<ServiceUsage[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    // Check if user is logged in
    const email = localStorage.getItem("userEmail");
    const name = localStorage.getItem("userName");
    const serviceId = localStorage.getItem("selectedService");
    
    if (!email) {
      navigate("/login");
      return;
    }
    
    setUserEmail(email);
    if (name) setUserName(name);
    if (serviceId) setSelectedServiceId(serviceId);
    
    // Get service usage
    const usage = getUserServiceUsage(email);
    setServiceUsage(usage);
  }, [navigate]);

  const selectedService = services.find(service => service.id === selectedServiceId) || services[0];

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("selectedService");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-12">
          <Logo />
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut size={16} /> Logout
          </Button>
        </div>

        <div className="backdrop-blur-sm bg-white/30 rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
              {selectedService.name} Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Welcome{userName ? `, ${userName}` : ""}! Upload your data to start using our AI service.
            </p>
          </div>
          
          <FileUpload serviceId={selectedServiceId} serviceName={selectedService.name} userEmail={userEmail} />
        </div>

        {/* Usage Statistics */}
        <div className="backdrop-blur-sm bg-white/30 rounded-2xl shadow-xl border border-white/20 p-8">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-600">Your Service Usage</h2>
          
          {serviceUsage.length === 0 ? (
            <p className="text-center text-gray-500 py-6">You haven't used any services yet.</p>
          ) : (
            <div className="space-y-4">
              {serviceUsage.map((usage) => (
                <div 
                  key={usage.serviceId} 
                  className="flex justify-between items-center p-4 bg-white/60 rounded-lg border border-indigo-100"
                >
                  <div>
                    <h3 className="font-medium text-lg">{usage.serviceName}</h3>
                    <p className="text-sm text-gray-500">Last used: {new Date(usage.lastUsed).toLocaleDateString()}</p>
                  </div>
                  <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-medium">
                    {usage.count} {usage.count === 1 ? 'use' : 'uses'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { services } from "@/data/services";
import { Card, CardContent } from "@/components/ui/card";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2C3E50] via-[#34495E] to-[#2980B9]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1ABC9C] to-[#16A085]">
            AI-Powered Solutions
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select one of our AI services to transform your business with cutting-edge technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service) => (
            <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow border border-[#34495E] bg-[#2C3E50]/50 backdrop-blur-sm">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex flex-col items-center text-center space-y-4 flex-grow">
                  <div className="p-3 rounded-full bg-[#1ABC9C]/20">
                    <service.icon className="h-8 w-8 text-[#1ABC9C]" />
                  </div>
                  <h3 className="font-semibold text-xl text-white">{service.name}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
                <Button 
                  asChild 
                  className="mt-4 w-full bg-gradient-to-r from-[#1ABC9C] to-[#16A085] hover:from-[#16A085] hover:to-[#1ABC9C] text-white"
                >
                  <Link to={`/login?service=${service.id}`}>
                    Select Service
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;

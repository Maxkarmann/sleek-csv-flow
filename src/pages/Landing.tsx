
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { services } from "@/data/services";
import { Card, CardContent } from "@/components/ui/card";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            AI-Powered Solutions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select one of our AI services to transform your business with cutting-edge technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service) => (
            <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow border border-indigo-100 bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-indigo-100">
                    <service.icon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-xl">{service.name}</h3>
                  <p className="text-gray-600">{service.description}</p>
                  <Button asChild className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                    <Link to={`/login?service=${service.id}`}>
                      Select Service
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;

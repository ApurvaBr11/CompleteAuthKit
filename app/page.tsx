import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { FaShieldAlt, FaBolt, FaCode } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

const features = [
  { title: 'Secure', icon: FaShieldAlt, description: 'State-of-the-art security protocols to protect your users' },
  { title: 'Flexible', icon: FaBolt, description: 'Easily adaptable to fit your specific project requirements.' },
  { title: 'Developer-Friendly', icon: FaCode, description: 'Intuitive API and comprehensive documentation for quick integration.' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-8 text-gray-800">
      <div className="max-w-4xl w-full space-y-16 text-center">
        <div className="space-y-6">
          <h1 className="text-6xl font-extrabold tracking-tight text-gray-900">
            Welcome to <span className="text-blue-600">allAuthKit</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The professional authentication solution for modern web applications
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <LoginButton asChild>
            <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
              Get Started <FaArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </LoginButton>
          <Button size="lg" variant="outline" className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-100">
            Learn More
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-16">
          {features.map((feature) => (
            <div 
              key={feature.title} 
              className="group bg-white p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <feature.icon 
                className="h-12 w-12 text-blue-600 mb-4 mx-auto transform transition-transform duration-300 group-hover:scale-90" 
              />
              <h3 
                className="text-xl font-semibold mb-3 text-gray-800 transform transition-transform duration-300 group-hover:scale-110"
              >
                {feature.title}
              </h3>
              <p 
                className="text-gray-600 transform transition-transform duration-300 group-hover:scale-105"
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

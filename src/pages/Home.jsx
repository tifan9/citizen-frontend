import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Users, BarChart3 } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Your Voice Matters in Our Community
              </h1>
              <p className="text-blue-100 text-lg mb-8">
                Submit, track, and resolve issues with your local government services. 
                InziraYacu makes it easy to report problems and get them fixed.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => navigate('/submit')}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit a Complaint
                </button>
                <button 
                  onClick={() => navigate('/register')}
                  className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create an Account
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="People collaborating" 
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our simple three-step process helps connect citizens with government agencies to solve community issues.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Submit Your Issue</h3>
              <p className="text-gray-600">
                Select a category and describe your issue or feedback. Provide as much detail as possible.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Your Complaint</h3>
              <p className="text-gray-600">
                We'll automatically route your issue to the right department and provide you with a tracking number.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Resolution</h3>
              <p className="text-gray-600">
                Receive updates as your issue is addressed and resolved by the responsible government agency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Making a Difference</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              InziraYacu is helping citizens and government work together for better communities.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full text-blue-600 mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              <p className="text-3xl font-bold text-gray-900">3,542</p>
              <p className="text-gray-600">Issues Resolved</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full text-blue-600 mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <p className="text-3xl font-bold text-gray-900">24hrs</p>
              <p className="text-gray-600">Avg. Response Time</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full text-blue-600 mb-4">
                <Users className="h-8 w-8" />
              </div>
              <p className="text-3xl font-bold text-gray-900">15,400</p>
              <p className="text-gray-600">Registered Citizens</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full text-blue-600 mb-4">
                <BarChart3 className="h-8 w-8" />
              </div>
              <p className="text-3xl font-bold text-gray-900">92%</p>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-3xl mx-auto">
            Join thousands of citizens who are making their communities better through InziraYacu. It only takes a minute to create an account.
          </p>
          <button 
            onClick={() => navigate('/register')}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Sign Up Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
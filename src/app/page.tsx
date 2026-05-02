import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Search, Target, TrendingUp, MapPin, Briefcase, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white section-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect Role Match
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              CandidateConnect uses smart matching to connect talented candidates with companies that fit their skills and aspirations.
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-xl p-2 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto mb-8">
              <div className="flex items-center flex-1 px-4 py-2 text-gray-500">
                <Search className="w-5 h-5 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search roles, skills, or companies"
                  className="flex-1 bg-transparent outline-none text-gray-900"
                />
              </div>
              <div className="flex items-center px-4 py-2 text-gray-500 border-l border-gray-200">
                <MapPin className="w-5 h-5 mr-2" />
                <input 
                  type="text" 
                  placeholder="Location"
                  className="bg-transparent outline-none text-gray-900"
                />
              </div>
              <Button size="lg" className="px-8">Search</Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/candidates/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Get Started as Candidate
                </Button>
              </Link>
              <Link href="/roles">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700 w-full sm:w-auto">
                  Browse Open Roles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Get matched with your dream role in three simple steps
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
              <p className="text-slate-600">
                Sign up and showcase your skills, experience, and career preferences.
              </p>
            </Card>
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Matched</h3>
              <p className="text-slate-600">
                Our algorithm analyzes your profile and finds roles that match your skills.
              </p>
            </Card>
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Apply & Succeed</h3>
              <p className="text-slate-600">
                Apply to matched roles with one click and track your application status.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">10K+</div>
              <div className="text-slate-600">Active Candidates</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-slate-600">Companies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">5K+</div>
              <div className="text-slate-600">Roles Posted</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">3K+</div>
              <div className="text-slate-600">Successful Hires</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Roles Preview */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Roles</h2>
            <Link href="/roles" className="text-blue-600 hover:underline flex items-center gap-1">
              View all <Briefcase className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="text-sm text-slate-500 mb-2">TechCorp · San Francisco</div>
              <h3 className="text-lg font-semibold mb-2">Senior Frontend Engineer</h3>
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                Join our team building scalable web applications with React and TypeScript.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">React</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">TypeScript</span>
              </div>
              <span className="text-green-600 font-medium">$150K - $180K</span>
            </Card>
            <Card className="p-6">
              <div className="text-sm text-slate-500 mb-2">DataFlow Inc · Remote</div>
              <h3 className="text-lg font-semibold mb-2">Backend Engineer</h3>
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                Build scalable APIs with Python and FastAPI for our data platform.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Python</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">FastAPI</span>
              </div>
              <span className="text-green-600 font-medium">$120K - $150K</span>
            </Card>
            <Card className="p-6">
              <div className="text-sm text-slate-500 mb-2">DesignStudio · New York</div>
              <h3 className="text-lg font-semibold mb-2">Product Designer</h3>
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                Create beautiful and intuitive user experiences for our products.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Figma</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">UI/UX</span>
              </div>
              <span className="text-green-600 font-medium">$100K - $130K</span>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Job?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of candidates who found their perfect role through CandidateConnect.
          </p>
          <Link href="/candidates/register">
            <Button size="lg" variant="secondary">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
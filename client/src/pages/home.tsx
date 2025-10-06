import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles, Briefcase, ArrowRight, Upload, Search, Target } from 'lucide-react';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-3xl mx-auto text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs font-medium text-gray-900 mb-1 animate-in fade-in slide-in-from-top-2 duration-700">
                <Sparkles className="w-3 h-3" />
                AI-Powered Matching
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight animate-in fade-in slide-in-from-bottom-3 duration-1000" style={{ animationDelay: '100ms' }}>
                Find Your Perfect Match{' '}
                <span className="block mt-1">with <span className="bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">ResumeRAG</span></span>
              </h1>
              
              <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-1000" style={{ animationDelay: '200ms' }}>
                Leverage cutting-edge AI to match candidates with jobs based on skills, experience, and cultural fit. Stop guessing, start matching.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 animate-in fade-in slide-in-from-bottom-1 duration-1000" style={{ animationDelay: '300ms' }}>
                <Link href="/dashboard">
                  <Button className="px-6 h-9 bg-black hover:bg-gray-800 text-white text-sm shadow-md hover:shadow-lg transition-all duration-300" data-testid="button-upload-resume">
                    Try AI Job Matcher
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="px-6 h-9 border border-gray-300 hover:border-black hover:text-black text-sm transition-all duration-300" data-testid="button-post-job">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* Why Choose Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Powerful Features
              </h2>
              <p className="text-sm text-gray-600 max-w-xl mx-auto">
                Everything you need for intelligent hiring
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {[
                {
                  icon: Sparkles,
                  title: 'Instant Matching',
                  description: 'AI analyzes resumes in seconds and matches with relevant opportunities',
                  iconBg: 'bg-yellow-100',
                  iconColor: 'text-yellow-600',
                  delay: '0ms',
                },
                {
                  icon: FileText,
                  title: 'Smart Scoring',
                  description: 'Get detailed match scores based on skills, experience, and requirements',
                  iconBg: 'bg-blue-100',
                  iconColor: 'text-blue-600',
                  delay: '100ms',
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg border border-gray-200 bg-white hover:border-gray-300 hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
                  style={{ animationDelay: feature.delay }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg ${feature.iconBg} ${feature.iconColor} flex items-center justify-center flex-shrink-0`}>
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold mb-1">{feature.title}</h3>
                      <p className="text-xs text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                How It Works
              </h2>
              <p className="text-sm text-gray-600">
                Three simple steps to success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                {
                  step: '01',
                  title: 'Upload Resume',
                  description: 'Drag and drop your resume. Our AI parses and extracts key information automatically.',
                  icon: Upload,
                  delay: '0ms',
                },
                {
                  step: '02',
                  title: 'AI Analysis',
                  description: 'Advanced algorithms analyze skills, experience, and match with opportunities.',
                  icon: Search,
                  delay: '100ms',
                },
                {
                  step: '03',
                  title: 'Get Matched',
                  description: 'Review and apply to jobs with detailed match scores and recommendations.',
                  icon: Target,
                  delay: '200ms',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="text-center p-4 animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: item.delay }}
                >
                  <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold mx-auto mb-3">
                    {item.step}
                  </div>
                  <h3 className="text-sm font-bold mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-gradient-to-br from-indigo-600 to-purple-600">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center space-y-4 text-white animate-in fade-in slide-in-from-bottom-2 duration-700">
              <h2 className="text-2xl md:text-3xl font-black">
                Ready to Transform Your Hiring?
              </h2>
              <p className="text-sm opacity-90">
                Join thousands of companies and candidates finding their perfect match
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link href="/dashboard">
                  <Button className="px-6 h-9 bg-white text-indigo-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-bold" data-testid="button-start-today">
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="px-6 h-9 border-2 border-white text-white hover:bg-white/10 transition-all duration-300 text-sm font-bold" data-testid="button-sign-in">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="text-sm text-gray-600">
              © 2025 <span className="font-semibold">ResumeRAG</span>. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-black transition-colors">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { FileText, LogOut } from 'lucide-react';
import { isAuthenticated, clearAuthToken } from '@/lib/auth';

export default function Header() {
  const [location, setLocation] = useLocation();
  const isLoggedIn = isAuthenticated() && location === '/dashboard';

  const handleLogout = () => {
    clearAuthToken();
    setLocation('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" data-testid="link-home">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-all duration-200">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">ResumeRAG</span>
          </div>
        </Link>

        <nav className="flex items-center gap-3">
          {isLoggedIn ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-700 hover:text-black"
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          ) : (
            <>
              {location !== '/login' && (
                <Link href="/login" data-testid="link-login">
                  <Button variant="ghost" size="sm" className="text-gray-700 hover:text-black">
                    Login
                  </Button>
                </Link>
              )}
              {location !== '/dashboard' && (
                <Link href="/dashboard" data-testid="link-dashboard">
                  <Button size="sm" className="bg-black hover:bg-gray-800 text-white shadow-md hover:shadow-lg transition-all duration-300">
                    Go to Dashboard
                  </Button>
                </Link>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

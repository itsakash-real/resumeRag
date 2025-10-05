import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText, Lock, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { setAuthToken } from '@/lib/auth';
import Header from '@/components/Header';

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Demo credentials validation
    if (email === 'admin@mail.com' && password === 'admin123') {
      setTimeout(() => {
        setAuthToken('demo-token-' + Date.now());
        toast({
          title: 'Login successful',
          description: 'Welcome back!',
        });
        setLocation('/dashboard');
        setIsLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        toast({
          title: 'Login failed',
          description: 'Invalid credentials. Use demo credentials: admin@mail.com / admin123',
          variant: 'destructive',
        });
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-20 min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-sm p-6 animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-lg border-gray-200">
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold mb-1 text-gray-900">Welcome Back</h1>
            <p className="text-xs text-gray-500">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm text-gray-700">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 h-9 text-sm border border-gray-200 focus:border-black rounded-lg transition-all"
                  required
                  data-testid="input-email"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="password" className="text-sm text-gray-700">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 h-9 text-sm border border-gray-200 focus:border-black rounded-lg transition-all"
                  required
                  data-testid="input-password"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-9 bg-black hover:bg-gray-800 text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              disabled={isLoading}
              data-testid="button-login"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-600 mb-2 font-semibold">Login with demo credentials</p>
            <div className="space-y-1 text-xs bg-gray-50 p-3 rounded-lg">
              <p className="font-medium"><span className="text-gray-600">Email:</span> <span className="font-mono" data-testid="text-demo-email">admin@mail.com</span></p>
              <p className="font-medium"><span className="text-gray-600">Password:</span> <span className="font-mono" data-testid="text-demo-password">admin123</span></p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

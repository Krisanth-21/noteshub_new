import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Pickaxe, Sword, Shield, Diamond, Star, Sparkles } from 'lucide-react';

const Login: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setShowParticles(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      setShowParticles(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-green-800 to-green-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>

      {showParticles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <Sparkles className="text-yellow-400 w-4 h-4" />
            </div>
          ))}
        </div>
      )}

      <div className="absolute top-8 left-8 flex items-center gap-3">
        <div className="bg-yellow-600 p-3 shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
          <Diamond className="w-8 h-8 text-cyan-300" />
        </div>
        <h1 className="text-4xl font-bold text-white tracking-wider" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}>
          NOTECRAFT
        </h1>
      </div>

      <div className="absolute top-8 right-8 flex gap-4">
        <div className="bg-gray-700 p-2 shadow-[3px_3px_0px_rgba(0,0,0,0.3)] animate-bounce" style={{ animationDuration: '3s' }}>
          <Pickaxe className="w-6 h-6 text-gray-300" />
        </div>
        <div className="bg-red-700 p-2 shadow-[3px_3px_0px_rgba(0,0,0,0.3)] animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
          <Sword className="w-6 h-6 text-red-200" />
        </div>
        <div className="bg-blue-700 p-2 shadow-[3px_3px_0px_rgba(0,0,0,0.3)] animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>
          <Shield className="w-6 h-6 text-blue-200" />
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-b from-stone-600 to-stone-700 p-1 shadow-[8px_8px_0px_rgba(0,0,0,0.5)]">
            <div className="bg-gradient-to-b from-stone-500 to-stone-600 p-8">
              <div className="text-center mb-8">
                <div className="inline-block bg-yellow-600 p-4 mb-4 shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
                  <Star className="w-16 h-16 text-yellow-200" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}>
                  ENTER THE REALM
                </h2>
                <p className="text-gray-200 text-sm" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}>
                  Sign in to access your notes vault
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-stone-700 p-4 border-2 border-stone-800 shadow-[inset_2px_2px_0px_rgba(0,0,0,0.3)]">
                  <h3 className="text-white font-bold mb-3 text-sm" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}>
                    FEATURES UNLOCKED:
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2 text-green-300">
                      <div className="w-2 h-2 bg-green-400 shadow-[2px_2px_0px_rgba(0,0,0,0.3)]"></div>
                      Upload & organize notes
                    </li>
                    <li className="flex items-center gap-2 text-yellow-300">
                      <div className="w-2 h-2 bg-yellow-400 shadow-[2px_2px_0px_rgba(0,0,0,0.3)]"></div>
                      Access from anywhere
                    </li>
                    <li className="flex items-center gap-2 text-blue-300">
                      <div className="w-2 h-2 bg-blue-400 shadow-[2px_2px_0px_rgba(0,0,0,0.3)]"></div>
                      Share with friends
                    </li>
                    <li className="flex items-center gap-2 text-purple-300">
                      <div className="w-2 h-2 bg-purple-400 shadow-[2px_2px_0px_rgba(0,0,0,0.3)]"></div>
                      Track downloads
                    </li>
                  </ul>
                </div>

                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full bg-white hover:bg-gray-100 text-gray-800 font-bold py-4 px-6 shadow-[6px_6px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.3)] transform hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed border-4 border-gray-800 relative overflow-hidden group"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-6 h-6 border-4 border-gray-800 border-t-transparent animate-spin"></div>
                      <span>LOADING...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <span className="text-lg">SIGN IN WITH GOOGLE</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>

                <div className="bg-amber-900 border-2 border-amber-700 p-3 shadow-[inset_2px_2px_0px_rgba(0,0,0,0.2)]">
                  <p className="text-amber-100 text-xs text-center" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}>
                    By signing in, you agree to mine responsibly and share knowledge with fellow crafters
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-red-600 p-3 shadow-[4px_4px_0px_rgba(0,0,0,0.3)] text-center transform hover:scale-105 transition-transform">
              <div className="text-white font-bold text-lg">500+</div>
              <div className="text-red-200 text-xs">NOTES</div>
            </div>
            <div className="bg-blue-600 p-3 shadow-[4px_4px_0px_rgba(0,0,0,0.3)] text-center transform hover:scale-105 transition-transform">
              <div className="text-white font-bold text-lg">1K+</div>
              <div className="text-blue-200 text-xs">USERS</div>
            </div>
            <div className="bg-green-600 p-3 shadow-[4px_4px_0px_rgba(0,0,0,0.3)] text-center transform hover:scale-105 transition-transform">
              <div className="text-white font-bold text-lg">24/7</div>
              <div className="text-green-200 text-xs">ONLINE</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent"></div>
    </div>
  );
};

export default Login;

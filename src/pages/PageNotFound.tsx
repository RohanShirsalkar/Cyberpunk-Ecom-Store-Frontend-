import { useState, useEffect } from "react";
import { Home, AlertTriangle, ArrowLeft } from "lucide-react";

const PageNotFound = () => {
  const [glitchText, setGlitchText] = useState("ERROR_404");
  const glitchVariations = [
    "ERROR_404",
    "ERR0R_404",
    "ERR0R_4Ø4",
    "ΣRR0R_404",
    "ERROR_404",
    "ΣRRØR_4Ø4",
  ];

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * glitchVariations.length);
      setGlitchText(glitchVariations[randomIndex]);
    }, 150);

    return () => {
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
      <div className="min-h-screen text-white relative overflow-hidden">
        {/* Main Content */}
        <main className="relative z-10 flex items-center justify-center min-h-screen px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Error Display */}
            <div className="mb-12">
              <div className="relative mb-8">
                <h1 className="text-4xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 font-mono tracking-wider filter drop-shadow-lg">
                  {glitchText}
                </h1>

                {/* Glitch overlay effect */}
                <div className="absolute inset-0 text-8xl lg:text-9xl font-bold text-cyan-400 font-mono tracking-wider opacity-20 transform translate-x-1 translate-y-1">
                  {glitchText}
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3 mb-6">
                <AlertTriangle className="w-8 h-8 text-yellow-400 animate-pulse" />
                <h2 className="text-xl md:3xl font-bold text-white">
                  DATA_NOT_FOUND
                </h2>
                <AlertTriangle className="w-8 h-8 text-yellow-400 animate-pulse" />
              </div>

              <p className="text-xl text-gray-300 mb-4">
                The requested resource has been moved, deleted, or never existed
                in our database.
              </p>

              <div className="text-cyan-400 font-mono text-sm">
                &gt; SYSTEM_STATUS: OPERATIONAL | ERROR_CODE: 404 | TIMESTAMP:{" "}
                {new Date().toISOString()}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-16">
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
                  <Home className="w-5 h-5" />
                  <span>RETURN_HOME</span>
                </button>

                <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
                  <ArrowLeft className="w-5 h-5" />
                  <span>GO_BACK</span>
                </button>
              </div>
            </div>

            {/* Footer Message */}
            <div className="mt-12 text-center">
              <p className="text-gray-500 text-sm font-mono">
                &gt; If this error persists, please contact our technical
                support team for assistance.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PageNotFound;

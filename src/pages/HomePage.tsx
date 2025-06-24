import FeaturedProducts from "../components/homepage/FeaturedProducts";
import { Zap, Shield, Cpu } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <FeaturedProducts />
      <section className="py-16 px-4 bg-black bg-opacity-40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-cyan-400 rounded bg-black bg-opacity-30">
              <Zap className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2 font-mono">
                INSTANT_TRANSFER
              </h4>
              <p className="text-cyan-300 font-mono text-sm">
                Neural-speed delivery to your cybernetic implants
              </p>
            </div>
            <div className="text-center p-6 border border-pink-400 rounded bg-black bg-opacity-30">
              <Shield className="h-12 w-12 text-pink-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2 font-mono">
                SECURE_PROTOCOL
              </h4>
              <p className="text-cyan-300 font-mono text-sm">
                Military-grade encryption for all transactions
              </p>
            </div>
            <div className="text-center p-6 border border-purple-400 rounded bg-black bg-opacity-30">
              <Cpu className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2 font-mono">
                AI_SUPPORT
              </h4>
              <p className="text-cyan-300 font-mono text-sm">
                24/7 artificial intelligence customer assistance
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

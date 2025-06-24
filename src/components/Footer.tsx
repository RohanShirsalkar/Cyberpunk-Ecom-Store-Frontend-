import { Cpu } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black bg-opacity-80 border-t border-cyan-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Cpu className="h-6 w-6 text-cyan-400" />
              <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 font-mono">
                CYBER_MART
              </h4>
            </div>
            <p className="text-cyan-200 font-mono text-sm leading-relaxed">
              &gt; Bridging the gap between human and machine since 2077.
              <br />
              &gt; Your trusted source for cybernetic enhancement technology.
            </p>
          </div>
          <div>
            <h5 className="text-lg font-bold text-white mb-4 font-mono">
              QUICK_ACCESS
            </h5>
            <ul className="space-y-2 font-mono text-sm">
              <li>
                <a
                  href="#"
                  className="text-cyan-300 hover:text-pink-400 transition-colors duration-300"
                >
                  &gt; About_Protocol
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-cyan-300 hover:text-pink-400 transition-colors duration-300"
                >
                  &gt; Contact_Node
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-cyan-300 hover:text-pink-400 transition-colors duration-300"
                >
                  &gt; Data_Transfer
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-cyan-300 hover:text-pink-400 transition-colors duration-300"
                >
                  &gt; Return_Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-bold text-white mb-4 font-mono">
              CONNECT_NEURAL
            </h5>
            <p className="text-cyan-200 mb-4 font-mono text-sm">
              &gt; Interface with our neural network for exclusive updates and
              premium access codes.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded border border-cyan-400"></div>
              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded border border-pink-400"></div>
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded border border-green-400"></div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-cyan-400 text-center">
          <p className="text-cyan-300 font-mono text-sm">
            © 2077 CYBER_MART.exe | All neural rights reserved | Built with
            quantum processors
          </p>
          <p className="text-green-400 font-mono text-xs mt-2">
            [SYSTEM_STATUS: OPERATIONAL] [UPTIME: 99.97%]
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

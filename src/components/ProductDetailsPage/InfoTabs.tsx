import { useState } from "react";
import { Shield, Cpu, Star, Download } from "lucide-react";

const InfoTabs = ({ product }: { product: any }) => {
  const [activeTab, setActiveTab] = useState("specs");
  return (
    <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg border border-cyan-400 p-6">
      {/* Tab Navigation */}
      <div className="flex space-x-8 mb-8 border-b border-gray-700">
        {[
          { id: "specs", label: "TECH_SPECS", icon: Cpu },
          { id: "reviews", label: "USER_REVIEWS", icon: Star },
          { id: "compatibility", label: "COMPATIBILITY", icon: Shield },
          { id: "download", label: "DOWNLOADS", icon: Download },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center space-x-2 py-3 font-mono font-bold transition-all ${
              activeTab === id
                ? "text-pink-400 border-b-2 border-pink-400"
                : "text-cyan-300 hover:text-pink-400"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-64">
        {activeTab === "specs" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(product.specs).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between items-center py-2 border-b border-gray-700"
              >
                <span className="text-cyan-300 font-mono">{key}:</span>
                {/* <span className="text-white font-mono text-right">{value}</span> */}
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            {[1, 2, 3].map((review) => (
              <div key={review} className="border-b border-gray-700 pb-4">
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-cyan-400 font-mono">
                    CyberUser_{String(review).padStart(3, "0")}
                  </span>
                  <span className="text-gray-500 font-mono text-sm">
                    2024.03.{15 + review}
                  </span>
                </div>
                <p className="text-cyan-200 font-mono text-sm">
                  "Exceptional neural connectivity and seamless integration with
                  my existing implants. The quantum encryption is top-tier."
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "compatibility" && (
          <div className="space-y-4">
            <h4 className="text-white font-mono font-bold">
              COMPATIBLE_SYSTEMS:
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Neural-Link v4+",
                "CyberBrain OS",
                "Quantum Implants",
                "Bio-Mesh Networks",
                "Synaptic Arrays",
                "Neural Boosters",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center space-x-2 text-green-400 font-mono text-sm"
                >
                  <Shield className="h-4 w-4" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "download" && (
          <div className="space-y-4">
            <h4 className="text-white font-mono font-bold">
              AVAILABLE_DOWNLOADS:
            </h4>
            <div className="space-y-3">
              {[
                "Neural Driver Package",
                "Calibration Software",
                "Security Protocols",
                "User Manual v3.7",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between p-3 bg-black bg-opacity-40 rounded border border-gray-700"
                >
                  <div className="flex items-center space-x-3">
                    <Download className="h-5 w-5 text-cyan-400" />
                    <span className="text-cyan-300 font-mono">{item}</span>
                  </div>
                  <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded font-mono text-sm hover:from-cyan-600 hover:to-blue-700 transition-all">
                    DOWNLOAD
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoTabs;

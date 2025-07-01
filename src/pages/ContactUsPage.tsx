import { useState } from "react";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen text-cyan-300 font-mono">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-cyan-400 mb-2">
              CONTACT_US
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="border border-cyan-500 p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6 tracking-wide">
                // SEND_MESSAGE
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-cyan-300 text-sm mb-2">
                    &gt; NAME:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black border border-cyan-500 px-4 py-3 text-cyan-300 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300"
                    placeholder="Enter your name..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-cyan-300 text-sm mb-2">
                    &gt; EMAIL:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-black border border-cyan-500 px-4 py-3 text-cyan-300 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300"
                    placeholder="your.email@domain.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-cyan-300 text-sm mb-2">
                    &gt; MESSAGE:
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full bg-black border border-cyan-500 px-4 py-3 text-cyan-300 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300 resize-none"
                    placeholder="Type your message here..."
                    required
                  ></textarea>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-bold py-3 px-6 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 tracking-wider"
                >
                  &gt; TRANSMIT_MESSAGE
                </button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="border border-cyan-500 p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-cyan-400 mb-6 tracking-wide">
                  // DIRECT_CONNECT
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-cyan-400 text-xl mt-1">@</div>
                    <div>
                      <div className="text-cyan-300 text-sm">&gt; EMAIL:</div>
                      <div className="text-white">contact@cyberstore.net</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-cyan-400 text-xl mt-1">#</div>
                    <div>
                      <div className="text-cyan-300 text-sm">&gt; PHONE:</div>
                      <div className="text-white">+1 (555) 123-CYBER</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-cyan-400 text-xl mt-1">◊</div>
                    <div>
                      <div className="text-cyan-300 text-sm">&gt; ADDRESS:</div>
                      <div className="text-white">
                        Neo-Tokyo District 7<br />
                        Cyberpunk Plaza, Floor 42
                        <br />
                        Digital City, DC 20XX
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status indicator */}
              <div className="bg-gray-900 bg-opacity-80 border border-green-500 p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="text-green-400 text-sm">
                    &gt; SYSTEM_STATUS: ONLINE
                  </div>
                </div>
                <div className="text-green-300 text-xs mt-2">
                  Response time: &lt; 24 hours
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;

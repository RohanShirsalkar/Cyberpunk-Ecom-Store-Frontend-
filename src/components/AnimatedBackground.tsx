const AnimatedBackground = () => {
  return (
    <>
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(cyan 1px, transparent 1px),
            linear-gradient(90deg, cyan 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
            animation: "pulse 4s ease-in-out infinite alternate",
          }}
        ></div>
      </div>

      {/* Glowing orbs background */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full opacity-5 blur-3xl"></div>
    </>
  );
};

export default AnimatedBackground;

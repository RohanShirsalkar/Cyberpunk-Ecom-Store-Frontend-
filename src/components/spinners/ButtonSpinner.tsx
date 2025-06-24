const ButtonSpinner = () => {
  return (
    <div className="inset-0 flex items-center justify-center">
      <div className="relative">
        <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <div
          className="absolute top-1 left-1 w-4 h-4 border-2 border-pink-400 border-b-transparent rounded-full animate-spin"
          style={{
            animationDuration: "0.8s",
            animationDirection: "reverse",
          }}
        />
      </div>
    </div>
  );
};

export default ButtonSpinner;

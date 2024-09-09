import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="relative">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;

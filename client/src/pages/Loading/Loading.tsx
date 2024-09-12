//
// Loading.tsx 
// This file contains the Loading component.
// It displays a loading spinner and a message.
// It is used to indicate that the page is still loading.
//

import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-2 flex flex-col items-center justify-center">
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
        <p className="mt-4 text-gray-500">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;

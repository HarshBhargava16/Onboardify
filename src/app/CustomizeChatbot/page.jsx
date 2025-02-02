"use client";
import { useState } from "react";

const CustomizeChatbot = () => {
  const [integrationStatus, setIntegrationStatus] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleTestIntegration = () => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      setIntegrationStatus(success ? "success" : "failure");
      if (success) setShowConfetti(true);
    }, 1000);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center pt-10 px-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
          Chatbot Integration & Testing
        </h2>

        <button className="w-full bg-green-600 text-white py-2 rounded-md mb-4">
          Test Chatbot
        </button>

        <div className="p-4 border rounded-md bg-gray-50 text-gray-900 mb-4">
          <h3 className="font-semibold mb-2">Embed Code</h3>
          <code className="bg-gray-200 p-2 block rounded-md text-sm">
            &lt;script
            src="https://chatbot.example.com/widget.js"&gt;&lt;/script&gt;
          </code>
          <button className="text-blue-700 mt-2">
            Email Instructions to Developer
          </button>
        </div>

        <button
          onClick={handleTestIntegration}
          className="w-full bg-blue-700 text-white py-2 rounded-md"
        >
          Test Integration
        </button>

        {integrationStatus === "success" && (
          <div className="text-center mt-6">
            {showConfetti && <div className="text-3xl">🎉</div>}
            <p className="text-green-600 font-bold">Integration Successful!</p>
            <button className="mt-4 p-2 bg-purple-700 text-white rounded-md">
              Explore Admin Panel
            </button>
            <button className="mt-2 p-2 bg-indigo-600 text-white rounded-md">
              Start Chatting
            </button>
          </div>
        )}

        
        {integrationStatus === "failure" && (
          <p className="text-red-600 mt-4">Integration Failed. Try Again.</p>
        )}
      </div>
    </div>
  );
};

export default CustomizeChatbot;

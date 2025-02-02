"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const dummyWebpages = [
  { url: "https://example.com/page1", status: "scraped" },
  { url: "https://example.com/page2", status: "pending" },
  { url: "https://example.com/page3", status: "scraped" },
];

const ChatbotIntegration = () => {
  const router = useRouter();

  const [chatbotProvider, setChatbotProvider] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [greetingMessage, setGreetingMessage] = useState("");
  const [selectedWebpages, setSelectedWebpages] = useState([]);

  
  const toggleWebpageSelection = (url) => {
    setSelectedWebpages((prev) =>
      prev.includes(url) ? prev.filter((item) => item !== url) : [...prev, url]
    );
  };

  
  const handleNext = (e) => {
    e.preventDefault();
    if (!chatbotProvider || selectedWebpages.length === 0) {
      alert("Please select a chatbot provider and at least one webpage.");
      return;
    }
    console.log({ chatbotProvider, apiKey, greetingMessage, selectedWebpages });
    router.push("/CustomizeChatbot"); 
  };

  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-start pt-12 px-4">
      <div className="bg-white m-5 rounded-lg shadow-lg w-full md:w-2/3 p-6">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
          Chatbot Integration
        </h2>

        <div className="mb-4">
          <label className="block text-md font-medium text-gray-900 mb-2">
            Choose a Chatbot Provider
          </label>
          <select
            value={chatbotProvider}
            onChange={(e) => setChatbotProvider(e.target.value)}
            className="p-2 w-full border border-gray-300 rounded-md text-gray-900"
          >
            <option value="">Select Provider</option>
            <option value="OpenAI GPT">OpenAI GPT</option>
            <option value="Dialogflow">Dialogflow</option>
            <option value="Rasa">Rasa</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-md font-medium text-gray-900 mb-2">
            API Key (if required)
          </label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter API key (optional)"
            className="p-2 w-full border border-gray-300 rounded-md text-gray-900"
          />
        </div>

        <div className="mb-4">
          <label className="block text-md font-medium text-gray-900 mb-2">
            Greeting Message
          </label>
          <textarea
            value={greetingMessage}
            onChange={(e) => setGreetingMessage(e.target.value)}
            placeholder="Enter chatbot's initial greeting message"
            className="p-2 w-full border border-gray-300 rounded-md text-gray-900"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Select Webpages for Chatbot Training
          </h3>
          <div className="space-y-2">
            {dummyWebpages.map((page, index) => (
              <div
                key={index}
                className={`p-2 border rounded-md cursor-pointer ${
                  selectedWebpages.includes(page.url)
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300"
                }`}
                onClick={() => toggleWebpageSelection(page.url)}
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-900">{page.url}</span>
                  <span
                    className={`text-sm ${
                      page.status === "scraped"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {page.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => router.push("/setup-organization")}
            className="p-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="p-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
          >
            Next: Customize Chatbot
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotIntegration;

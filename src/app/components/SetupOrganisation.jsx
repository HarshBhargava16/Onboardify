"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SetupOrganisation = () => {
  const [orgValues, setOrgValues] = useState({
    companyName: "",
    websiteURL: "",
    companyDescription: "",
  });

  const [webpages, setWebpages] = useState([]); // Store fetched webpages
  const [loading, setLoading] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const router = useRouter();

  const fetchWebpages = async (url) => {
    if (!url) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const dummyData = {
        success: true,
        pages: [
          {
            url: `${url}/about`,
            status: "scraped",
            chunks: [
              "Welcome to our about page.",
              "We are a leading company in AI solutions.",
            ],
          },
          {
            url: `${url}/services`,
            status: "scraped",
            chunks: [
              "Our services include web development, AI, and consulting.",
              "We help businesses scale with technology.",
            ],
          },
          {
            url: `${url}/contact`,
            status: "pending",
            chunks: [],
          },
        ],
      };

      setWebpages(dummyData.pages);
    } catch (error) {
      console.error("Error fetching webpages:", error);
      alert("Error fetching pages.");
    }
    setLoading(false);
  };


  const handleURLChange = (e) => {
    const newURL = e.target.value;
    setOrgValues({ ...orgValues, websiteURL: newURL });

    if (newURL.length > 5) {
      fetchWebpages(newURL); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(orgValues);
  };

  const handlePageClick = (page) => {
    setSelectedPage(page);
  };

  const handleClosePageDetails = () => {
    setSelectedPage(null);
  };

  const handleChatBoat = (e) => {
    e.preventDefault();
    router.push("/chatboat");
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center justify-start pt-10 px-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
          Setup Your Organization
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="companyName"
              className="block text-md font-medium text-gray-900 mb-2"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={orgValues.companyName}
              onChange={(e) =>
                setOrgValues({ ...orgValues, companyName: e.target.value })
              }
              placeholder="Enter your company name"
              className="p-2 w-full border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="websiteURL"
              className="block text-md font-medium text-gray-900 mb-2"
            >
              Company Website URL
            </label>
            <input
              type="url"
              id="websiteURL"
              name="websiteURL"
              value={orgValues.websiteURL}
              onChange={handleURLChange}
              placeholder="Enter your company website"
              className="p-2 w-full border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="companyDescription"
              className="block text-md font-medium text-gray-900 mb-2"
            >
              Company Description
            </label>
            <textarea
              id="companyDescription"
              name="companyDescription"
              value={orgValues.companyDescription}
              onChange={(e) =>
                setOrgValues({
                  ...orgValues,
                  companyDescription: e.target.value,
                })
              }
              placeholder="Enter a short description of your company"
              className="p-2 w-full border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition duration-300"
          >
            Save Organization
          </button>
        </form>

        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {loading ? "Fetching webpages..." : "Detected Webpages"}
          </h3>
          <div className="space-y-2">
            {webpages.length > 0 ? (
              webpages.map((page, index) => (
                <div
                  key={index}
                  className="p-3 border border-gray-300 rounded-md flex justify-between items-center cursor-pointer hover:bg-gray-100 transition duration-200"
                  onClick={() => handlePageClick(page)}
                >
                  <span className="text-gray-900">{page.url}</span>
                  <span
                    className={`text-sm font-medium ${
                      page.status === "scraped"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {page.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No webpages detected.</p>
            )}
          </div>
        </div>

        <button
          onClick={handleChatBoat}
          className="w-full bg-purple-700 text-white mt-6 py-2 rounded-md hover:bg-purple-800 transition duration-300"
        >
          Next: Go to Chatbot Integration
        </button>
      </div>

      {selectedPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-bold text-gray-900">
                Scraped Data for {selectedPage.url}
              </h4>
              <button
                onClick={handleClosePageDetails}
                className="text-gray-700 text-xl font-bold hover:text-red-600"
              >
                ×
              </button>
            </div>
            <div className="mt-4 max-h-60 overflow-auto">
              {selectedPage.chunks.length > 0 ? (
                selectedPage.chunks.map((chunk, idx) => (
                  <div
                    key={idx}
                    className="mb-2 text-gray-700 border p-2 rounded-md bg-gray-100"
                  >
                    {chunk}
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No chunks scraped yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetupOrganisation;

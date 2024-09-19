"use client";

import { useState, useEffect } from "react";
import { FaSearch, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

// Load networks from API that reads JSON file
async function loadNetworks() {
  const response = await fetch("/api/networks");
  const data = await response.json();
  return data;
}

export default function Home() {
  const [networks, setNetworks] = useState({});
  const [filteredNetworks, setFilteredNetworks] = useState({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadNetworks()
      .then((data) => {
        setNetworks(data);
        setFilteredNetworks(data);
        setLoading(false);
      })
      .catch((error) => {
        setStatus({
          type: "error",
          message: "Failed to load networks: " + error.message,
        });
        setLoading(false);
      });
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredNetworks(networks);
    } else {
      const filtered = Object.keys(networks).reduce((acc, key) => {
        if (networks[key].chainName.toLowerCase().includes(query)) {
          acc[key] = networks[key];
        }
        return acc;
      }, {});
      setFilteredNetworks(filtered);
    }
  };

  const addNetworkToMetaMask = async (network) => {
    try {
      if (!window.ethereum) {
        setStatus({
          type: "error",
          message: "MetaMask is not installed.",
        });
        return;
      }

      const selectedNetwork = filteredNetworks[network];

      if (!selectedNetwork) {
        setStatus({
          type: "error",
          message: "Network not found.",
        });
        return;
      }

      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [selectedNetwork],
      });

      setStatus({
        type: "success",
        message: `Network ${selectedNetwork.chainName} has been added successfully!`,
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to add network: " + error.message,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Status Notification */}
        {status.message && (
          <div
            className={`mb-6 p-4 rounded-lg text-center ${
              status.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            <span>{status.message}</span>
          </div>
        )}

        {/* Search Input */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-2xl">
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search for a network..."
              className="w-full pl-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          </div>
        </div>

        {/* Loading Spinner or Network List */}
        {loading ? (
          <div className="flex justify-center">
            <div className="spinner-border animate-spin w-10 h-10 border-t-4 border-blue-500 rounded-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(filteredNetworks).map((key) => {
              const network = filteredNetworks[key];
              return (
                <div
                  key={key}
                  className="p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <h2 className="text-2xl font-semibold mb-2">{network.chainName}</h2>
                  <p className="text-gray-700">
                    <span className="font-bold">Chain ID:</span> {network.chainId}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold">Native Currency:</span> {network.nativeCurrency.name} (
                    {network.nativeCurrency.symbol})
                  </p>
                  <button
                    onClick={() => addNetworkToMetaMask(key)}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition-colors duration-200"
                  >
                    Add to MetaMask
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>


      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <FaGithub size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <FaLinkedin size={24} />
            </a>
          </div>
          <p className="text-gray-500">
            &copy; 2024 furidngrt. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

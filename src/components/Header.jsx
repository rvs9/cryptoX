import React, { useState, useRef, useEffect } from "react";
import { useWeb3 } from "../contexts/Web3Context";
import {
  Wallet,
  ChevronDown,
  LogOut,
  ExternalLink,
  DollarSign,
} from "lucide-react";

const Header = ({ darkMode, setDarkMode }) => {
  const { account, balance, connectWallet, disconnectWallet } = useWeb3();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`${
        darkMode ? "bg-gray-800" : "bg-gray-800"
      } text-white p-4 fixed top-0 left-0 right-0 z-10`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">CryptoX</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-opacity-20 hover:bg-white"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>
          {account ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-full"
              >
                <Wallet size={18} />
                <span className="text-sm truncate w-32">{account}</span>
                <ChevronDown size={18} />
              </button>
              {dropdownOpen && (
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
                    darkMode ? "bg-gray-700" : "bg-white"
                  } ring-1 ring-black ring-opacity-5`}
                >
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      } px-4 py-2 text-sm flex items-center`}
                    >
                      <DollarSign size={14} className="mr-2" />
                      <span className="font-medium">Balance:</span>
                      <span className="ml-2">
                        {parseFloat(balance).toFixed(4)} ETH
                      </span>
                    </div>
                    <a
                      href={`https://sepolia.etherscan.io/address/${account}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${
                        darkMode
                          ? "text-gray-300 hover:bg-gray-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }  px-4 py-2 text-sm flex items-center`}
                      role="menuitem"
                    >
                      <ExternalLink size={14} className="mr-2" />
                      View on Etherscan
                    </a>
                    <button
                      onClick={() => {
                        disconnectWallet(); // Call the disconnectWallet function
                        setDropdownOpen(false); // Close the dropdown after disconnecting
                      }}
                      className={`${
                        darkMode
                          ? "text-gray-300 hover:bg-gray-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }  w-full text-left px-4 py-2 text-sm flex items-center`}
                      role="menuitem"
                    >
                      <LogOut size={14} className="mr-2" />
                      Disconnect
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className={`${
                darkMode ? "bg-blue-600 text-white" : "bg-white text-blue-600"
              } px-4 py-2 rounded-full flex items-center`}
            >
              <Wallet className="mr-2" size={18} />
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

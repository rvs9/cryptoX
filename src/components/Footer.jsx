import React from "react";
import { Github, Twitter, Globe } from "lucide-react";

const Footer = ({ darkMode }) => {
  return (
    <footer
      className={`${
        darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"
      } py-8`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">CryptoX</h3>
            <p className="text-sm mt-2">
              Secure and easy cryptocurrency transactions
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://x.com/rajatsaraswat7"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <Twitter size={24} />
            </a>
            <a
              href="https://rajatsaraswat.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <Globe size={24} />
            </a>
            <a
              href="https://github.com/rvs9/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <Github size={24} />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} CryptoX. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="hover:text-blue-500">
              Privacy Policy
            </a>
            {" | "}
            <a href="#" className="hover:text-blue-500">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

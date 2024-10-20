import React, { useState } from "react";
import { useWeb3 } from "../contexts/Web3Context";
import { Clock, ArrowRight, ExternalLink, Search } from "lucide-react";

const TransactionHistory = ({ darkMode }) => {
  const { transactions } = useWeb3();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.addressFrom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.addressTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      className={`${
        darkMode ? "bg-gray-800 text-white" : "bg-white"
      } p-6 rounded-lg shadow-md`}
    >
      <h2
        className={`text-2xl font-semibold mb-4 ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        Transaction History
      </h2>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-md ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <Search
            className={`absolute left-3 top-2.5 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
            size={20}
          />
        </div>
      </div>
      {currentTransactions.length === 0 ? (
        <p className={`text-gray-500 ${darkMode ? "text-gray-400" : ""}`}>
          No transactions found.
        </p>
      ) : (
        <ul className="space-y-4">
          {currentTransactions.map((tx, index) => (
            <li
              key={index}
              className={`border-b ${
                darkMode ? "border-gray-700" : "border-gray-200"
              } pb-4 last:border-b-0`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock
                    size={18}
                    className={darkMode ? "text-gray-400" : "text-gray-500"}
                  />
                  <span
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {tx.timestamp}
                  </span>
                </div>
                <span className="text-sm font-medium text-blue-600">
                  {tx.amount} ETH
                </span>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-sm truncate max-w-[150px]">
                  {tx.addressFrom}
                </span>
                <ArrowRight
                  size={16}
                  className={darkMode ? "text-gray-400" : "text-gray-500"}
                />
                <span className="text-sm truncate max-w-[150px]">
                  {tx.addressTo}
                </span>
              </div>
              <div className="mt-2">
                <span
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Keyword:{" "}
                </span>
                <span
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {tx.keyword}
                </span>
              </div>
              <div className="mt-1">
                <span
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Message:{" "}
                </span>
                <span
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {tx.message}
                </span>
              </div>
              <div className="mt-2">
                <a
                  href={`https://sepolia.etherscan.io/tx/${tx.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 text-sm flex items-center"
                >
                  View on Etherscan
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
      {filteredTransactions.length > transactionsPerPage && (
        <div className="mt-4 flex justify-center">
          {Array.from(
            {
              length: Math.ceil(
                filteredTransactions.length / transactionsPerPage
              ),
            },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;

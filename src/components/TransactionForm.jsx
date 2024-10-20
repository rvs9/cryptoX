import React, { useState } from "react";
import { useWeb3 } from "../contexts/Web3Context";
import { Send } from "lucide-react";

const TransactionForm = ({ darkMode }) => {
  const { sendTransaction, balance } = useWeb3();
  const [formData, setFormData] = useState({
    to: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.to) newErrors.to = "Recipient address is required";
    if (!formData.amount) newErrors.amount = "Amount is required";
    if (parseFloat(formData.amount) <= 0)
      newErrors.amount = "Amount must be greater than 0";
    if (parseFloat(formData.amount) > parseFloat(balance))
      newErrors.amount = "Insufficient balance";
    if (!formData.keyword) newErrors.keyword = "Keyword is required";
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await sendTransaction(
          formData.to,
          formData.amount,
          formData.keyword,
          formData.message
        );
        setFormData({ to: "", amount: "", keyword: "", message: "" });
      } catch (error) {
        console.error("Transaction failed:", error);
      }
    }
  };

  const setMaxAmount = () => {
    setFormData({ ...formData, amount: balance });
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-800" : "bg-white"
      } p-6 rounded-lg shadow-md mb-8`}
    >
      <h2
        className={`text-2xl font-semibold mb-4 ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        Send Transaction
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="to"
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Recipient Address
          </label>
          <input
            type="text"
            id="to"
            name="to"
            value={formData.to}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md ${
              darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
            } border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
          />
          {errors.to && (
            <p className="mt-1 text-sm text-red-600">{errors.to}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="amount"
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Amount (ETH)
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.0001"
              min="0"
              className={`block w-full pr-16 rounded-md ${
                darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
              } border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                type="button"
                onClick={setMaxAmount}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Max
              </button>
            </div>
          </div>
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="keyword"
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Keyword
          </label>
          <input
            type="text"
            id="keyword"
            name="keyword"
            value={formData.keyword}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md ${
              darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
            } border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
          />
          {errors.keyword && (
            <p className="mt-1 text-sm text-red-600">{errors.keyword}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="message"
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            className={`mt-1 block w-full rounded-md ${
              darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
            } border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
        >
          <Send className="mr-2" size={18} />
          Send Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;

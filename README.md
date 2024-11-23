CryptoX
This decentralized application (dApp) allows users to send Ethereum transactions, view their transaction history, and manage their wallet connection. Built with modern web technologies, this app provides a seamless experience for interacting with the Ethereum blockchain.

You can check it out here https://crypto-x-six.vercel.app/

If you found this project helpful, please give it a ⭐️!

-Features:

🔐 Connect MetaMask wallet
💰 View Ethereum balance
💸 Send Ethereum transactions
📜 View transaction history
📱 Responsive design
🔄 Real-time updates

-Technologies Used

React with Vite: For building a fast and efficient user interface.
Tailwind CSS: For styling the application with a utility-first approach.
Ethers.js: To interact with the Ethereum blockchain.
Solidity: For writing smart contracts.
Hardhat: A development environment for Ethereum smart contracts.

-Prerequisites:
Before running the app, ensure you have the following:

Node.js and npm: Required to run the development server and manage packages.
MetaMask: A browser extension to manage your Ethereum wallet and connect to the app.


-Getting Started:

-Clone the Repository:

git clone https://github.com/rvs9/cryptoX.git
cd cryptoX

Install Dependencies:

npm install

-Set Up Environment Variables:

Create a .env file in the project root and add your environment variables:

Alchemy_API_Key = your_Alchemy_project_API_Key
PRIVATE_KEY = your_MetaMask_private_key

-Compile and Deploy Smart Contract:

Use Hardhat to compile and deploy the smart contract to the Sepolia testnet.

-Run the App:

npm run dev

-Connect MetaMask:

Open the app in your browser.
Click "Connect Wallet" and authorize the connection in MetaMask.

-Contributing:
Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

-This project uses the following main dependencies:

{
  "dependencies": {
    "@nomiclabs/hardhat-ethers": "^2.2.3",
    "@nomiclabs/hardhat-waffle": "^2.0.6",
    "ethers": "^5.7.2",
    "hardhat": "^2.19.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-toastify": "^9.1.3",
    "tailwindcss": "^3.3.5"
  }
}

For a complete list of dependencies, see package.json.

-Common Issues and Solutions:

MetaMask Connection
If you're having trouble connecting to MetaMask:

Make sure MetaMask is installed and unlocked
Connect to the correct network (Localhost 8545 for local development)
Import a test account using private keys provided by Hardhat

-Contract Deployment
If the contract deployment fails:

Ensure you have enough ETH in your account
Check that your .env file is properly configured
Verify the network configuration in hardhat.config.js

-Contributing:
Contributions are welcome! Please feel free to submit a Pull Request.

-Fork the project
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

-License:
This project is licensed under the MIT License - see the LICENSE file for details.

-Acknowledgments:

Hardhat Documentation
Ethers.js Documentation
React Documentation
Tailwind CSS Documentation

-Contact:
Your Name - @rajatsaraswat7
Project Link: https://github.com/rvs9/cryptoX

-Support:
If you found this project helpful, please give it a ⭐️!

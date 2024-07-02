let web3;
let contract;

const contractABI = [
  {
    "inputs": [{"internalType": "address","name": "initialOracleAddress","type": "address"}],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true,"internalType": "address","name": "owner","type": "address"},
      {"indexed": true,"internalType": "uint256","name": "chatId","type": "uint256"}
    ],
    "name": "ChatCreated",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "getTaskInfo",
    "outputs": [
      {"internalType": "string","name": "taskDescription","type": "string"},
      {"internalType": "uint256","name": "reward","type": "uint256"},
      {"internalType": "bool","name": "lock","type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "string","name": "description","type": "string"}],
    "name": "createTask",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "closeTask",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "reset",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "string[]","name": "urls","type": "string[]"}],
    "name": "attemptFullfillTask",
    "outputs": [{"internalType": "bool","name": "","type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

async function connectWeb3() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const contractAddress = '0x948485554B39AfA0a39aCC36663219583f397891';
            contract = new web3.eth.Contract(contractABI, contractAddress);
            console.log('Connected to Web3');
        } catch (error) {
            console.error("User denied account access", error);
        }
    } else {
        console.log('Please install MetaMask!');
    }
}

async function getTaskInfo() {
    try {
        const result = await contract.methods.getTaskInfo().call();
        return result;
    } catch (error) {
        console.error('Error getting task info:', error);
        throw error;
    }
}

async function createTask(description, reward) {
    try {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods.createTask(description).send({
            from: accounts[0],
            value: web3.utils.toWei(reward, 'ether')
        });
        console.log('Task created:', result);
        return result;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
}

async function closeTask() {
    try {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods.closeTask().send({from: accounts[0]});
        console.log('Task closed:', result);
        return result;
    } catch (error) {
        console.error('Error closing task:', error);
        throw error;
    }
}

async function resetTask() {
    try {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods.reset().send({from: accounts[0]});
        console.log('Reset completed:', result);
        return result;
    } catch (error) {
        console.error('Error resetting:', error);
        throw error;
    }
}

async function attemptFullfillTask(urls) {
    try {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods.attemptFullfillTask(urls).send({from: accounts[0]});
        console.log('Attempt to fulfill task:', result);
        return result;
    } catch (error) {
        console.error('Error attempting to fulfill task:', error);
        throw error;
    }
}

// Initialize Web3 connection when the page loads
window.addEventListener('load', async () => {
    await connectWeb3();
});

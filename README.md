# RPCProvider

## Overview

**RPCProvider** is a tool that enables users to seamlessly add Ethereum Virtual Machine (EVM) compatible blockchain networks to their MetaMask wallet. With RPCProvider, users can easily configure and connect various EVM-based networks through a user-friendly interface.

## Features

- **Add EVM Networks to MetaMask**: Quickly add supported EVM networks to your MetaMask wallet.
- **Search and Filter Networks**: Easily find networks using the search functionality.
- **Responsive Design**: Ensures a smooth experience across different devices with a responsive UI.
- **Status Notifications**: Provides feedback on successful operations or errors.

## Getting Started

### Prerequisites

- **MetaMask**: Ensure you have MetaMask installed in your browser. [Download MetaMask](https://metamask.io/download.html).

### Installation

1. **Clone the Repository**

   ```
   git clone https://github.com/yourusername/rpcprovider.git
   cd rpcprovider
   ```

### Adding a New RPC Network

1. Update Network Data

- Locate the Network Data File: This file is usually found at /public/data/networks.json or a similar path depending on your project structure.

- Add Network Details: Append the details of the new RPC network in JSON format. Here’s a sample format:
  
```
{
  "newNetworkKey": {
    "chainId": "0x1234",
    "chainName": "New Network",
    "rpcUrls": ["https://new-network-rpc-url"],
    "nativeCurrency": {
      "name": "NewCoin",
      "symbol": "NEW",
      "decimals": 18
    },
    "blockExplorerUrls": ["https://new-network-explorer"]
  }
}

```

Replace "newNetworkKey" with a unique key for the new network and fill in the appropriate details.

2. Add New Network to the Application

- Update the loadNetworks Function: Ensure the loadNetworks function in your component correctly fetches and processes the updated networks.json.

- Update UI as Needed: If there are new properties or changes in network details, make sure the UI components display them correctly.

3. Test the New Network

- Run the Application: Start or restart the application to ensure the new network appears and functions as expected.
- Add Network to MetaMask: Test adding the new network to MetaMask to verify that the configuration is correct.


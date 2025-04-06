// truffle-config.js
module.exports = {
    networks: {
      development: {
        host: "127.0.0.1", // Ganache local
        port: 7545,        // Default Ganache GUI port
        network_id: "*",   // Match any network
      },
    },
    compilers: {
      solc: {
        version: "0.8.20", // Set to your Solidity version
      },
    },
  };
  
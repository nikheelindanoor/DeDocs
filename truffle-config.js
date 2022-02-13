const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 7545,
      gas: 8721974
    }
  },
  compilers: {
    solc: {
        version: "0.5.15", // Fetch exact version from solc-bin (default: truffle's version)
        settings: { // See the solidity docs for advice about optimization and evmVersion
            optimizer: {
                enabled: true,
                runs: 300
            }
        }
    }
  }
};

// const path = require("path");
// var HDWalletProvider = require("truffle-hdwallet-provider");
// const MNEMONIC = 'dizzy find soup mammal month onion drop bless soap joke awesome burden';
// const tokenKey = 'ab9f92e073fe46d285f09353a66f1031';

// module.exports = {
//   // See <http://truffleframework.com/docs/advanced/configuration>
//   // to customize your Truffle configuration!
//   contracts_build_directory: path.join(__dirname, "client/src/contracts"),
//   networks: {
//     develop: {
//       port: 7545,
//     },
//     rinkeby: {
//       host: "localhost",
//       provider: function () {
//         return new HDWalletProvider(
//           MNEMONIC,
//           "https://rinkeby.infura.io/v3/" + tokenKey
//         );
//       },
//       network_id: 4,
//       gas: 6700000,
//       gasPrice: 10000000000,
//     },
//   },
// };
var HDWalletProvider = require('@truffle/hdwallet-provider')

var publicTestnetNode = 'https://public-node.testnet.rsk.co/'

const fs = require('fs');
const gasPriceTestnetRaw = fs.readFileSync(".gas-price-testnet.json").toString().trim();
const gasPriceTestnet = parseInt(JSON.parse(gasPriceTestnetRaw).result, 16);
if (typeof gasPriceTestnet !== 'number' || isNaN(gasPriceTestnet)) {
  throw new Error('unable to retrieve network gas price from .gas-price-testnet.json');
}
console.log("Gas price Testnet: " + gasPriceTestnet);

module.exports = {
  networks: {
    rskTestnet: {
      provider: () => new HDWalletProvider(mnemonic, publicTestnetNode),
      network_id: 31,
      gasPrice: Math.floor(gasPriceTestnet * 1.1),
      from: 0xA66748Aa582a81fACFA9De73469eF217Bf839f4E,
      networkCheckTimeout: 1e9
    }
  },
  compilers : {
     solc: {
      version: "0.6.7",
     }
  }
}

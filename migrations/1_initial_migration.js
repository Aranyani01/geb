const Migrations = artifacts.require("Migrations");
const SAFEEngine = artifacts.require("SAFEEngine");
const LiqEngine = artifacts.require("LiquidationsEngine");
const ActEngine = artifacts.require("AccountingEngine");
const BasicTokenAdapters = artifacts.require("BasicTokenAdapters");
const Coin = artifacts.require("Coin");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  const SEaddress = deployer.deploy(SAFEEngine);
  const BTadapters = deployer.deploy(BasicTokenAdapters, SEaddress, "RBTCJoin");
  const TokenAddress = deployer.deploy(Coin, "Bitcoin-Collateralised RAI", "B-RAI", 31);
};

const Migrations = artifacts.require("Migrations");
const SAFEEngine = artifacts.require("SAFEEngine");
const LiqEngine = artifacts.require("LiquidationEngine");
const ActEngine = artifacts.require("AccountingEngine");
const DbtAuction = artifacts.require("DebtAuctionHouse");
const SurpAuction = artifacts.require("SurplusAuctionHouse");


//const BasicTokenAdapters = artifacts.require("BasicTokenAdapters");
const Coin = artifacts.require("Coin");

module.exports = function (deployer) {
  deployer.deploy(Migrations);

  // const BTadapters = deployer.deploy(BasicTokenAdapters, SEaddress, "RBTCJoin");
  // const Token2 = deployer.deploy(Coin, "Bitcoin-Collateralised RAI", "B-RAI", 31);
  // const SE2 = deployer.deploy(SAFEEngine);
  // SafeEngine = 0x9a54faa12fc25E89A26AC2d1d7E1E6a2dBEdae68
  // console.log(SEaddress)
  const SEaddr = '0x9a54faa12fc25E89A26AC2d1d7E1E6a2dBEdae68';
  const Tokenaddr = '0xDfEADD4F99c36FabC50e54652A8394d96Dd0Ff22';
  // const LIQEngine = deployer.deploy(LiqEngine, SEaddr);
  // const DebtA = deployer.deploy(DbtAuction, SEaddr, Tokenaddr)
  // const SURPLUSa = deployer.deploy(SurpAuction, SEaddr, Tokenaddr)
  const debtAddr = '0xeD0Ea0f99A0603d23658de9823eb91ea1227d6C8';
  const surpAddr = '0xB9b438da5db99Ad6a338CFa06c5040F878027dc2';
  deployer.deploy(ActEngine, SEaddr, debtAddr, surpAddr);
};

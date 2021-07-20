# B-RAI Protocol [Bitcoin Collateralised RAI]:

What is B-RAI: B-RAI is a stablecoin on the RSK [testnet] that utilises the same decentralised mechanisms as the stablecoin "RAI", but it uses the much larger/more secure collateral of Bitcoin, accessed via the RSK chain/Sovyrn.

True stablecoins like B-RAI differ from pegged coins like USDC and DAI as they maintain their stability *independent* of the state of the asset they are pegged to. Thus if USD were to fail, USDC and DAI would collapse, but B-RAI would maintain its stability. This makes B-RAI the ideal stablecoin to conduct trading on a decentralised platform that is aiming to be independent of the fiatlords ;)

Notably, B-RAI is *not* pegged to any other asset, such as inflating fiat currencies like USD. This is critical for continued

We've begun by deploying 4 (+2) core contracts on the testnet, with the appropriate modifications and constructors, to prototype the functionality:


B-RAI Token Contract : https://explorer.testnet.rsk.co/address/0xdfeadd4f99c36fabc50e54652a8394d96dd0ff22
[Address = 0xdfeadd4f99c36fabc50e54652a8394d96dd0ff22]

SAFE Engine: https://explorer.testnet.rsk.co/address/0x9a54faa12fc25e89a26ac2d1d7e1e6a2dbedae68?__ctab=Code
[Address = 0x9a54faa12fc25e89a26ac2d1d7e1e6a2dbedae68]

Liquidation Engine: https://explorer.testnet.rsk.co/address/0x40e718099d0681478cf5cbd799918b18b6e2aa5d
[Address = 0x40E718099D0681478cf5CBD799918B18b6E2Aa5D]

AccountingEngine: 0x3CdD2E93763A6920d4b515DF0BCe886b6bdC7660
  Dependencies-
  DebtAuctionHouse: '0xeD0Ea0f99A0603d23658de9823eb91ea1227d6C8';

  SurplusAuctionHouse: '0xB9b438da5db99Ad6a338CFa06c5040F878027dc2';

We have made a few changes to the contracts as well as test scripts as needed for utilising native RBTC as collateral instead of the default ETH collateral.

The functionalities of these core contracts are briefly described below.

The SAFEEngine is in charge with two main system functions:
1. SAFE Management
Anyone can manage a SAFE via modifySAFECollateralization, which modifies the SAFE at address safe, using tokenCollateral from user collateralSource and modifying coinBalance for user debtDestination.  
confiscateSAFECollateralAndDebtis usually called by LiquidationEngine and transfers debt from the SAFE to another address' debtBalance.  
debtBalance represents bad debt and can be canceled out with an equal quantity of system coins using settleDebt(uint rad) where msg.sender is used as the address for the coinBalance and debtBalance.  
2. Stability Fee Accrual
The accumulatedRates helps convert normalized debt (generatedDebt) drawn against a collateralType to the present value of that debt (actual debt issued + interest). The rate is updated using updateAccumulatedRate (called by the TaxCollector). After every update, the newly accrued stability fees are added to the coinBalance of surplusDst.


The LiquidationEngine handles collateral liquidation functions system:

liquidateSAFE can be called at any time but will only succeed if the target SAFE is underwater. A SAFE is underwater when the result of its collateral (lockedCollateral) multiplied by the collateral's liquidation price (liquidationPrice) is smaller than its present value debt (generatedDebt times the collateral's accumulatedRates). 
1. liquidationPrice is the oracle-reported price scaled by the collateral's liquidation ratio. There is a clear distinction between liquidation and safety ratios (even though the two can be equal in value):
Safety ratios are the minimum collateralization ratios used when generating debt against a SAFE's collateral. They can be more conservative (higher) than liquidation ratios  
2. Liquidation ratios are the minimum collateralization ratios under which SAFEs are liquidated  
3. liquidateSAFE may terminate early if the owner of the SAFE that's being targeted protected their position with a saviour that manages to save it from liquidation.

Also see for tests: https://github.com/Aranyani01/B-RAI.js

Additional information in this presentation: https://drive.google.com/file/d/1FRLooRL5xcI3SEGrZp0PHixlSCq56BN-/view?usp=sharing

This code inherits from:

# GEB

This repository contains the core smart contract code for GEB. GEB is the abbreviation of [Gödel, Escher and Bach](https://en.wikipedia.org/wiki/G%C3%B6del,_Escher,_Bach) as well as the name of an [Egyptian god](https://en.wikipedia.org/wiki/Geb).

Check out the more in-depth [documentation](https://docs.reflexer.finance/).

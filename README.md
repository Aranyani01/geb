# B-RAI Protocol [Bitcoin Collateralised RAI]:

What is B-RAI: B-RAI is a stablecoin on the RSK [testnet] that utilises the same decentralised mechanisms as the stablecoin "RAI", but it uses the much larger/more secure collateral of Bitcoin, accessed via the RSK chain/Sovyrn.

True stablecoins like B-RAI differ from pegged coins like USDC and DAI as they maintain their stability *independent* of the state of the asset they are pegged to. Thus if USD were to fail, USDC and DAI would collapse, but B-RAI would maintain its stability. This makes B-RAI the ideal stablecoin to conduct trading on a decentralised platform that is aiming to be independent of the fiatlords ;)

Notably, B-RAI is *not* pegged to any other asset, such as inflating fiat currencies like USD. This is critical for continued

We've begun by publishing 4 core contracts on the testnet:

SAFEEngine.sol
LiquidationEngine.sol
BasicTokenAdapters.sol
Coin.sol

The SAFEEngine is in charge with two main system functions:
1. SAFE Management
Anyone can manage a SAFE via modifySAFECollateralization, which modifies the SAFE at address safe, using tokenCollateral from user collateralSource and modifying coinBalance for user debtDestination.  
confiscateSAFECollateralAndDebtis usually called by LiquidationEngine and transfers debt from the SAFE to another address' debtBalance.  
debtBalance represents bad debt and can be canceled out with an equal quantity of system coins using settleDebt(uint rad) where msg.sender is used as the address for the coinBalance and debtBalance.  
2. Stability Fee Accrual
The accumulatedRates helps convert normalized debt (generatedDebt) drawn against a collateralType to the present value of that debt (actual debt issued + interest). The rate is updated using updateAccumulatedRate (called by the TaxCollector). After every update, the newly accrued stability fees are added to the coinBalance of surplusDst.

liquidateSAFE can be called at any time but will only succeed if the target SAFE is underwater. A SAFE is underwater when the result of its collateral (lockedCollateral) multiplied by the collateral's liquidation price (liquidationPrice) is smaller than its present value debt (generatedDebt times the collateral's accumulatedRates). 
liquidationPrice is the oracle-reported price scaled by the collateral's liquidation ratio. There is a clear distinction between liquidation and safety ratios (even though the two can be equal in value):
Safety ratios are the minimum collateralization ratios used when generating debt against a SAFE's collateral. They can be more conservative (higher) than liquidation ratios  
Liquidation ratios are the minimum collateralization ratios under which SAFEs are liquidated  
liquidateSAFE may terminate early if the owner of the SAFE that's being targeted protected their position with a saviour that manages to save it from liquidation.


This code inherits from:

# GEB

This repository contains the core smart contract code for GEB. GEB is the abbreviation of [Gödel, Escher and Bach](https://en.wikipedia.org/wiki/G%C3%B6del,_Escher,_Bach) as well as the name of an [Egyptian god](https://en.wikipedia.org/wiki/Geb).

Check out the more in-depth [documentation](https://docs.reflexer.finance/).

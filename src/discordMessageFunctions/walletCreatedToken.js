export default function walletCreatedToken(data, wallet) {
    // Determine URL sign based on symbol length
    const urlSign = data.symbol.length > 6 ? "%24" : "%23";

    const {
        initialBuy,
        vSolInBondingCurve,
        vTokensInBondingCurve,
        name,
        symbol,
        mint,
        marketCapSol,
    } = data;

    const initialBuySol =
        (initialBuy / vTokensInBondingCurve) * vSolInBondingCurve;
    const tokenPriceSol = vSolInBondingCurve / vTokensInBondingCurve;

    return `
### [${wallet.name}](https://solscan.io/account/${
        wallet.address
    }) just created [$${symbol}](https://pump.fun/coin/${mint}${urlSign})!
---
${name}  
**Initial Buy**: ${initialBuySol.toFixed(8)} SOL  
**Token Price**: ${tokenPriceSol.toFixed(8)} SOL  
**Market Cap**: ${marketCapSol.toFixed(8)} SOL  
**Sol in Bonding Curve**: ${vSolInBondingCurve.toFixed(8)} SOL`;
}

export default function walletTransaction(data, wallet) {
    const {
        signature,
        mint,
        traderPublicKey,
        txType,
        tokenAmount,
        newTokenBalance,
        bondingCurveKey,
        vTokensInBondingCurve,
        vSolInBondingCurve,
        marketCapSol,
    } = data;

    const tokenPriceSol = vSolInBondingCurve / vTokensInBondingCurve;
    const transactionSolValue = tokenAmount * tokenPriceSol;

    const transactionType = txType == "buy" ? "Bought" : "Sold";

    return `
### ${wallet.name} just ${transactionType} ${tokenPriceSol.toFixed(4)} SOL!
---
**Trader**: [${traderPublicKey}](https://solscan.io/account/${traderPublicKey})  
**Mint Address**: [${mint}](https://solscan.io/account/${mint})  
**Bonding Curve**: [${bondingCurveKey}](https://solscan.io/account/${bondingCurveKey})  
---
**Token Amount**: ${tokenAmount.toLocaleString()} tokens  
**Transaction Value**: ${transactionSolValue.toFixed(4)} SOL  
**New Token Balance**: ${newTokenBalance.toFixed(8)} tokens  
---
**Market Cap**: ${marketCapSol.toFixed(4)} SOL  
**Tokens in Bonding Curve**: ${vTokensInBondingCurve.toLocaleString()} tokens  
**Sol in Bonding Curve**: ${vSolInBondingCurve.toFixed(4)} SOL  
---
[Transaction Details](https://solscan.io/tx/${signature})`;
}

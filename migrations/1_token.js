const BN = require('bn.js');

require('dotenv').config();

let {
    OWNER,
    TOTAL_SUPPLY
} = process.env;

const Token = artifacts.require("WdToken");

module.exports = async function (deployer, network) {
    if (network == "test" || network == "development")
        return;

    TOTAL_SUPPLY = new BN(TOTAL_SUPPLY).mul(new BN(10).pow(new BN(9)));

    await deployer.deploy(
        Token,
        OWNER,
        TOTAL_SUPPLY
    );
        
    const TokenInst = await Token.deployed();
    console.log("Token = ", TokenInst.address);
}
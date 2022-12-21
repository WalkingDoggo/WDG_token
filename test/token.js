const { BN, constants, expectEvent, expectRevert, time, snapshot, balance } = require('@openzeppelin/test-helpers');
const { assert, expect } = require("chai");

const Token = artifacts.require("WdToken");

const DECIMALS = new BN(10).pow(new BN(9));
const TOTAL_SUPPLY = new BN("100000000000").mul(DECIMALS);

contract("Token", async (accounts) => {
    let [owner, alice, bob] = accounts;
    let token;

    before("deploy token", async () => {
        token = await Token.new(owner, TOTAL_SUPPLY);
    });

    it("can burn", async () => {
        expect(await token.decimals()).bignumber.eq(new BN(9));
        let tx = await token.burn(10, { from: owner });
        expectEvent(tx, "Transfer", { value: new BN(10), from: owner, to: constants.ZERO_ADDRESS });
        tx = token.burn(10, { from: alice });
        await expectRevert(tx, "ERC20: burn amount exceeds balance");
        expect(await token.totalSupply()).bignumber.eq(TOTAL_SUPPLY.sub(new BN(10)));
    });

    it("can burnFrom", async() => {
        await token.approve(alice, 10, { from: owner });
        let tx = await token.burnFrom(owner, 10, { from: alice });
        expectEvent(tx, "Transfer", { value: new BN(10), from: owner, to: constants.ZERO_ADDRESS });
        expect(await token.totalSupply()).bignumber.eq(TOTAL_SUPPLY.sub(new BN(20)));
    });

});
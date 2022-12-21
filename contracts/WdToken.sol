// SPDX-License-Identifier: MIT

pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract WdToken is ERC20Burnable {
    constructor(address owner, uint256 _amount) ERC20("WalkingDoggo", "WDG") {
        _mint(owner, _amount);
    }

    function decimals() public view override returns (uint8) {
        return 9;
    }
}
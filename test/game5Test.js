const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // good luck

    do {
      try {
        const signer = ethers.Wallet.createRandom().connect(ethers.provider);

        await ethers.provider.send('hardhat_setBalance', [
          signer.address,
          '0x56BC75E2D63100000', // 100 ETH
        ]);

        console.log('Try: ', signer.address);

        await game.connect(signer).win();
      } catch (e) {
        // silent
        // console.error(e);
      }
    } while (!(await game.isWon()));

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});

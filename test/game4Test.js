const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    return { game };
  }
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    const [signer] = await ethers.getSigners();
    game.connect(signer).write(signer.address);

    await game.connect(signer).win(signer.address);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});

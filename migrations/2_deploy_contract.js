const TestStatistics = artifacts.require('./TestStatistics.sol')

module.exports = async function(deployer) {
  await deployer.deploy(TestStatistics)
}

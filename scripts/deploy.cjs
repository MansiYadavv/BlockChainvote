const hre = require("hardhat");

async function main() {
  const Election = await hre.ethers.getContractFactory("Election");

  // Deploy with constructor arguments
  const election = await Election.deploy(
    "General Election 2025",
    "National voting for president"
  );

  // Wait for deployment to complete
  await election.waitForDeployment(); // ✅ use this instead of `.deployed()` in Hardhat v2.18+

  console.log("Election deployed to:", await election.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

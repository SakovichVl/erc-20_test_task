async function main() {
  const [deployer] = await ethers.getSigners();
  const Token = await ethers.getContractFactory("Token");

  const contract_deploy = await Token.deploy();
  console.log("Contract deployed to address:", contract_deploy.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

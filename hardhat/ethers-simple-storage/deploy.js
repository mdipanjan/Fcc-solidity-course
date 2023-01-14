import { ethers } from "ethers";
import fs from "fs-extra";
async function main() {
  // HTTP://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider(
    "HTTP://127.0.0.1:7545"
  );
  const wallet = new ethers.Wallet(
    "11ef713dedf5128b5b32f39c1a9157ee274af0d78d921bf4fc14951daae5a006",
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  const contract = await contractFactory.deploy();
  //Transaction recipent wait for 1 block confirmation
  const deploymentRecipent = await contract.deployTransaction.wait(1);
  //   console.log(deploymentRecipent);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

import { ethers } from "ethers";
import fs from "fs-extra";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  // HTTP://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );

  // const tx = {
  //   nonce: await wallet.getTransactionCount(),
  //   gasPrice: 20000000000,
  //   gasLimit: 1000000,
  //   to: null,
  //   value: 0,
  //   data: "0x..",
  //   chainId: 1337,
  // };

  // const sendTxResponse = await wallet.sendTransaction(tx);
  // console.log(
  //   "Example of Signing Transaction, where no charges dedcuts",
  //   sendTxResponse
  // );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  const contract = await contractFactory.deploy();
  // Transaction recipent wait for 1 block confirmation
  const deploymentRecipent = await contract.deployTransaction.wait(1);
  console.log(deploymentRecipent);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

const { ethers } = require("hardhat");
const {crytoDevGoerliAddress,crytoDevPolygonAddress} = require("../constants")


async function main() {
   const CryptoDevFactory = await ethers.getContractFactory("CryptoDevToken")
   const CrytoDev = await CryptoDevFactory.deploy(crytoDevGoerliAddress)
   await CrytoDev.deployed()
   console.log(`The contract has been deployed`)
   console.log(`  The contract address: ${CrytoDev.address}`)
   return CrytoDev
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then((e)=>{
  console.log(e)
}).catch((e) => {
  console.log(e);
  process.exitCode = 1;
});


module.exports={
  main
}

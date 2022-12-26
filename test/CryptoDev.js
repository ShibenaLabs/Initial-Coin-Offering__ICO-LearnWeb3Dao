const {ethers} = require("hardhat")
const {main} = require("../scripts/deploy")
describe("CrtptoDev",()=>{
     let CryptoDev,deployer,user1,user2,user3 
    beforeEach(async()=>{
       CryptoDev = await main();
       [deployer,user1,user2,user3] = await ethers.getSigners()
    })
})
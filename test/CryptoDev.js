const {ethers} = require("hardhat")
const {BigNumber} = ethers
const {main} = require("../scripts/deploy")
const { assert, expect } = require("chai")
describe("CrtptoDev",()=>{
     let CryptoDev,deployer,user1,user2,user3,tokenContractPrice
    beforeEach(async()=>{
      tokenContractPrice = ethers.utils.parseEther("0.001")
       CryptoDev = await main();
       [deployer,user1,user2,user3] = await ethers.getSigners()
    })
    
    it("ensures the name and symbol are correct",async()=>{
          const name = await CryptoDev.name()
          const symbol = await CryptoDev.symbol()
          assert.equal(name.toString(),"Crypto Dev Token")
          assert.equal(symbol.toString(),"CD")
    })

    it("ensures the tokenPrice is correctly set",async()=>{
         const tokenPrice = await CryptoDev.tokenPrice()
         expect(tokenPrice.toString()).to.equal(tokenContractPrice.toString())
    })
})
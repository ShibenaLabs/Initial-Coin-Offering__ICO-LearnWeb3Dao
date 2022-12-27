const { ethers } = require("hardhat")
const { BigNumber,utils } = ethers
const { main } = require("../scripts/deploy")
const { assert, expect } = require("chai")
describe("CrtptoDev", () => {
  let CryptoDev,
    deployer,
    user1,
    user2,
    user3,
    tokenContractPrice,
    maxTotalSupply,
    tokensPerNFT,
    number,
    maxValue,
    fakeprice,
    correctPrice
  beforeEach(async () => {
    tokenContractPrice = ethers.utils.parseEther("0.001")
    maxValue = BigNumber.from("10").pow("18")
    maxTotalSupplyFromContract = BigNumber.from("10000").mul(maxValue).toString()
    tokensPerNFT = BigNumber.from("10").pow("19")
    price = utils.parseEther("0.001")
    correctPrice = utils.parseEther("100")
    CryptoDev = await main()
    ;[deployer, user1, user2, user3] = await ethers.getSigners()
  })

  it("ensures the name and symbol are correct", async () => {
    const name = await CryptoDev.name()
    const symbol = await CryptoDev.symbol()
    assert.equal(name.toString(), "Crypto Dev Token")
    assert.equal(symbol.toString(), "CD")
  })

  it("ensures the tokenPrice,tokensPerNFT,maxTotalSupply is correctly set", async () => {
    const tokenPrice = await CryptoDev.tokenPrice()
    const contractTokenPerNFT = await CryptoDev.tokensPerNFT()
    const maxTotalSupply = await CryptoDev.maxTotalSupply()
    expect(tokenPrice.toString()).to.equal(tokenContractPrice.toString())
    assert.equal(contractTokenPerNFT.toString(), tokensPerNFT.toString())
    assert.equal(maxTotalSupply.toString(),maxTotalSupplyFromContract)
  })

  it("set the initial state of the mapping",async()=>{
        const tokenPrice = await CryptoDev.tokenIdsClaimed("0")
        assert.equal(tokenPrice,false)
  })
  
  it("reverts if the mint fee is lesser than the price of the token specified",async()=>{
       await expect(CryptoDev.mint(10,{value:fakeprice})).to.be.revertedWith("Ether sent is incorrect")
  })
  it("reverts if the totalsupply is greater than max supply of the token",async()=>{
      await expect(CryptoDev.mint(100000,{value:correctPrice})).to.be.revertedWith( "Exceeds the max total supply available.")
  })
})

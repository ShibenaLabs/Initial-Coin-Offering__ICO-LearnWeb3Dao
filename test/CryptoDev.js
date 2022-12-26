const { ethers } = require("hardhat")
const { BigNumber } = ethers
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
    maxValue
  beforeEach(async () => {
    tokenContractPrice = ethers.utils.parseEther("0.001")
    maxValue = BigNumber.from("10").pow("18")
    maxTotalSupplyFromContract = BigNumber.from("10000").mul(maxValue).toString()
    tokensPerNFT = BigNumber.from("10").pow("19")
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
})

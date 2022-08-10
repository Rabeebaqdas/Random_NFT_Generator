const {network, ethers} = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
module.exports = async function({getNamedAccounts}){
     const { deployer } = await getNamedAccounts()
  
   
        const randomIpfsNft = await ethers.getContract("RandomNFT",deployer)
        const mintFee = await randomIpfsNft.getMintFee()
        console.log("processing",mintFee.toString())
         const randomIpfsNftMintTx = await randomIpfsNft.requestNft({value : mintFee.toString()})
        const randomIpfsNftMintTxReceipt = await randomIpfsNftMintTx.wait(1)
        console.log("Fees done")
        const counter = await randomIpfsNft.getTokenCounter()
        await new Promise(async (resolve, reject) => {
            setTimeout(() => reject("Timeout: 'NFTMinted' event did not fire"), 300000) // 5 minute timeout time
            // setup listener for our event
            randomIpfsNft.once("NftMinted", async () => {
                resolve()
            })
    
            if (developmentChains.includes(network.name)) {
                const requestId = randomIpfsNftMintTxReceipt.events[1].args.requestId.toString()
                const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock", deployer)
                await vrfCoordinatorV2Mock.fulfillRandomWords(requestId, randomIpfsNft.address)
            }
        })
        console.log(`Congratulations you got your pet this is the tokenURI: ${await randomIpfsNft.tokenURI(counter)} put it on IPFS and check what you got :)`)

}

module.exports.tags = ["all", "mint"];
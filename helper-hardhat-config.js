const {ethers} = require("hardhat");

const networkConfig = {
    4: {
        name : "rinkeby",
        vrfCoordinatorV2 : "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
        mintFee : ethers.utils.parseEther("0.01"),
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
        subscriptionId : "7025",
        callbackGasLimit : "500000",
    },
    31337 : {
        name : 'localhost',
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // this is the keyhash it could be anything for localhost and hardhat network
        callbackGasLimit : "8000000",
        mintFee : ethers.utils.parseEther("0.01"),
    }
}

const developmentChains = ["hardhat", "localhost"];

module.exports = {
    networkConfig,
    developmentChains
}
const pinataSDK = require("@pinata/sdk")
const path = require("path")
const fs = require("fs")


const pinatakey = process.env.API_KEY_PINATA
const pinatasecret = process.env.API_SECRET_PINATA
let pinata = pinataSDK(pinatakey,pinatasecret)

async function storeImages(imagesFilePath) {
    const fullImagePath = path.resolve(imagesFilePath)
    const files = fs.readdirSync(fullImagePath)
    console.log(files)
    let responses = []
        console.log("Uploading To IPFS!");
    for(fileIndex in files) {
        console.log(`Working on ${fileIndex}.......`);
        const readableStreamForFile = fs.createReadStream(`${fullImagePath}/${files[fileIndex]}`);
      
        try {
            const response = await pinata.pinFileToIPFS(readableStreamForFile)
           console.log(response);
            responses.push(response);
        }catch(err){
            console.log(err);
    }
    console.log(`Uploading Finished for ${fileIndex}..........`);
    }

    console.log("All Uploading Has Been Completed!")

    return {responses, files}
   
}

async function storeTokeUriMetadata(metadata) {
    try {
        const response = await pinata.pinJSONToIPFS(metadata)
        return response;
    } catch (error) {
        console.log(error)
    }
    return null
}

module.exports = {storeImages,storeTokeUriMetadata}
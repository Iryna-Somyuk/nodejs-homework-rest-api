const Jimp = require("jimp");
 const imgManipulation = async(path) => {
    try {
        const avatar = await Jimp.read(path);
        avatar.resize(250, 250);
        avatar.write(path)
        

    } catch (error) {
        console.log(error)
        
    }
 }
 module.exports = imgManipulation;
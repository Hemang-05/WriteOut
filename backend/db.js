const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://hemang:hemang12@cluster0.zbyirpd.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo=async()=>{
    await mongoose.connect(mongoURI, ()=>{
        console.log("connected");
    })
}


module.exports = connectToMongo
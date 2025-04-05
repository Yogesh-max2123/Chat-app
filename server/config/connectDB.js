const mongoose = require('mongoose');

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log('.✅ MongoDB connected successfully');

        })
        connection.on('error',(error)=>{
            console.log('.❌ MongoDB connection error:',error.message);
        })
    }catch(error){
        console.log('Error connecting to MongoDB:', error.message);
    }
}
module.exports = connectDB;

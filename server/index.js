const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");
const router = require("./routes/index.js");

const app = express();

app.use(cors({
  origin : process.env.FRONTEND_URL,
  credentials : true
}))
app.use(express.json())
app.use(cookieParser())

const port = process.env.PORT || 8080

app.get('/',(request,response)=>{
  response.json({
      message : "Server running at " + port
  })
})

//api endpoints
app.use('/api',router)

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`✅ Server is running on port: ${port}`);
    console.log(`✅ MongoDB connected successfully`);
    console.log("✅ MONGODB_URI:", process.env.MONGODB_URI);
  });
});

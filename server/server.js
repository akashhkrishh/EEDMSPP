const express = require('express');
const app = express();

const bodyparser = require('body-parser');
const cors = require('cors');
const fs = require('fs')
require('dotenv').config();


const port = process.env.PORT || 4444;

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());


const connectDB = require("./config/db.js"); 
const IPGet  = require('./utils/IPGetting.js');
connectDB();


app.use('/api/user',require('./routes/userRoutes'))
app.use('/api/attacker',require('./routes/attackerRoutes'))
app.use('/api/server',require('./routes/serverRoutes'))

app.get("/",(req,res)=>{
    res.send("Hello World!");
});

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})
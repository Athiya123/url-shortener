const express = require('express');
const app = express();

// app.use(express.json());

app.get('/',(req,res)=>{
    return res.send("welcome");
})
app.listen(3002,()=>{
    console.log("welcome on port 3002");
})
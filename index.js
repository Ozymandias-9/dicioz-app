const express = require('express');
const app = express();

//Files

const students = require('./files/students');
const teachers = require('./files/teachers')

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is running...")
});

app.get('/', (req, res)=>{
    console.log("A client has entered to the server.")
    res.send("Ah dog, you got the omnitrix.");
})

app.use('/students', students)

app.use('/teachers', teachers)
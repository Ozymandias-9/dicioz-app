const express = require('express');
const teachers = express.Router()

teachers.get("/", (req,res,next) => {
    console.log("You've entered the teachers' server.")
    return res.status(200).json({ code: 1, message: "Connected to teachers' server succesfully." });
});

module.exports = teachers;
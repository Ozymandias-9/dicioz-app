const express = require('express');
const students = express.Router()

students.get("/", (req,res,next) => {
    console.log("You've entered the students' server.")
    return res.status(200).json({ code: 1, message: "xd" });
});

module.exports = students
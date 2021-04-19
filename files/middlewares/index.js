module.exports = (req, res, next)=>{
    console.log("A client has entered to the main server.")
    res.status(200).json({code: 200, message: "Ah dog, you got the omnitrix"});
}
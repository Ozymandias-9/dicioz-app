const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    //const token = req.headers['authorization'] ... Esto funciona como un diccionario o un objeto
    try{
        const decoded = jwt.verify(token, "debugkey");
        req.user = decoded;
        next();
    }catch(error){
        return res.status(400).json({code: 400, message: "No tienes permiso de ingresar."});
    }
}
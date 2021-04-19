const express = require('express');
const students = express.Router()
const db = require('./config/database');
const tabla = 'alumnos';
const jwt = require('jsonwebtoken');

//GET
students.get("/", async (req,res,next) => {
    console.log("You've entered the students' server.");
    const query = await db.query(`SELECT * FROM ${tabla};`);

    if(query.length !== 0){
        return res.status(200).json({code: 200, message: query});
    }
    return res.status(400).json({code: 400, message: "Sin información en la base de datos."});
})

students.get('/:id([0-9]{1,3})', async (req, res, next)=>{
    const id = req.params.id;
    const query =  await db.query(`SELECT * FROM ${tabla} WHERE id = ${id};`);
    if(query.length !== 0){
        return res.status(200).json({code: 200, message: query});
    }
    return res.status(400).json({code: 400, message: "Estudiante no encontrado."});
})

students.get('/:name([A-Za-z]+)', async (req, res, next)=>{
    const name = req.params.name;
    const query = await db.query(`SELECT * FROM ${tabla} WHERE nombre LIKE '%${name}%';`);

    if(query.length !== 0){
        return res.status(200).json({code: 200, message: query});
    }
    return res.status(400).json({code: 400, message: "Estudiante no encontrado."});
    
})

//POST
students.post('/signin', async (req, res, next)=>{
    const {nombre, apellido, expediente, carrera} = req.body;

    if(nombre && apellido && expediente && carrera){
        data = `INSERT INTO ${tabla} (nombre , apellido, expediente, carrera)`;
        data += `VALUES('${nombre}', '${apellido}', '${expediente}', '${carrera}');`;
        const query =  await db.query(data);
        if(query.affectedRows == 1){
            return res.status(200).json({code: 200, message: `Registro completado correctamente. ${query.affectedRows} fila(s) modificadas.`});
        }
        console.log("Hubo un fallo en la acción.");
        return res.status(400).json({code: 400, message: "Hubo un fallo en la acción."});
    }
    console.log("Registro incompleto.");
    return res.status(400).json({code: 400, message: "Registro incompleto."});
})

students.post("/login", async (req, res, next) => {
    const {apellido, expediente} = req.body;
    const query = `SELECT * FROM ${tabla} WHERE apellido = '${apellido}' AND expediente = '${expediente}';`;
    const rows = await db.query(query);
    console.log("Apellido: ");
    console.log(apellido);
    console.log("Expediente: ")
    console.log(expediente)

    if (apellido && expediente){
        if(rows.length == 1){
            const token = jwt.sign({
                id: rows[0].id,
                apellido: rows.apellido,
                expediente: rows.expediente
            }, "debugkey");
            return res.status(200).json({code: 200, message: token});
        }
        else{
            return res.status(401).json({code: 401, message: "Usuario y/o contraseña incorrectos"});
        }
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

//DELETE
students.delete('/:id([0-9]{1,3})', async (req, res, next)=>{
    const id = req.params.id;
    const query = await db.query(`DELETE FROM ${tabla} WHERE id=${id};`);

    if(query.affectedRows == 1){
        return res.status(200).json({code: 200, message: "Estudiante eliminado correctamente."});
    }
    return res.status(400).json({code: 400, message: "Eliminación fallida."})
})

students.delete('/:name([A-Za-z]+)', async (req, res, next)=>{
    const name = req.params.name;
    const query = await db.query(`DELETE FROM ${tabla} WHERE nombre LIKE '%${name}%';`);

    if(query.affectedRows == 1){
        return res.status(200).json({code: 200, message: "Estudiante eliminado correctamente."});
    }
    return res.status(200).json({code: 404, message: "Eliminación fallida."})
})

//PUT
students.put("/:id([0-9]{1,3})", async (req,res,next)=>{
    const {nombre, apellido, expediente, carrera} = req.body;
    const id = req.params.id;

    if(nombre && apellido && expediente && carrera){
        const query = await db.query(`UPDATE ${tabla} SET nombre='${nombre}', apellido='${apellido}', expediente='${expediente}', carrera='${carrera}' WHERE id=${id};`)
        if(query.affectedRows == 1){
            return res.status(200).json({code: 200, message: "Estudiante actualizado correctamente."});
        }
        return res.status(400).json({code: 400, message: "Actualización fallida."});
    }
    return res.status(400).json({code: 400, message: "Datos incompletos."});
})

//PATCH
students.patch("/:id([0-9]{1,3})", async (req, res, next)=>{
    const nombre = req.body.nombre;
    const id = req.params.id;

    if(nombre){
        const query = await db.query(`UPDATE ${tabla} SET nombre='${nombre}' WHERE id=${id}`);
        if(query.affectedRows == 1){
            return res.status(200).json({code: 200, message: "Estudiante actualizado correcamente."});
        }
        return res.status(400).json({code: 400, message: "Actualización fallida."});
    }
    return res.status(400).json({code: 400, message: "Datos incompleto."});
})

module.exports = students
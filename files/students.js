const express = require('express');
const { query } = require('./config/database');
const students = express.Router()
const db = require('./config/database');
const tabla = 'alumnos';

//GET
students.get("/", (req,res,next) => {
    console.log("You've entered the students' server.")
    return res.status(200).json({ code: 1, message: "Connected to students' server succesfully." });
});
students.get('/:id([0-9]{1,3})', async (req, res, next)=>{
    const id = req.params.id;
    if(req.params.id){
        const students = await db.query(`SELECT * FROM ${tabla} WHERE id = ${id};`);
        return res.status(200).json({code: 200, message: students});
    }
})
students.get('/:name([A-Za-z]+)', async (req, res, next)=>{
    const name = req.params.name;

    if(name){
        const students = await db.query(`SELECT * FROM ${tabla} WHERE nombre LIKE '%${name}%';`);
        return res.status(200).json({code: 200, message: students});
    }
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
        return res.status(400).json({code: 400, message: "Hubo un fallo en la acción."});
    }
    return res.status(400).json({code: 400, message: "Registro incompleto."});
})

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
const express = require('express');
const morgan = require('morgan');
const app = express();

//Files

const students = require('./files/students');
const teachers = require('./files/teachers')

//Middlewares
const auth = require('./files/middlewares/auth');
const index = require('./files/middlewares/index');
const notFound = require('./files/middlewares/notFound');
const cors = require('./files/middlewares/cors');

//Settings
app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

//Routes
//Manejo de rutas independientes
app.get('/', index);

app.use('/students', students);

app.use('/teachers', teachers);

//Aplicación de Middlewares
//En el caso de no ocuparse los anteriores casos pasa a los middlewares para poder capturar algo
app.use(auth);

app.use(notFound);
//En el caso en el que no encuentre nada el servidor, se lanzará el CANNOT 

//Actions
app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is running...")
});
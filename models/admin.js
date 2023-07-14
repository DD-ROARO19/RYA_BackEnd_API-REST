const mongoose = require('mongoose');

const AdminShema = new mongoose.Schema({
    nombre:String,
    apellido_paterno:String,
    apellido_materno:String,
    email:String,
    puesto:String,
    password:String,
    estado:Boolean
});

mongoose.model('Admin', AdminShema);
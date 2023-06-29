//Model
const mongoose = require('mongoose');

const ClienteShema = new mongoose.Schema({
    nombre:String,
    apellido_paterno:String,
    apellido_materno:String,
    email:String,
    RFC:String,
    telefono:String,
    extra:String,
    casos:Object
});

mongoose.model('Cliente', ClienteShema);
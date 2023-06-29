const mongoose = require('mongoose');

const AbogadoShema = new mongoose.Schema({
    nombre:String,
    apellido_paterno:String,
    apellido_materno:String,
    email:String,
    NSS:Number,
    RFC:String,
    puesto:String,
    password:String
});

mongoose.model('Abogado', AbogadoShema);
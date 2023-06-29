const mongoose = require('mongoose');

const CasoShema = new mongoose.Schema({
    titulo:String,
    caracteristicas:String,
    propiedades:String,
    abogado:String,
    cliente:String,
    fecha_inicio:Date,
    fecha_cierre:Date,
    estado:String
});

mongoose.model('Caso', CasoShema);
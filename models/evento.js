const mongoose = require('mongoose');

const EventoShema = new mongoose.Schema({
    fecha:Date,
    titulo:String,
    descripcion:String,  // String o Object ??
    cuenta:String
});

mongoose.model('Evento', EventoShema);
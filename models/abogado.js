const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const AbogadoShema = new mongoose.Schema({
    nombre:String,
    apellido_paterno:String,
    apellido_materno:String,
    telefono:String,
    NSS:String,
    RFC:String,
    puesto:String,
    oficina:String,
    email:String,
    password:String,
    estado:Boolean,
    admin:Boolean,
    img:Object
});

AbogadoShema.methods.setImgAvatar = function setImgAvatar(img) {
    this.img.avatar = 'http://localhost:3000/foto/'+img;
}
AbogadoShema.methods.setImgAvatar = function setImgFondo(img) {
    this.img.fondo = 'http://localhost:3000/foto/'+img;
}

AbogadoShema.methods.generarToken = function(){
    return jwt.sign({
        nombre: this.nombre,
        ap_paterno: this.apellido_paterno,
        email: this.email,
    }, 'P4S5-5ECR3T');
}

mongoose.model('Abogado', AbogadoShema);
var express = require('express');
var router = express.Router();

const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');
const { uploadAvatar, uploadFondo } = require('../middleware/upload');

const mongoose = require('mongoose');

const abogado = mongoose.model('Abogado');
// const admin = mongoose.model('Admin'); // NO EN USO || Lo mantengo por si acaso.

const bcrypt = require('bcrypt');


//METODO

// >>>> Login <<<< TESTING
router.post('/', async (req, res) => {
    user_emp = await abogado.findOne({ email: req.body.usuario }); //Buscar Abogado

    // Mensaje de error.
    let mensaje = 'Usuario o contraseña incorrectos';

    if ( !user_emp ) { // Si no lo encuentra entonces hay un error en el usuario/correo
        return res.status(402).send({ msg:mensaje/*Debugging:*//* , e_type:0, usuario: req.body.usuario*/ });
    }

    // > Verificar que la cuenta este activa.
    if ( user_emp.estado !== true ) { 
        let mensaje = 'Cuenta desactivada';
        return res.status(402).send({ msg:mensaje/*Debugging: , e_type: 2*/ });
    }

    // >> Verificar contraseña (cambia a verificacion con encryptacion)
    if ( !await bcrypt.compare( req.body.password, user_emp.password ) ) { 
        return res.status(402).send({ msg:mensaje/*Debugging:*//* , e_type: 1/**/ });
    }
    
    // let imagenes = user_emp.img.split('|');

    // >>> Informacion customizada a mostrar de la cuenta.
    let user = { 
        nombre: user_emp.nombre,
        apellido_paterno: user_emp.apellido_paterno,
        apellido_materno: user_emp.apellido_materno,
        telefono: user_emp.telefono,
        NSS: user_emp.NSS,
        RFC: user_emp.RFC,
        oficina: user_emp.oficina,
        email: user_emp.email,
        puesto: user_emp.puesto,
        estado: user_emp.estado,
        id: user_emp._id,
        token: user_emp.generarToken()
        // imgAvatar: imagenes[0]
    };

    if ( user_emp.img ) {
        user.img =  user_emp.img;
    }

    if (user_emp.admin == true) {
        user.admin = true;
    }

    // >>>> Enviar información seleccionada (en el futuro enviar junto al token)
    res.send({ user });

    

});

module.exports = router;
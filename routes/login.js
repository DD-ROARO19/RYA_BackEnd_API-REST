var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

const abogado = mongoose.model('Abogado');
const admin = mongoose.model('Admin');

const bcrypt = require('bcrypt');

//METODO

// >>>> Login <<<< TESTING
router.post('/', async (req, res) => {
    let user_emp = await admin.findOne({ email: req.body.usuario }); //Primero buscara si el usuario es un Administrador.

    let mensaje = 'Usuario o contraseña incorrectos';

    if ( !user_emp ) { // Si no lo encuentra entonces buscara si el usuario es un abogado.
        user_emp = await abogado.findOne({ email: req.body.usuario }); //Buscar Abogado

        if ( !user_emp ) { // Si no lo encuentra entonces hay un error en el usuario/correo
            return res.status(402).send({ msg:mensaje/*Debugging: , e_type:0, usuario: req.body.usuario*/ });
        }
    }

    // > Verificar que la cuenta este activa.
    if ( user_emp.estado !== true ) { 
        let mensaje = 'Cuenta desactivada';
        return res.status(402).send({ msg:mensaje/*Debugging: , e_type: 2*/ });
    }

    // >> Verificar contraseña (cambia a verificacion con encryptacion)
    if ( !await bcrypt.compare( req.body.password, user_emp.password ) ) { 
        return res.status(402).send({ msg:mensaje/*Debugging: , e_type: 1*/ });
    }

    // >>> Informacion customizada a mostrar de la cuenta.
    let user = { 
        nombre: user_emp.nombre,
        apellido_paterno: user_emp.apellido_paterno,
        apellido_materno: user_emp.apellido_materno,
        email: user_emp.email,
        puesto: user_emp.puesto,
        estado: user_emp.estado
    };

    // >>>> Enviar información seleccionada (en el futuro enviar junto al token)
    res.send({ user });

    

});

module.exports = router;
var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

const abogado = mongoose.model('Abogado');

/* GET users listing. */
// >>>> Consultar todo <<<<
router.get('/', async (req, res) => {
    
    let ab = await abogado.find();

    if ( ab == false ) {
        return res.status(402).send('No hay información');
    }

    // >>>> Envia toda la información <<<<
    res.send({ ab });

});

// >>>> VV Solo consultar 1 con POST VV <<<<
router.post('/email', async (req, res) => {
    let ab = await abogado.findOne({ email: req.body.email });

    if ( !ab ) {
        return res.status(402).send('Abogado no encontrado');
    }

    let ab_envio = {
        nombre: ab.nombre,
        apellido_paterno: ab.apellido_paterno,
        apellido_materno: ab.apellido_materno,
        email: ab.email,
        puesto: ab.puesto
    };
    // >>>> Enviar información seleccionada
    res.send({ ab_envio });

    // >>>> Envia toda la información
    //res.send({ ab });

});

// >>>> VV Borrar con POST VV <<<<
router.post('/borrar', async (req, res) => {
    let ab = await abogado.findOne({ email: req.body.email  });

    if ( !ab ) {
        return res.status(402).send('Abogado no encontrado');
    }

    let ab_del = await abogado.findOneAndDelete({ email: req.body.email });

    res.send({ ab_del, msj:"Exitosamente borrado" });

});

// >>>> Insertar <<<<
router.post('/', async (req, res) => {
    let ab = await abogado.findOne({ email: req.body.email });

    if ( ab ) {
        return res.status(402).send('Correo ya utilizado');
    }

    let abg = new abogado({
        nombre:req.body.nombre,
        apellido_paterno:req.body.apellido_paterno,
        apellido_materno:req.body.apellido_materno,
        email:req.body.email,
        NSS:req.body.NSS,
        RFC:req.body.RFC,
        puesto:req.body.puesto,
        password:req.body.password
    });

    await abg.save();
    res.status(201).send({ msj:'Exitosamente guardado' });

});

// >>>> Modificar <<<<
router.put('/', async (req, res) => {
    let ab = await abogado.findOne({ email: req.body.email });
    
    if ( !ab ){ //Si no existe el Abogado, detener operación.
        return res.status(402).send('Abogado no encontrado');
    }
b
    let ab_upd = await abogado.findOneAndUpdate(
        { email:req.body.email }, //Filtro.
        {  
            nombre:req.body.nombre,
            apellido_paterno:req.body.apellido_paterno,
            apellido_materno:req.body.apellido_materno,
            NSS:req.body.NSS,
            RFC:req.body.RFC,
            puesto:req.body.puesto,
            sueldo:req.body.sueldo,
            password:req.body.password
        }, //Nueva información.
        { new:true } //retorna obj viejo (false) o nuevo(true).
    );

    //res.send({ ab_upd, msj:'Exitosamente guardado' });
    res.send({ msj:'Exitosamente guardado' });

});

// >>>> Login <<<< TESTING
router.post('/login', async (req, res) => {
    let user_emp = await abogado.findOne({ email: req.body.usuario });

    let mensaje = 'Usuario o contraseña incorrectos';

    if ( !user_emp ) {
        return res.status(402).send({ msg:mensaje/*Debugging: , e_type:0, usuario: req.body.usuario*/ });
    }

    if ( user_emp.password !== req.body.password ) {
        return res.status(402).send({ msg:mensaje/*Debugging: , e_type: 1*/ });
    }else{

        let login_ab = {
            nombre: user_emp.nombre,
            apellido_paterno: user_emp.apellido_paterno,
            apellido_materno: user_emp.apellido_materno,
            email: user_emp.email,
            puesto: user_emp.puesto
        };

        // >>>> Enviar información seleccionada
        res.send({ login_ab });

    }

});

module.exports = router;
//Route
var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

const cliente = mongoose.model('Cliente');

// >>>> Consultar Todo <<<<
router.get('/', async (req, res) => {
    let cl = await cliente.find();

    if ( cl == false ) {
        return res.status(402).send('No hay información');
    }

    // >>>> Consultar la información
    res.send({ cl });

});

// >>>> Consultar 1 <<<<
router.post('/email', async (req, res) => {
    let cl = await cliente.findOne({ email: req.body.email });

    if ( !cl ) {
        return res.status(402).send('Empleado no encontrado');
    }

    res.send({ cl });

});

// >>>> Guardar <<<<
router.post('/', async (req, res) => {
    let cl = await cliente.findOne({ email: req.body.email });

    if ( cl ) {
        return res.status(402).send('Email ya está en uso');
    }

    let cli = new cliente({
        nombre:req.body.nombre,
        apellido_paterno:req.body.apellido_paterno,
        apellido_materno:req.body.apellido_materno,
        email:req.body.email,
        RFC:req.body.RFC,
        telefono:req.body.telefono,
        extra:req.body.extra,
        casos:req.body.casos
    });

    await cli.save();
    // res.status(201).send({ cli, msj:'Exitosamente guardado' });
    res.status(201).send({ msj:'Exitosamente guardado' });

});

// >>>> Modificar <<<<
router.put('/', async (req, res) => {
    let cl = await cliente.findOne({ email: req.body.email });

    if ( !cl ) {
        return res.status(402).send('Cliente no encontrado');
    }

    let cl_upd = await cliente.findOneAndUpdate(
        { email: req.body.email },
        {
            nombre:req.body.nombre,
            apellido_paterno:req.body.apellido_paterno,
            apellido_materno:req.body.apellido_materno,
            RFC:req.body.RFC,
            telefono:req.body.telefono,
            extra:req.body.extra,
            casos:req.body.casos
        },
        { new:true }
    );

    // res.send({ cl_upd });
    res.send({ msj:'Exitosamente guardado' });

});

// >>>> Eliminar <<<<
router.post('/borrar', async (req, res) => {
    let cl = await cliente.findOne({ email: req.body.email });

    if ( !cl ) {
        return res.status(402).send('Cliente no encontrado');
    }

    let cl_del = await cliente.findOneAndDelete({ email: req.body.email });

    res.send({ cl_del, msj:'Exitosamente borrado' });

});

module.exports = router;
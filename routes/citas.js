//Route
var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

const cita = mongoose.model('Cita');

// >>>> Consultar Todo <<<<
router.get('/', async (req, res) => {
    let ci = await cita.find();

    if ( ci == false ) {
        return res.status(402).send('No hay información');
    }

    // >>>> Consultar la información
    res.send({ ci });

});

// >>>> Consultar 1 <<<<
router.post('/email', async (req, res) => {
    let ci = await cita.findOne({ email: req.body.email });

    if ( !ci ) {
        return res.status(402).send('No encontrado');
    }

    res.send({ ci });

});

// >>>> Guardar <<<<
router.post('/', async (req, res) => {
    let ci = await cita.findOne({ email: req.body.email });

    if ( ci ) {
        return res.status(402).send({  msj:'Email ya registrado' });
    }

    let cii = new cita({
        nombre:req.body.nombre,
        apellido_paterno:req.body.apellido_paterno,
        apellido_materno:req.body.apellido_materno,
        email:req.body.email,
        telefono:req.body.telefono,
        fecha:req.body.fecha,
        hora:req.body.hora,
        descripcion:req.body.descripcion,
        estado:false
    });

    await cii.save();
    // res.status(201).send({ cii, msj:'Exitosamente guardado' });
    res.status(201).send({ hora:req.body.hora, msj:'Exitosamente guardado' });

});

// >>>> Modificar <<<<
router.put('/', async (req, res) => {
    let ci = await cita.findOne({ email: req.body.email });

    if ( !ci ) {
        return res.status(402).send('No encontrado');
    }

    let ci_upd = await cita.findOneAndUpdate(
        { email: req.body.email },
        {
            nombre:req.body.nombre,
            apellido_paterno:req.body.apellido_paterno,
            apellido_materno:req.body.apellido_materno,
            telefono:req.body.telefono,
            fecha:req.body.fecha,
            hora:req.body.hora,
            descripcion:req.body.descripcion,
            estado:req.body.estado
        },
        { new:true }
    );

    // res.send({ ci_upd });
    res.send({ msj:'Exitosamente guardado' });

});

// >>>> Eliminar <<<<
router.post('/borrar', async (req, res) => {
    let ci = await cita.findOne({ email: req.body.email });

    if ( !ci ) {
        return res.status(402).send('No encontrado');
    }

    let ci_del = await cita.findOneAndDelete({ email: req.body.email });

    res.send({ ci_del, msj:'Exitosamente borrado' });

});

module.exports = router;
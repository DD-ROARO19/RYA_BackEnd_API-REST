var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

const evento = mongoose.model('Evento');

// METODOS

// >>>> Consular todos los eventos existentes <<<<
router.get('/', async (req, res) => {
    let ev = await evento.find();

    if ( ev == false ) {
        return res.status(402).send('No hay información');
    }

    // >>>> Consultar la información
    res.send({ ev });

});

// >>>> Consultar todos los eventos en una fecha <<<<
router.post('/fecha', async (req, res) => {
    let ev = await evento.find({ fecha: req.body.fecha, cuenta: req.body.cuenta });

    if ( ev == false ) {
        return res.status(402).send('');
    }

    // >>>> Consultar la información
    res.send({ ev });

});

// >>>> Consultar todos los eventos en MES <<<<
router.post('/mes', async (req, res) => {
    let ev = await evento.find({ fecha: { $gte: req.body.MesInicio, $lte: req.body.MesFin }, cuenta: req.body.cuenta });

    // if ( ev == false ) {
    //     return res.status(402).send({msg:'No se encontro ningun evento.'});
    // }

    // >>>> Consultar la información
    res.send({ msg:'Eventos encontrados', ev, MesInicio: req.body.MesInicio, MesFin: req.body.MesFin });

});

// >>>> Consultar todos los eventos en SEMANA <<<<
router.post('/week', async (req, res) => {
    let ev = await evento.find({ fecha: { $gte: req.body.MesInicio, $lte: req.body.MesFin }, cuenta: req.body.cuenta });

    if ( ev == false ) {
        return res.status(402).send('');
    }

    // >>>> Consultar la información
    res.send({ ev });

});

// >>>> Consultar un solo evento
router.post('/id', async (req, res) => {
    let ev = await evento.findOne({ id: req.body.id });

    if ( !ev ) {
        return res.status(402).send('No encontrado');
    }

    res.send({ ev });

});

// >>>> Crear evento <<<<
router.post('/', async (req, res) => {
    let ev = await evento.findOne({ fecha: req.body.fecha, titulo: req.body.titulo, cuenta: req.body.cuenta });

    if ( ev ) {
        return res.status(402).send({  msj:'Evento con el mismo nombre, en el mismo dia, ya registrado' });
    }

    let eve = new evento({
        fecha: req.body.fecha,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,  // String o Object | de momento String
        cuenta: req.body.cuenta
    });

    await eve.save();
    // res.status(201).send({ cii, msj:'Exitosamente guardado' });
    res.status(201).send({ msj:'Exitosamente guardado' });

});

// >>>> Modificar evento <<<<
router.put('/', async (req, res) => {
    let ev = await evento.findOne({ id: req.body.id });

    if ( !ev ) {
        return res.status(402).send('No encontrado');
    }

    let ev_upd = await evento.findOneAndUpdate(
        { id: ev.id },
        {
            fecha: req.body.fecha,
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,  // String o Object | de momento String
            cuenta: req.body.cuenta
        },
        { new:true }
    );

    // res.send({ ci_upd }); // Por si se necesita consultar los datos enviados.
    res.send({ msj:'Exitosamente guardado' });

});

// >>>> Borrar evento <<<<
router.post('/borrar', async (req, res) => {
    try {
        const eventId = req.body._id; // Obtener el _id del evento desde el cuerpo de la solicitud
        console.log("Evento a borrar:", eventId); // Agregar un log para verificar el _id recibido

        // Verificar si el evento con el _id proporcionado existe en la base de datos
        const eventToDelete = await evento.findById(eventId);
        if (!eventToDelete) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        // Realizar la eliminación del evento en la base de datos
        const deletedEvent = await evento.findByIdAndDelete(eventId);

        if (!deletedEvent) {
            return res.status(500).json({ message: 'Error al borrar el evento' });
        }

        res.json({ deletedEvent, message: 'Evento borrado exitosamente' });
    } catch (error) {
        console.error('Error al borrar el evento:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});


module.exports = router;
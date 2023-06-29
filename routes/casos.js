var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

const caso = mongoose.model('Caso');

/* GET users listing. */
// >>>> Consultar todo <<<<
router.get('/', async (req, res) => {
    
    let Caso = await caso.find();

    if ( Caso == false ) {
        return res.status(402).send('No hay información');
    }

    // >>>> Envia toda la información <<<<
    res.send({ Caso });

});

// >>>> VV Solo consultar 1 con POST VV <<<<
router.post('/cliente', async (req, res) => {
    let Caso = await caso.findOne({ cliente: req.body.cliente });

    if ( !Caso ) {
        return res.status(402).send('No encontrado');
    }

    let caso_envio = {
        nombre: Caso.nombre,
        apellido_paterno: Caso.apellido_paterno,
        apellido_materno: Caso.apellido_materno,
        cliente: Caso.cliente,
        puesto: Caso.puesto
    };
    // >>>> Enviar información seleccionada
    res.send({ caso_envio });

    // >>>> Envia toda la información
    //res.send({ Caso });

});

// >>>> VV Borrar con POST VV <<<<
router.post('/borrar', async (req, res) => {
    let Caso = await caso.findOne({ cliente: req.body.cliente  });

    if ( !Caso ) {
        return res.status(402).send('Empleado no encontrado');
    }

    let caso_del = await caso.findOneAndDelete({ cliente: req.body.cliente });

    res.send({ caso_del, msj:"Exitosamente borrado" });

});

// >>>> Insertar <<<<
router.post('/', async (req, res) => {
    let Caso = await caso.findOne({ cliente: req.body.cliente });

    if ( Caso ) {
        return res.status(402).send('Correo ya utilizado');
    }

    let CasoInf = new caso({
        titulo:req.body.titulo,
        caracteristicas:req.body.caracteristicas,
        propiedades:req.body.propiedades,
        abogado:req.body.abogado,
        cliente:req.body.cliente,
        fecha_inicio:req.body.fecha_inicio,
        fecha_cierre:req.body.fecha_cierre,
        estado:true
    });

    await CasoInf.save();
    res.status(201).send({ msj:'Exitosamente guardado' });

});

// >>>> Modificar <<<<
router.put('/', async (req, res) => {
    let Caso = await caso.findOne({ cliente: req.body.cliente });
    
    if ( !Caso ){ //Si no existe el empleado, detener operación.
        return res.status(402).send('Empleado no encontrado');
    }
b
    let cs_upd = await caso.findOneAndUpdate(
        { cliente:req.body.cliente }, //Filtro.
        {  
            titulo:req.body.titulo,
            caracteristicas:req.body.caracteristicas,
            propiedades:req.body.propiedades,
            abogado:req.body.abogado,
            cliente:req.body.cliente,
            fecha_inicio:req.body.fecha_inicio,
            fecha_cierre:req.body.fecha_cierre,
            estado:req.body.estado
        }, //Nueva información.
        { new:true } //retorna obj viejo (false) o nuevo(true).
    );

    //res.send({ ab_upd, msj:'Exitosamente guardado' });
    res.send({ msj:'Exitosamente guardado' });

});


module.exports = router;
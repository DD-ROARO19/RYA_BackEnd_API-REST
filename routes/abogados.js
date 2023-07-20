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

// >>>> Consultar por _id <<<<
router.post('/id', async (req, res) => {
    let ab = await abogado.findOne({ _id: req.body.id });

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
        telefono: req.body.telefono,
        NSS:req.body.NSS,
        RFC:req.body.RFC,
        puesto:req.body.puesto,
        oficina:req.body.oficina,
        email:req.body.email,
        password:req.body.password,
        estado: true,
        admin: req.body.admin
    });

    await abg.save();
    res.status(201).send({ msj:'Exitosamente guardado' });

});

// >>>> Modificar <<<<
router.put('/', async (req, res) => {
    let ab = await abogado.findOne({ _id: req.body.id });
    
    if ( !ab ){ //Si no existe el Abogado, detener operación.
        return res.status(402).send('Abogado no encontrado');
    }

    let ab_upd = await abogado.findOneAndUpdate(
        { _id: req.body.id }, //Filtro.
        {  
            nombre:req.body.nombre,
            apellido_paterno:req.body.apellido_paterno,
            apellido_materno:req.body.apellido_materno,
            email:req.body.email,
            telefono: req.body.telefono,
            NSS:req.body.NSS,
            RFC:req.body.RFC,
            oficina:req.body.oficina,
            puesto:req.body.puesto
            // password:req.body.password, // Crear uno para la pura contraseña.
            // estado:req.body.estado, // Ponerlo en el que tenga privilegios de admin.
            // admin: req.body.admin // Crear uno para admin.
        }, //Nueva información.
        { new:true } //retorna obj viejo (false) o nuevo(true).
    );

    let user = { 
        nombre: ab_upd.nombre,
        apellido_paterno: ab_upd.apellido_paterno,
        apellido_materno: ab_upd.apellido_materno,
        email: ab_upd.email,
        telefono: ab_upd.telefono,
        NSS: ab_upd.NSS,
        RFC: ab_upd.RFC,
        oficina: ab_upd.oficina,
        puesto: ab_upd.puesto,
        estado: ab_upd.estado,
        id: ab_upd._id,
        // imgAvatar: imagenes[0]
    };

    // if ( imagenes.length > 1 ) {
    //     user.imgFondo = imagenes[1]
    // }

    if (ab_upd.admin == true) {
        user.admin = true;
    }

    //res.send({ ab_upd, msj:'Exitosamente guardado' });
    res.send({ msj:'Exitosamente guardado', user });

});

module.exports = router;
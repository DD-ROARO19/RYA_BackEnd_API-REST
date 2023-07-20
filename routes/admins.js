// NO EN USO || Lo mantengo por si acaso.

// var express = require('express');
// var router = express.Router();

// const mongoose = require('mongoose');

// const admin = mongoose.model('Admin');

// /* GET users listing. */
// // >>>> Consultar todo <<<<
// router.get('/', async (req, res) => {
    
//     let ad = await admin.find();

//     if ( ad == false ) {
//         return res.status(402).send('No hay información');
//     }

//     // >>>> Envia toda la información <<<<
//     res.send({ ad });

// });

// // >>>> VV Solo consultar 1 con POST VV <<<<
// router.post('/email', async (req, res) => {
//     let ad = await admin.findOne({ email: req.body.email });

//     if ( !ad ) {
//         return res.status(402).send('No encontrado');
//     }

//     let ad_envio = {
//         cuenta: ad.cuenta,
//         email: ad.email,
//         area: ad.area,
//         estado: ad.estado
//     };
//     // >>>> Enviar información seleccionada
//     res.send({ ad_envio });

//     // >>>> Envia toda la información
//     //res.send({ ab });

// });

// // >>>> VV Borrar con POST VV <<<<
// router.post('/borrar', async (req, res) => {
//     let ad = await admin.findOne({ email: req.body.email  });

//     if ( !ad ) {
//         return res.status(402).send('Empleado no encontrado');
//     }

//     let ad_del = await admin.findOneAndDelete({ email: req.body.email });

//     res.send({ ad_del, msj:"Exitosamente borrado" });

// });

// // >>>> Insertar <<<<
// router.post('/', async (req, res) => {
//     let ad = await admin.findOne({ email: req.body.email });

//     if ( ad ) {
//         return res.status(402).send('Correo ya utilizado');
//     }

//     let adm = new admin({
//         nombre: ad.cuenta,
//         email: ad.email,
//         puesto: ad.area,
//         password: ad.password,
//         estado: true
//     });

//     await adm.save();
//     res.status(201).send({ msj:'Exitosamente guardado' });

// });

// // >>>> Modificar <<<<
// router.put('/', async (req, res) => {
//     let ad = await admin.findOne({ email: req.body.email });
    
//     if ( !ad ){ //Si no existe el empleado, detener operación.
//         return res.status(402).send('Empleado no encontrado');
//     }

//     let ad_upd = await admin.findOneAndUpdate(
//         { email:req.body.email }, //Filtro.
//         {  
//             cuenta: ad.cuenta,
//             area: ad.area,
//             password: ad.password,
//             estado: ad.estado
//         }, //Nueva información.
//         { new:true } //retorna obj viejo (false) o nuevo(true).
//     );

//     //res.send({ ad_upd, msj:'Exitosamente guardado' });
//     res.send({ msj:'Exitosamente guardado' });

// });

// module.exports = router;
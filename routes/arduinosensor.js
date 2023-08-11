const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');

const { SerialPort } = require('serialport');
const {ReadlineParser}=require('@serialport/parser-readline');
const Sensor=mongoose.model('Sensor');

const arduinoPort = "COM6";
const arduinoSerialPort = new SerialPort({path: arduinoPort,  baudRate: 9600 });

const parser = arduinoSerialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));

let valorDistancia = "";

// Manejador de eventos para datos recibidos desde el puerto serial
parser.on('data', (data) => {
    console.log("valor:", data);
    valorDistancia = data.toString('utf8');
});

// Rutas para los métodos HTTP
router.get('/', (req, res) => {
    res.send({ valorDistancia });
});

router.get('/detener', (req, res) => {
    arduinoSerialPort.pause();
    res.send("Detenido");
});

router.post('/', async (req, res) => {
    try {
        const { fecha, hora, lectura } = req.body;
        const distancia = new Sensor({
            fecha,
            hora,
            lectura
        });
        await distancia.save();
        res.status(201).send(distancia);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al guardar la lectura.");
    }
});

// Manejadores de eventos para el puerto serial
arduinoSerialPort.on('open', () => {
    console.log(`Puerto ${arduinoPort} abierto.`);
});

arduinoSerialPort.on('error', (err) => {
    console.error("Error en el puerto serial:", err);
});

module.exports = router;

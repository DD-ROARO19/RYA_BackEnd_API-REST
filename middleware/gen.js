const mongoose = require('mongoose');
const admin = mongoose.model('Abogado'); //Modelo del usuario (Abogado)
const bcrypt = require('bcrypt');

module.exports.encrypt = async function Encrypt(word) {
    let salt = await bcrypt.genSalt(10);
    let CRYPT = await bcrypt.hash(word + "", salt);
    return CRYPT;
};

// module.exports.encrypt = Encrypt;

module.exports.Seeders = async () => {
    let ad = await admin.findOne({ email: "Master@ServerDoor" });

    if (ad) {
        // console.log("Maestro ya existe."); // Comprobación de que si este corriendo la funcion.
        return;
    }

    // let salt = await bcrypt.genSalt(10);
    let pass_c = await this.encrypt('toktok');

    // Contraseña "toktok"

    let master = new admin({
        nombre: "Anon J.",
        apellido_paterno: "Quattuor",
        apellido_materno: "Green",
        telefono: "3330001111",
        puesto: "Administrador Maestro",
        oficina: "El sistema",
        email: "Master@ServerDoor",
        password: pass_c,
        estado: true,
        admin: true,
        NSS: "00000001011",
        RFC: "0000000001101",
        img: "MasterKat"
    });

    await master.save();
    console.log("Maestro Generado.");
};

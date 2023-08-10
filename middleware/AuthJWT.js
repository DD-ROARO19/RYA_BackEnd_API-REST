const jwt = require('jsonwebtoken');

function auth(req,res,next) {

    let token = req.header('Authorization');

    if(!token) {
        return res.status(401).send('Accesso denegado. Falta: Token.');
    }

    try {
        let payload = jwt.verify(token, 'SECRET-CONTRA');
        req.user = payload;
        next();
    } catch (e) {
        res.status(400).send('Accesso denegado. Token invalido.');
    }

}

module.exports = auth;
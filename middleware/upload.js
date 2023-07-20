const multer = require('multer');

const storageAvatar = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, '../IMG/perfil');
    },
    filename: function (req, res, cb) {
        let uniqueSuffix = Date.now().toString;
        cd(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
    }
});

const storageFondo = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, '../IMG/fondo');
    },
    filename: function (req, res, cb) {
        let uniqueSuffix = Date.now().toString;
        cd(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
    }
});

const uploadAvatar = multer({ storage: storageAvatar });
const uploadFondo = multer({ storage: storageFondo });

module.exports = { uploadAvatar, uploadFondo };
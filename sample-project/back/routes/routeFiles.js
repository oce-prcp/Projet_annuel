const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = require('../config/multerConfig');
const fileController = require('../controllers/controllerFile');


router.post('/upload', (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ message: 'La taille du fichier dépasse la limite de 300 Mo.' });
            }
            return res.status(500).json({ message: `Erreur Multer : ${err.message}` });
        } else if (err) {
            return res.status(500).json({ message: `Erreur : ${err.message}` });
        }
        fileController.uploadFile(req, res);
    });
});
router.get('/see/:fileId', fileController.getFile);
router.get('/details/:fileId', fileController.getFileDetails);
router.delete('/:fileId', fileController.deleteFile);
router.get('/user/:userId', fileController.getUserFiles);
router.get('/all', fileController.getAllFiles);


module.exports = router;
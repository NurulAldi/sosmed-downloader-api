const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/downloadController');
const validateUrl = require('../middlewares/validateUrl');

router.post('/', validateUrl, downloadController.handleDownload);

router.get('/file', downloadController.streamFile);

module.exports = router;
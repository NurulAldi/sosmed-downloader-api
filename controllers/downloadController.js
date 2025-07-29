const axios = require('axios');
const fetchFileMeta = require('../utils/fetchFileMeta');

exports.handleDownload = async (req, res) => {
    const { url } = req.body;

    try {
        const fileInfo = await fetchFileMeta(url);
        res.json({
            status: 'success',
            filename: fileInfo.filename,
            size: fileInfo.size,
            contentType: fileInfo.contentType
        });
    } catch (error) {
        console.error('Download error: ', error.message);
        res.status(500).json({
            status: 'error',
            message: 'Gagal mengambil data file'
        });
    }
};

exports.streamFile = async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({
            status: 'error',
            message: 'URL tidak boleh kosong'
        });
    }

    try {
        const response = await axios({
            method: 'get',
            url,
            responseType: 'stream'
        });

        const filename = url.split('/').pop().split('?')[0] || 'downloaded.file';

        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
        res.setHeader('Content-Type', response.headers['content-type']);

        response.data.pipe(res);
    } catch (err) {
        console.error('Stream error:', err.message);
        res.status(500).json({
            status: 'error',
            message: 'Gagal stream file'
        });
    }
};
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
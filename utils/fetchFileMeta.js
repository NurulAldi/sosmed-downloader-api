const axios = require('axios');

module.exports = async function fetchFileMeta(url) {
    const response = await axios.head(url);

    const contentLength = response.headers['content-length'];
    const contentType = response.headers['content-type'];
    const contentDisposition = response.headers['content-disposition'];

    let filename = 'unknown.file';
    if (contentDisposition && contentDisposition.includes('filename=')) {
        filename = contentDisposition.split('filename=')[1].replace(/["']/g, '');
    } else {
        const urlParts = url.split('/');
        filename = urlParts[urlParts.length - 1].split('?')[0];
    }

    return {
        filename,
        size: (contentLength / 1024 / 1024).toFixed(2) + ' MB',
        contentType
    };
};
module.exports = (req, res, next) => {
    const { url } = req.body;
    try {
        const parsedUrl = new URL(url);
        if (!parsedUrl.protocol.startsWith('http')) {
            throw new Error();
        }
        next();
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: 'URL tidak valid'
        });
    }
};
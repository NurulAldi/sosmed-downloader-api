require('dotenv').config();
const express = require('express');
const app = express();
const downloadRoute = require('./routes/download');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Download API is running!');
});

app.use('/api/download', downloadRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
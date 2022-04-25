const express = require('express');
const app = express();
let PORT = 3000;

app.listen(PORT, () => {
    console.log('Listening server at PORT ' + PORT);
})

app.use(express.static('src'));
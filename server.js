// SERVER, ALLOWS US TO:
// - Host files (HTML files and all of its paths along with any JS AND CSS)
// - SAVE TO DATABASE
// - AUTHENTICATION/PRIVACY, Saving delicate information (e.g API keys) here since,
//   it is not visible to the user

const express = require('express');
const app = express();
let PORT = 3000;

app.listen(PORT, () => {
    console.log('Listening server at PORT ' + PORT);
})

app.use(express.static('src'));
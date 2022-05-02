// SERVER, ALLOWS US TO:
// - Host files (HTML files and all of its paths along with any JS AND CSS)
// - SAVE TO DATABASE
// - AUTHENTICATION/PRIVACY, Saving delicate information (e.g API keys) here since,
//   it is not visible to the user
import express from 'express';
// import apiRoutes from './server/apiRoutes.js';


const app = express();
let PORT = 3000;

app.use(express.static('src'));
// app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log('Listening server at PORT ' + PORT);
})


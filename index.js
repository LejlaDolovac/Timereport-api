const express = require('express');
const mongoose = require('mongoose');


let app = express();
app.use(express.json());





// Connect to my DB 	
mongoose.connect(`mongodb+srv://LejlaDolovac:guess123@cluster0-gxwz7.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true })	
    .then(() => {	
        console.info('Connected.')	;
    })	
    .catch(err => {	
        console.error(err)	;
    });



    
    // Routs

    let postGetInformation = require('./routes/postGetInformation');

    app.route('/postGetInformation')
    .post(postGetInformation.post)
    .get(postGetInformation.get);

app.listen(3000, () => {
    console.info('Server is running: 3000.');
});

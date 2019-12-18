const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const authPassport = require('./authPassport/authRoutes');
const passportSetup = require('./passport/passportSetup');
const keys = require('./passport/keys');
const bodyParser = require('body-parser'); 

let UserInformation = require('./models/Schema');


let app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth', authPassport);




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


    app.post('/slack', async (req, res) => {

        let msg = req.body.text;
        let userName = req.body.user_name;
        let newDate = req.body.newDate;

        const data = {
            "userId": userName,
            "comment": msg,
            "time": newDate
        };
        console.log(data);

        await UserInformation.create(data);

        const message = {
            "text": "Bra jobbat! Vi registrerar detta :)",
            
        };

        res.send(message);

    });


app.listen(3000, () => {
    console.info('Server is running: 3000.');
});

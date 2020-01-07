const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const authPassport = require('./authPassport/authRoutes');
const passportSetup = require('./passport/passportSetup');
const keys = require('./passport/keys');
const bodyParser = require('body-parser'); 
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');

let UserInformation = require('./models/Schema');


let app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/auth', authPassport);


const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: 'llleyla_@hotmail.com',
      pass: 'Intepizza91'
    }
  });

const mailOptions = {
    from: 'llleyla_@hotmail.com',
    to: 'llleyla_@hotmail.com', // skapa så att den känner av vem som är inloggad
    subject: 'Timelog',
    text: 'Here are your working hours. Great job!'
};



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
        let comment = req.body.msg;

        const data = {
            "userId": userName,
            "comment": msg,
           // "time": time
        };
        console.log(data);

        await UserInformation.create(data);

        const message = {
            "text": "Bra jobbat! Vi registrerar detta :)",
            
        };

        res.send(message);

    });


    // NODEMAILER

    app.get('/mail', (req, res) =>{
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    });

  // VIEW ENGINE SETUP

  app.engine('handlebars', exphbs());
  app.set('view engine', 'handlebars');


  // BODY PARSER MIDDLEWARE








app.listen(3000, () => {
    console.info('Server is running: 3000.');
});

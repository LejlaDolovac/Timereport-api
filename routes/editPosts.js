let UserInformation = require('../models/Schema');

module.exports.post = async(req, res) => {

     try{

        console.log(req.body ,'req');

         let userData = req.body;
         let user = await UserInformation.updateOne({_id: userData._id}, {comment: userData.comment});
        // user.comment = await userData.comment.insertOne({userId: userData.comment});

         
         console.log(user, 'user');
         
         res.send('Sending request..');
     } catch (err) {
         console.log(err, 'error')
         res.status(500).send('NOT ABLE TO UPDATE USER');
     }

    

};





let UserInformation = require("../models/Schema");

module.exports.get = async (req, res) => {
  console.log("get");

  try {
    let User = await UserInformation.find({});
    res.status(200).send(User);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.post = async (req, res, err) => {
  console.log("post");
  try {
    let userData = req.body;
    let resp = await UserInformation.create(userData);
    res.status(200).send(resp);
  } catch (err) {
    res.status(400).send(err.stack, "The data wasent load");
  }
};

module.exports.getSpan = async (req, res) => {
  console.log("getSpan");

  console.log(req.body.from);

  try {
    let User = await UserInformation.find({
      date: { $gte: req.body.from, $lt: req.body.to }
    });
    res.status(200).send(User);
  } catch (err) {
    res.status(500).send(err);
  }
};

/*
i FE skapa en knapp som gör GET och hämtar datumen, på detta viset ser det ut som olika boxar... 
i BE , find({}) 
skickar du med tex date.02 som argument och på detta settet skapar du ett filter

*/

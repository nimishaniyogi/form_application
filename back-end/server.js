var express = require('express')
var app = express()
var multer = require('multer')
var crypto = require('crypto')
var mime = require('mime')
var mongoose = require('mongoose')
var formidable = require('formidable')
var http = require('http')
var User = require('./models/User');
var cors = require('cors');
var bodyPaser = require('body-parser');
var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime');
var nodemailer = require('nodemailer');
var Excel = require('exceljs');

app.use(cors())
app.use(bodyPaser.json())

app.get('/', (req, res) => {
  res.send('hello world')
});


// get all users
app.get('/userlist',(req, res) => {
   User.find({}, (err, users) =>{
console.log(users);
res.send(users);
   })
  })

//Create & Send Email Endpoint
app.post('/create', (req, res) => {
//excel sheet code
var userData = req.body;
var user = new User(userData);
console.log('i m here');
var workbook = new Excel.Workbook();
var row = [userData.name,userData.wsu,userData.phone,
userData.email,userData.Color,userData.details,userData.subscribe,userData.sign,userData.FileName];
var filePath = `${__dirname}/form.xlsx`;
      workbook.xlsx.readFile(filePath)
      .then(function() {
          var worksheet = workbook.getWorksheet('form');
          worksheet.addRow(row);
          worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
            console.log("Row " + rowNumber + " = " + JSON.stringify(row.values));
          });
          workbook.xlsx.writeFile(filePath);
      });


  var user = req.body;
  // ******************************************************************************** 
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports

      // Really BAD Basic AUTH, need to change this to OAuth
      auth: {
        user: ` ` ,// generated ethereal user
        pass: ` ` // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    // get file extension
    // setup email data with unicode symbols
    let mailOptions = {
      from: '"', // sender address
      to: '', // list of receivers
      subject: '3D print Request', // Subject line
      text: 'Hello, Following is the 3D print request', // plain text body
      html: `<b>Details of the patron :</b> 
      <h2> Name: ${user.name}</h2><br> Email: ${user.email},<br> Mywsu ID : ${user.wsu},<br> Phone: ${user.phone},<br> 
      Color of filament: ${user.Color},<br> Additional details: ${user.details}
     `, // User Data : ${JSON.stringify(user)} // html body 
      // for user email : user.email (for reference see your user model), for color: user.Color
      attachments: [{ // file on disk as an attachment; get the same name from database saved event
        filename: user.FileName,
        path: __dirname + '/upload/' + user.FileName // stream this file
      }]
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    });
  });
  // ********************************************************************************
  var userData = req.body;
  var user = new User(userData);
  user.save((err, result) => {
    if (err)
      console.log(err)
    res.sendStatus(200)
  })
})

// Form upload Endpoint
app.post('/upload/:name', function uploadAudio(req, res) {
  var fileName = req.params.name;

  // Store the files in /upload folder inside root directory
  var tmpUploadsPath = './upload'
  var storage = multer.diskStorage({
    destination: tmpUploadsPath,
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        // set filename to the passed filename in the endpoint
        cb(null, fileName);
      });
    }
  });
  var upload = multer({
    storage: storage
  }).any();

  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.end('Error');
    } else {
      // console.log(`upload-req-body:`);
      // console.log(req.body);
      req.files.forEach(function (item) {
        console.log(`upload-item:` + JSON.stringify(item));
        // move your file to destination
        // Moving file to destination End
      });
      res.end('File uploaded');
    }
  });
});
// Form upload End point End
// Create Endpoint End


//replace the datatbase connect with mongoose database link
mongoose.connect('database connect', {
  useNewUrlParser: true
}, (err) => {
  if (!err)
    console.log('connected to mongo')
})



app.listen(3000)
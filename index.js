const express = require('express')

const bodyParser = require('body-parser')
const Nexmo = require('nexmo')
const nexmo = new Nexmo({
  apiKey: '9db40488',
  apiSecret: 'yERVi6cR2IM3OCN1'
})
const app = express()
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
app.use(bodyParser.json())
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.post("/sendsms", function(req, res) {
    let fromPhone = req.body.fromPhone;
    let toPhone = req.body.toPhone;
    let content = req.body.content;
    sendSMS(fromPhone, toPhone, content, function(responseData){
        console.log(responseData);
    });
})
/**
 * Author: VNTALKING.COM
 * send SMS use Nexmo SMS Api.
 * @param {*} fromPhone the phone number which send sms
 * @param {*} toPhone the phone number which receive sms
 * @param {*} content the body of message sms
 * @param {*} callback after send sms
 */
function sendSMS(fromPhone, toPhone , content, callback){
    nexmo.message.sendSms(fromPhone, toPhone, content, {
        type: "unicode"
      }, (err, responseData) => {
        if (err) {
          console.log(err);
        } else {
          if (responseData.messages[0]['status'] === "0") {
            callback("Message sent successfully.")
          } else {
            callback(`Message failed with error: ${responseData.messages[0]['error-text']}`);
          }
        }
      })
}

app.listen(3000, () => {
    console.log('server is running http://localhost:3000')
})
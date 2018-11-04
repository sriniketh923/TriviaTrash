const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const twilio = require('twilio');

const accountSid = '';
const authToken = ''
const client = new twilio(accountSid, authToken);

let MessageSchema = new mongoose.Schema({
  phoneNumber: String,
  userName: String,
  question1: String,
  question2: String,
  question3: String,
  question4: String,
  question5: String,
  score: Number,
  torf1: String,
  torf2: String,
  torf3: String,
  torf4: String,
  torf5: String,
  torf6: String,
  torf7: String
})

let Message = mongoose.model('Message', MessageSchema);

let QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String
}, {collection: 'triviaquestions'})

let Question = mongoose.model('Question', QuestionSchema);

app.use(bodyParser.urlencoded({extended: false}))
mongoose.connect('', {useNewUrlParser: true}).then(() => {
  console.log('db connected')
})

app.get('/', (req, res) => {
  res.end();
})

app.post('/inbound', (req, res) => {
  let from = req.body.From;
  let to = req.body.To;
  let body = req.body.Body;

  Message.find({phoneNumber: req.body.From}, (err , message) => {
    if(message.lenght !== 0) {
      if(body ==='Play') {
        let newMessage = new Message();
        newMessage.phoneNumber = from;
        newMessage.score = 0;
        newMessage.torf1 = 'f';
        newMessage.torf2 = 'f';
        newMessage.torf3 = 'f';
        newMessage.torf4 = 'f';
        newMessage.torf5 = 'f';
        newMessage.torf6 = 'f';
        newMessage.torf7 = 'f';
        newMessage.save(() => {
          client.messages.create({
            to: '',
            from: '',
            body: 'What is your name?'
          }).then(message => console.log(message.sid)).done();
          res.end();
        })
      } else if(!message[0].userName) {
        Message.findByIdAndUpdate(message[0]._id, {"$set": {"userName": body}}, {"new": true, "upsert": true}, () => {
          Question.find({}, (error, question) => {
            q = question[0].question;
            a = 'A) ' + question[0].options[0];
            b = 'B) ' + question[0].options[1];
            c = 'C) ' + question[0].options[2];
            client.messages.create({
              to: '',
              from: '',
              body: q + '\n' + a + '\n' + b + '\n' + c
            }).then(message => console.log(question.sid)).done();
            console.log('ERROR q and o: ' + error);
          })
        })
      } else if (message[0].torf1 == 'f') {
        Message.findByIdAndUpdate(message[0]._id, {"$set": {"torf1": "t"}}, {"new": true, "upsert": true}, () => {
          Question.find({}, (error, question) => {
            a = question[0].answer;
            if(a === body) {
              Message.findByIdAndUpdate(message[0]._id, {"$set": {"score": message[0].score + 1}}, {"new": true, "upsert": true}, () => {

              })
              console.log('Score: ' + message[0].score);
              q = question[1].question;
              a = 'A) ' + question[1].options[0];
              b = 'B) ' + question[1].options[1];
              c = 'C) ' + question[1].options[2];
              client.messages.create({
                to: '',
                from: '',
                body: 'Right Answer!!' + '\n' + '\n' + q + '\n' + a + '\n' + b + '\n' + c
              }).then(message => console.log(question.sid)).done();
            } else {
              q = question[1].question;
              a = 'A) ' + question[1].options[0];
              b = 'B) ' + question[1].options[1];
              c = 'C) ' + question[1].options[2];
              client.messages.create({
                to: '',
                from: '',
                body: 'Sorry, you are wrong!' + '\n' + '\n' + q + '\n' + a + '\n' + b + '\n' + c
              }).then(message => console.log(question.sid)).done();
            }
            console.log('ERROR q and o: ' + error);
          })
        })
      } else if(message[0].torf2 == 'f') {
        Message.findByIdAndUpdate(message[0]._id, {"$set": {"torf2": "t"}}, {"new": true, "upsert": true}, () => {
          Question.find({}, (error, question) => {
            a = question[1].answer;
            if(a === body) {
              Message.findByIdAndUpdate(message[0]._id, {"$set": {"score": message[0].score + 1}}, {"new": true, "upsert": true}, () => {
              })
              q = question[2].question;
              a = 'A) ' + question[2].options[0];
              b = 'B) ' + question[2].options[1];
              c = 'C) ' + question[2].options[2];
              client.messages.create({
                to: '',
                from: '',
                body: 'Right Answer!!' + '\n' + '\n' + q + '\n' + a + '\n' + b + '\n' + c
              }).then(message => console.log(question.sid)).done();
            } else {
              q = question[2].question;
              a = 'A) ' + question[2].options[0];
              b = 'B) ' + question[2].options[1];
              c = 'C) ' + question[2].options[2];
              client.messages.create({
                to: '',
                from: '',
                body: 'Sorry, you are wrong!' + '\n' + '\n' + q + '\n' + a + '\n' + b + '\n' + c
              }).then(message => console.log(question.sid)).done();
            }
            console.log('ERROR q and o: ' + error);
          })
        })
      } else if(message[0].torf3 == 'f') {
      Message.findByIdAndUpdate(message[0]._id, {"$set": {"torf3": "t"}}, {"new": true, "upsert": true}, () => {
        Question.find({}, (error, question) => {
          a = question[2].answer;
          if(a === body) {
            Message.findByIdAndUpdate(message[0]._id, {"$set": {"score": message[0].score + 1}}, {"new": true, "upsert": true}, () => {
            })
            console.log('Score: ' + message[0].score);
            q = question[3].question;
            a = 'A) ' + question[3].options[0];
            b = 'B) ' + question[3].options[1];
            c = 'C) ' + question[3].options[2];
            client.messages.create({
              to: '',
              from: '',
              body: 'Right Answer!!' + '\n' + '\n' + q + '\n' + a + '\n' + b + '\n' + c
            }).then(message => console.log(question.sid)).done();
          } else {
            q = question[3].question;
            a = 'A) ' + question[3].options[0];
            b = 'B) ' + question[3].options[1];
            c = 'C) ' + question[3].options[2];
            client.messages.create({
              to: '',
              from: '',
              body: 'Sorry, you are wrong!' + '\n' + '\n' + q + '\n' + a + '\n' + b + '\n' + c
            }).then(message => console.log(question.sid)).done();
          }
          console.log('ERROR q and o: ' + error);
        })
      })
    } else if(message[0].torf4 == 'f') {
      Message.findByIdAndUpdate(message[0]._id, {"$set": {"torf4": "t"}}, {"new": true, "upsert": true}, () => {
        Question.find({}, (error, question) => {
          a = question[3].answer;
          if(a === body) {
            Message.findByIdAndUpdate(message[0]._id, {"$set": {"score": message[0].score + 1}}, {"new": true, "upsert": true}, () => {

            })
            console.log('Score: ' + message[0].score);
            q = question[4].question;
            a = 'A) ' + question[4].options[0];
            b = 'B) ' + question[4].options[1];
            c = 'C) ' + question[4].options[2];
            client.messages.create({
              to: '',
              from: '',
              body: 'Right Answer!!' + '\n' + '\n' + q + '\n' + a + '\n' + b + '\n' + c
            }).then(message => console.log(question.sid)).done();
          } else {
            q = question[4].question;
            a = 'A) ' + question[4].options[0];
            b = 'B) ' + question[4].options[1];
            c = 'C) ' + question[4].options[2];
            client.messages.create({
              to: '',
              from: '',
              body: 'Sorry, you are wrong!' + '\n' + '\n' + q + '\n' + a + '\n' + b + '\n' + c
            }).then(message => console.log(question.sid)).done();
          }
          console.log('ERROR q and o: ' + error);
        })
      })
    } else if(message[0].torf5 == 'f') {
      Message.findByIdAndUpdate(message[0]._id, {"$set": {"torf5": "t"}}, {"new": true, "upsert": true}, () => {
        Question.find({}, (error, question) => {
          a = question[4].answer;
          if(a === body) {
            Message.findByIdAndUpdate(message[0]._id, {"$set": {"score": message[0].score + 1}}, {"new": true, "upsert": true}, () => {

            })
            console.log('Score: ' + message[0].score);
            q = question[5].question;
            a = 'A) ' + question[5].options[0];
            b = 'B) ' + question[5].options[1];
            c = 'C) ' + question[5].options[2];
            client.messages.create({
              to: '',
              from: '',
              body: 'Right Answer!!' + '\n' + '\n' + q + '\n' + a + '\n' + b + '\n' + c
            }).then(message => console.log(question.sid)).done();
          } else {
            q = question[5].question;
            a = 'A) ' + question[5].options[0];
            b = 'B) ' + question[5].options[1];
            c = 'C) ' + question[5].options[2];
            client.messages.create({
              to: '',
              from: '',
              body: 'Sorry, you are wrong!' + '\n' + '\n' + q + '\n' + a + '\n' + b + '\n' + c
            }).then(message => console.log(question.sid)).done();
          }
          console.log('ERROR q and o: ' + error);
        })
      })
    } else if(message[0].torf6 == 'f') {
      Message.findByIdAndUpdate(message[0]._id, {"$set": {"torf6": "t"}}, {"new": true, "upsert": true}, () => {
        Question.find({}, (error, question) => {
          a = question[5].answer;
          if(a === body) {
            Message.findByIdAndUpdate(message[0]._id, {"$set": {"score": message[0].score + 1}}, {"new": true, "upsert": true}, () => {

            })
            console.log('Score: ' + message[0].score);
            q = question[6].question;
            a = 'A) ' + question[6].options[0];
            b = 'B) ' + question[6].options[1];
            c = 'C) ' + question[6].options[2];
            client.messages.create({
              to: '',
              from: '',
              body: 'Right Answer!!' + '\n' + '\n' + q + '\n' + a + '\n' + b + '\n' + c
            }).then(message => console.log(question.sid)).done();
          } else {
            q = question[6].question;
            a = 'A) ' + question[6].options[0];
            b = 'B) ' + question[6].options[1];
            c = 'C) ' + question[6].options[2];
            client.messages.create({
              to: '',
              from: '',
              body: 'Sorry, you are wrong!' + '\n' + '\n' + q + '\n' + a + '\n' + b + '\n' + c
            }).then(message => console.log(question.sid)).done();
          }
          console.log('ERROR q and o: ' + error);
        })
      })
    } else if(message[0].torf6 == 't'){
      Question.find({}, (error, question) => {
        a = question[6].answer;
        if(a === body) {
          Message.findByIdAndUpdate(message[0]._id, {"$set": {"score": message[0].score + 1}}, {"new": true, "upsert": true}, () => {

          })
          console.log('Score: ' + message[0].score);
          client.messages.create({
            to: '',
            from: '',
            body: 'Right Answer!!' + '\n' + '\n' + "Total Score: " + message[0].score
          }).then(message => console.log(question.sid)).done();
        } else {
          client.messages.create({
            to: '',
            from: '',
            body: 'Sorry, you are wrong!' + '\n' + '\n' + "Total Score: " + message[0].score
          }).then(message => console.log(question.sid)).done();
        }
        console.log('ERROR q and o: ' + error);
      })
    } else {
      client.messages.create({
        to: '',
        from: '',
        body: 'Text \'Play\' to play'
    })
  }
}
    console.log('ERROR outside: ' + err);
    res.end();
  })
})

 app.listen(3000, () => {
   console.log('server connected');
 })

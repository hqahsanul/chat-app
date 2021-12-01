const express = require('express')
const app = express()
const http = require('http').createServer(app)
const ejs=require('ejs')
const mongoose=require('mongoose')

const PORT =3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))
app.set("view engine","ejs");


mongoose.connect("mongodb://localhost:27017/chatDB", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    name: String,
    message: String,
    created: {type: Date, default: Date.now}
   
  });

  const User = new mongoose.model("User", userSchema);


app.get('/', (req, res) => {
    res.render('chat')
})

               // Socket Io
               
const io = require('socket.io')(http)

io.on('connection', (socket) => {
   console.log('Connected...'+ socket.id)
    
   socket.on('message', (msg) => {  
        socket.broadcast.emit('message', msg)
        console.log(msg)

        const newUser = new User({
            name: msg.user,
            message: msg.message,
          });
          newUser.save();

       
    })

})
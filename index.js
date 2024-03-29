const express = require('express')
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require("./models/Users")

const app = express()

app.use(cors(
    {
        origin: ["https://login-backend-mongo.vercel.app"],
        methods: ["POST", "GET", "DELETE", "PUT", "PATCH", "OPTIONS"],
        crendentials: true
    }
))

app.use(express.json())

app.listen(3001, () =>{
    console.log("Server is running")
})


const connectDB = async () =>{
    try{
        await mongoose.connect("mongodb+srv://lipheria:samurott@cluster0.bbpwnrj.mongodb.net/plantidb?retryWrites=true&w=majority")
        console.log("Connected")
    }catch(error){
        console.log("No connect")
    }
}

connectDB()

//Database Connection
//mongoose.connect("mongodb+srv://lipheria:samurott@cluster0.bbpwnrj.mongodb.net/plantidb?retryWrites=true&w=majority")

app.post("/createUser", (req, res) =>{
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get("/", (req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/getUser/:id',(req,res) =>{
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put('/updateUser/:id', (req,res) =>{
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id}, {
    name:req.body.name, 
    email: req.body.email, 
    age:req.body.age })
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.delete('/deleteUser/:id', (req, res) =>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(res=>res.json(res))
    .catch(err => res.json(err))
})

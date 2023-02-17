const express=require('express')
const cors = require('cors')
const ds= require('./dataservice')


const app=express()
app.use(express.json())


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin:'http://localhost:4200'
}))

app.post('/register',(req,res)=>{
    return ds.register(req.body.studentname,req.body.age,req.body.coursename,req.body.coursecompletionyear)
    .then(user=>{
        if(user){
            res.status(user.statuscode).json(user)
        }
    })
    
})

app.get('/studentdetails',(req,res)=>{
    return ds.studentdetials()
    .then(user=>{
        if(user){
            res.status(user.statuscode).json(user)
        }
    })
})

app.delete('/deletestudent/:_id',(req,res)=>{
    return ds.deletestudent(req.params._id)
    .then(result=>{
        if(result){
            res.status(result.statuscode).json(result)
        }
    })
})


app.post("/updatestudent",(req,res)=>{
    return ds.updatestudent(req.body.studentname,req.body.newstudentname,req.body.newage,req.body.newcoursename,req.body.newcoursecompletionyear)
    .then(result=>{
        if(result){
            res.status(result.statuscode).json(result)
        }
    })

})






app.listen(3000,()=>{
    console.log("Server listening to port number 3000")
})
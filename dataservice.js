const db = require('./db')


const register = (studentname,age,coursename,coursecompletionyear)=>{
    return db.Student.findOne({studentname,age})
    .then(user=>{
        if(user){
            return{
                statuscode:400,
                status:false,
                message:"student already exists"
            }
        }
        else{
            const newstudent = new db.Student({
                "studentname":studentname,
                "age":age,
                "coursename":coursename,
                "coursecompletionyear":coursecompletionyear

            }) 
            newstudent.save()
            return{
                statuscode:200,
                status:true,
                message:"new student added succesfully"
            }
        }
    })
}

const studentdetials  = ()=>{
    return db.Student.find()
    .then(result=>{
        if(result){
            return{
                statuscode:200,
                status:true,
                result:result
            }
        }
    })
}

const deletestudent = (_id)=>{
    return db.Student.deleteOne({_id})
    .then(user=>{
        if(!user){
            return{
              statuscode:400,
              status:false,
              message:"operation failed"
            }
          }
          else{
            return{
              statuscode:200,
              status:true,
              message:`student data is successfully deleted`
            }
          }
    })
}

const updatestudent=(studentname,newstudentname,newage,newcoursename,newcoursecompletionyear)=>{
    return db.Student.findOne({studentname})
    .then(result=>{
        if(result){
            result.studentname=newstudentname
            result.age=newage
            result.coursename=newcoursename
            result.coursecompletionyear=newcoursecompletionyear
            result.save()
            return{
                statuscode:200,
                status:true,
                result,
                message:"updated successfully",

            } 
        }
        else{
            return{
                statuscode:400,
                status:false,
                message:"cannot update"
            }
        }
    })



}

module.exports={register,studentdetials,deletestudent,updatestudent}
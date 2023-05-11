import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

//REGISTER

router.post("/register", async(req,res)=>{
const {username,password} =req.body;

const user = await UserModel.findOne({username:username});
if(user){
    console.log("Already exists");
    return res.json({message:"Username already exists!"});
    
}

//the number => how many times hashing is done
const hashedPassword = await bcrypt.hash(password,10);

const newUser=new UserModel({
    username:username,
    password:hashedPassword
});
//to add to database
await newUser.save();

// Was to check
// res.json(user);

res.json({message:"Registered Successfully"});
console.log(newUser);
});


// LOGIN

router.post("/login",async (req,res)=>{

    const { username,password }=req.body;

    const user = await UserModel.findOne({username:username});

    if(!user)
    {
        console.log("User doesn't exist");
        return res.json({message:"User doesn't exist"});
    }

    const isPasswordValid=await bcrypt.compare(password,user.password);

    if(!isPasswordValid)
    {
        return res.json({message:"Username or password is incorrect"});
    }

    //the second parameter of the jwt.sign() function is the "secret" key used to sign the JSON Web Token (JWT).
    const token=jwt.sign({id:user._id},"secret");
    res.json({token,userID:user._id});

});

export {router as userRouter};

export const verifyToken=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        jwt.verify(token,"secret",(err)=>{
            if(err)
                return res.sendStatus(403);
            next();
        });
    }
    else{
        res.sendStatus(401);
    }
};

// Common status codes that can be passed to the res.sendStatus() method:

// 200: OK
// 201: Created
// 204: No Content
// 400: Bad Request
// 401: Unauthorized
// 403: Forbidden
// 404: Not Found
// 500: Internal Server Error
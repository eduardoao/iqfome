import {Router} from 'express';
import { sample_users } from '../data';

import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';

import jwt from 'jsonwebtoken';

const router = Router();


router.get("/seed", asyncHandler(
  async (req, res) => {
     const usersCount = await UserModel.countDocuments();
     if(usersCount> 0){
       res.send("Seed is already done!");
       return;
     }

     await UserModel.create(sample_users);
     res.send("Seed users ss Done!");
 }
 ))

 router.post("/login", asyncHandler(
  async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email , password});

     if(user) {
      res.send(generateTokenReponse(user));
     }
     else{
       const BAD_REQUEST = 400;
       res.status(BAD_REQUEST).send("Username or password is invalid!");
     }

  }
))

  function generateTokenReponse(user: any): any {
    const token = jwt.sign(
        {email:user.email, isAdmin:user.isAdmin}, 
        "SomeRandonText", 
        {expiresIn:"10d"});    
    
        user.token = token;
    return user;    
  }

  export default router; 
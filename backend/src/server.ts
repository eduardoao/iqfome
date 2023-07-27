import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import { sample_foods, sample_tags, sample_users } from './data';

const app = express();

app.use(express.json());

app.use(cors({
    credentials:true,
    origin:['http://localhost:4200', 'https://iqfome.onrender.com']
}));

app.get('/api/foods', (req, res) => {   
    console.log(sample_foods) ;
    res.send(sample_foods);
});

app.get('/api/foods/search/:searchTerm', (req, res) => {
    const searchTerm = req.params.searchTerm;
    const foods = sample_foods
    .filter(food => food.name.toLowerCase()
    .includes(searchTerm.toLowerCase()));

    console.log(foods) ;

    res.send(foods);    
});

app.get('/api/foods/tags', (req, res) =>{

    res.send(sample_tags);
});

app.get('/api/foods/tag/:tagName', (req, res) =>{
    const tagName = req.params.tagName;
    const foods = sample_foods.filter(food => food.tags?.includes(tagName));

    res.send(foods);
});

app.get('/api/foods/:foodId', (req, res) =>{
    const foodId = req.params.foodId;
    const food = sample_foods.find(food => food.id == foodId);
    res.send(food);
});

app.post("/api/users/login", (req, res) => {
    const {email, password} = req.body;
    let user = sample_users.find(user => user.email === email 
      && user.password === password);
      
  
     if(user) {
      res.send(generateTokenReponse(user));
     }
     else{
       const BAD_REQUEST = 400;
       res.status(BAD_REQUEST).send("Usuário ou senha inválido(s)!");
     }
  
  })

  function generateTokenReponse(user: any): any {
    const token = jwt.sign(
        {email:user.email, isAdmin:user.isAdmin}, 
        "SomeRandonText", 
        {expiresIn:"10d"});    
    
        user.token = token;
    return user;    
  }


const PORT = 5000;

app.listen(PORT, ()=>{ 
    console.log('Serve is online on http://localhost:' + PORT);
});





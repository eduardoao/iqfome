import express from 'express';
import cors from 'cors';
import { sample_foods } from './data';
import { servicesVersion } from 'typescript';

const app = express();

app.use(cors({
    credentials:true,
    origin:['http://localhost:4200']
}));

app.get('/api/foods', (req, res) => {
    res.send(sample_foods);
});

app.get('/api/foods/search/:searchTerm', (req, res) => {
    const searchTerm = req.params.searchTerm;
    const foods = sample_foods
    .filter(food => food.name.toLowerCase()
    .includes(searchTerm.toLowerCase()));

    res.send(foods);
    
});

const PORT = 5000;

app.listen(PORT, ()=>{ 
    console.log('Serve is online on http://localhost:' + PORT);
});




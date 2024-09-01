const Joi = require('joi');
const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());

const courses = [
    {id:1,name:'course1'},
    {id:2,name:'course3'},
    {id:3,name:'course3'},
]
app.get('/',(req,res)=>{
    res.send('HI');
});

app.get('/api/courses/:courseid',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send("The course with the given ID not exist")
})


app.post('/api/courses',(req,res)=>{
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length +1 ,
        name:req.body.name,
    }
    courses.push(course);
    res.send(course);
})


app.put('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('Not exist');

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course)
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
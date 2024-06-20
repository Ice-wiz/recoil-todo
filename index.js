// const express = require('express');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const cors = require('cors');


// const app = express();
// const port = 5000;
// const secret = "hii";

// app.use(express.json());
// app.use(cors());


// mongoose.connect('mongodb+srv://aryan:aryan@cluster0.hyfk2ii.mongodb.net/', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log("connected to mongodb");
// }).catch(err => {
//   console.error("error connecting to mongodb", err);
// });


// const UserSchema = new mongoose.Schema({
//     username:String,
//     password:String,
// })

// const TodoSchema = new mongoose.Schema({
//     userId : mongoose.Schema.Types.ObjectId,
//     title : String,
//     description : String,
//     isDone:Boolean
// })

// const User = mongoose.model('User',UserSchema);
// const Todo = mongoose.model('Todo',TodoSchema);


// const auth = (res,req,next)=>{
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(403).send('access denied');
//     }

//     const token = authHeader.split(' ')[1];

//     try{
//         const decoded = jwt.verify(token,secret);
//         req.userId=decoded.userId;
//         next();
//     }catch(err){
//         res.status(403).send('invaild token');
//     }
// }

// app.post('/register',auth,async(res,req)=>{
//     const {username,password}=req.body;
//     try{
//         const user = await User.findOne({username});
//         if(user){
//             res.status(401).send("email already taken")
//         }
//     }catch(err){
//         res.status(401).send('bad req')
//     }
//     const hashedPassword = await bcrypt.hash(password,10);
//     const user = new User({username,password:hashedPassword});
//     user.save();

//     res.send('User registered easily')
// })

// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
  
//     const user = await User.findOne({ username });
//     if (!user) return res.status(400).send('Invalid username or password.');
  
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) return res.status(400).send('Invalid username or password.');
  
//     const token = jwt.sign({ _id: user._id }, SECRET_KEY);
//     res.send({ token });
//   });
  
//   app.post('/todos', auth, async (req, res) => {
//     const { title, description, isDone } = req.body;
//     const todo = new Todo({
//       userId: req.user._id,
//       title,
//       description,
//       isDone,
//     });
//     await todo.save();
//     res.send(todo);
//   });
  
//   app.get('/todos', auth, async (req, res) => {
//     const todos = await Todo.find({ userId: req.user._id });
//     res.send(todos);
//   });
  
//   app.put('/todos/:id', auth, async (req, res) => {
//     const { id } = req.params;
//     const { title, description, isDone } = req.body;
  
//     const todo = await Todo.findOneAndUpdate(
//       { _id: id, userId: req.user._id },
//       { title, description, isDone },
//       { new: true }
//     );
  
//     if (!todo) return res.status(404).send('Todo not found.');
  
//     res.send(todo);
//   });
  
//   app.delete('/todos/:id', auth, async (req, res) => {
//     const { id } = req.params;
  
//     const todo = await Todo.findOneAndDelete({ _id: id, userId: req.user._id });
  
//     if (!todo) return res.status(404).send('Todo not found.');
  
//     res.send(todo);
//   });
  
//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });

const express = require('express')
const cors = require("cors")

const app = express();
const { v4: uuidv4 } = require('uuid');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());


const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const dummyToken = "Bearer hello";

  if (!authHeader || authHeader !== dummyToken) {
    return res.status(403).send('Access denied'); 
  }

  req.userId = uuidv4(); 

  next();
}

module.exports = auth;


const todos = [
    {
        title: 'Buy groceries',
        description: 'Milk, Bread, Butter, Eggs'
    },
    {
        title: 'Complete project',
        description: 'Finish the coding task for the project by Friday Finish the coding task for the project by Friday Finish the coding task for the project by Friday Finish the coding task for the project by Friday Finish the coding task for the project by Friday Finish the coding task for the project by Friday Finish the coding task for the project by Friday Finish the coding task for the project by Friday'
    },
    {
        title: 'Call the plumber',
        description: 'Fix the kitchen sink'
    },
    {
        title: 'Prepare presentation',
        description: 'Create slides for the Monday meeting'
    },
    {

        title: 'Workout',
        description: 'Go for a 30-minute run'
    },
    {
        title: 'Workout in gym ',
        description: 'Go to gym to workout'
    }
];


app.get('/todos', auth , (req, res) => {
    res.json({
        userId: req.userId,
        todos: todos
      }); 
});

app.listen(3000,()=>{
    console.log(`Listening to port 3000`)
})





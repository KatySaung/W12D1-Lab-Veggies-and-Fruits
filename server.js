require("dotenv").config( );
const express = require('express');
const app = express( );
const PORT = process.env.PORT || 3000;
// imported fruits and vegetables
const Fruit = require("./models/fruit");
const Vegetable = require("./models/vegetable");
const mongoose = require("mongoose");



////Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", ( ) =>{
  console.log("connected to mongo");
});
/////////////////////////////////

const jsxViewEngine = require('jsx-view-engine');

//  line 10 :app.set('view engine', 'jsx') is one line of code that make app able to use jsx engine
app.set('view engine', 'jsx')
app.set("views", './views');

/* line 14:app.engine('jsx', jsxViewEngine( )); 
Only need to invoke jsxEngine. This will be 2nd line of code that make app able to use jsx engine */
app.engine('jsx', jsxViewEngine( )); 

// Middleware
// Middleware commonly used for authorization and res with an immediate 401. Middleware is parsing incoming requests at the req object. It runs between req and res
app.use((req, res, next) => {
  console.log('Middleware: I run for all routes, 1');
  next( );
});

// the urlencoded creates the access to the req.body in Post Route.
// running a function that returns a callback
app.use(express.urlencoded( {extended: false} ) ) 

// const middleware = (req, res, next) =>{
//   console.log('Middleware: on the const' variable);
//   next( );
// };

  // Index Route
  // Part2: MongoDB 

  app.get('/fruits', async (req, res) => {
    try {

      // leaving find object empty to find all objects. If need to filter search than need to put something there.
      const foundFruits = await Fruit.find({ })
      res.status(200).render('fruits/Index', {
        fruits: foundFruits,
      });
    } catch (err) {
      res.status(400).send(err)
    }
  });
  

  app.get('/vegetables', async (req, res) => {
    try {
      // leave object field empty b/c want to find all veggies
      const foundVegetables = await Vegetable.find({ })
      res.status(200).render('vegetables/Index', {
        vegetables:foundVegetables,
      });
    } catch (err){
      res.status(400).send(err)
    }
  });

// New Route
// Part 2:MongoDB
app.get("/fruits/new", (req,res) => {
  console.log('New controller');
  res.render("Fruits/New");
})

app.get("/vegetables/new", (req,res) => {
  console.log('New controller');
  res.render("Vegetables/New");
})
// Delete Route



// Update Route



// Create Route
// Part 2: MongoDB
app.post("/fruits", async (req, res)=> {
  try {
    req.body.readyToEat = req.body.readyToEat === "on"; 
    const createdFruit = await Fruit.create(req.body )
    res.status(201).send(createdFruit);
  }   catch (err){
    res.status(400).send(err)   //send back the 400 error that we catched   
  }
  res.redirect('/fruits');
});


app.post("/vegetables", async (req, res)=> {
  try {
    req.body.readyToEat = req.body.readyToEat === "on"; 
    const createdVegetable = await Vegetable.create(req.body)
    res.status(201).send(createdVegetable);
  } catch(err) {
    res.status(400).send(err)
  } 
  res.redirect('/vegetables');
});

// Edit Route



  //Show Route
  // Part2: MongoDB
  
  app.get('/fruits/:id', async (req, res) => {
    try {
      const foundFruit = await Fruit.findById(req.params.id)
      res.render('fruits/Show', {
        fruit: foundFruit
      });
    }catch(err){
      res.status(400).send(err)
    }
  });


  app.get('/vegetables/:id', async (req, res) => {
    try {
      const foundVegetable = await Vegetable.findById(req.params.id)
      res.render("vegetables/Show", {
        vegetable:foundVegetable
      });
    } catch (err){
      res.status(400).send(err)
    }
  });


  app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
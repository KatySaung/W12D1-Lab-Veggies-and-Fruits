require("dotenv").config( );
const express = require('express');
const app = express( );
const PORT = process.env.PORT || 3000;
// imported fruits and vegetables
const Fruit = require("./models/fruit");
const Vegetable = require("./models/vegetable");
const mongoose = require("mongoose");
const methodOverride = require('method-override');


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

//  app.set('view engine', 'jsx') is one line of code that make app able to use jsx engine
app.set('view engine', 'jsx')
app.set("views", './views');

/* app.engine('jsx', jsxViewEngine( )); 
Only need to invoke jsxEngine. This will be 2nd line of code that make app able to use jsx engine */
app.engine('jsx', jsxViewEngine( )); 


// CSS from Public folder.
// Need to go before any routes
// Grouped with app.use stuff
app.use(express.static("public"));


// Middleware
// Middleware commonly used for authorization and res with an immediate 401. Middleware is parsing incoming requests at the req object. It runs between req and res
app.use((req, res, next) => {
  console.log('Middleware: I run for all routes, 1');
  next( );
});


//use methodOverride to delete forms(only work with npm i method-override)
// This is the query parameter to our delete form named _method. 
// running callback function for the delete route
app.use(methodOverride('_method'));

// the urlencoded creates the access to the req.body in Post Route.
// running a function that returns a callback
app.use(express.urlencoded( {extended: false} ) ) 

// const middleware = (req, res, next) =>{
//   console.log('Middleware: on the const' variable);
//   next( );
// };


// Seed Route
// Generally used at development or testing. Will populate into the fruits index page
// DO NOT HAVE THIS IN DEPLOYMENT APP
app.get('/fruits/seed', async (req,res) => {
  try {
    await Fruit.create([
        {
          name:'grapefruit',
          color:'pink',
          readyToEat:true
      },
      {
          name:'grape',
          color:'purple',
          readyToEat:false
      },
      {
          name:'avocado',
          color:'green',
          readyToEat:true
      }
    ]);
    res.redirect('/fruits');
  }catch(err) {
    res.status(400).send(err);
  }
})


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
// Try & catch will implement delete function in database
// We are using req params id from our line 98 that does not have underscore. 
// It is the MongoDB that attaches an underscore to the id.
app.delete("/fruits/:id", async (req, res) => {
  try {
    // this id is from the req params (:id)
    // By good practice use the findByIDAndDelete instead of findByIDAndRemove
    await Fruit.findByIdAndDelete(req.params.id);
    res.status(200 ).redirect('/fruits' );
  } catch (err) {
    res.status(400).send(err);
  }
} )

// Originally in the Delete Route-we had this originally to test that the route worked. Need to remove this or else will have error on sending 2 requests to the client, will crash.
// res.send('deleting...'):



// Update Route
app.put('/fruits/:id', async (req, res) => {
  try {
    // the if statement is confirming if readyToEat was checked in the Edit.jsx
    if (req.body.readyToEat === 'on') {
      req.body.readyToEat = true;
    }
    else{
      req.body.readyToEat = false;
    }
    const updatedFruit = await Fruit.findByIdAndUpdate(
      // id is fromt the url that we got by clicking on the edit <a/>...
      req.params.id,
      // the information from the form, witht he update that we made...
      req.body, 
      // need this to prevent a delay in the update
      {new: true})

      // Callback function with the redirect for the update
      res.redirect(`/fruits/${req.params.id}`);
  } catch (err) {
    res.status(400).send(err);
  }

});


// Create Route
// Part 2: MongoDB
app.post("/fruits", async (req, res)=> {
  try {
    req.body.readyToEat = req.body.readyToEat === "on"; 
    const createdFruit = await Fruit.create(req.body)
    res.status(201).redirect('/fruits');
  }   catch (err){
    res.status(400).send(err)   //send back the 400 error that we catched   
  }
});


app.post("/vegetables", async (req, res)=> {
  try {
    req.body.readyToEat = req.body.readyToEat === "on"; 
    const createdVegetable = await Vegetable.create(req.body)
    res.status(201).redirect('/vegetables');
  } catch(err) {
    res.status(400).send(err)
  } 
});

// Edit Route
app.get( '/fruits/:id/edit', async(req, res) => {
  try {
    // find the document in MongoDB database and update
    const foundFruit = await Fruit.findById(req.params.id);
    res.render('fruits/Edit',{
      fruit: foundFruit 
  })
  }catch(err){
  res.send(400).send(err);
  }
})


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


  app.listen(PORT, ( ) => {
    console.log(`Listening on port: $(PORT)`);
  });
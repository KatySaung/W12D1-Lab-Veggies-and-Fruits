const express = require('express');
const app = express( );
const PORT = process.env.PORT || 3000;
// imported fruits 
const fruits = require("./models/fruits")
const vegetables = require("./models/vegetables")
const jsxViewEngine = require('jsx-view-engine');

/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////NEED TO STILL CREATE GITHUB REPO!(Multiple parts to assignment/////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

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
  app.get('/fruits', (req, res) => {
    console.log('Index controller');
    res.render("fruits/Index", { fruits });
  });
  
  app.get('/vegetables', (req, res) => {
    res.render("vegetables/Index", {vegetables});
  });

// New Route
// in app.get, the path needs to be in lowercase.
// in res.render, New needs to be capitalized b/c referencing a file
app.get("/fruits/new", (req,res) => {
  console.log('New controller');
  res.render("fruits/New");
})

// Delete Route



// Update Route



// Create Route
app.post("/fruits", (req, res)=> {
//   if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
//     req.body.readyToEat = true; //do some data correction
// } else { //if not checked, req.body.readyToEat is undefined
//     req.body.readyToEat = false; //do some data correction
// }

// below condition does not need an if statement because it will already return a true or false. b/c this expression itself will always take the truth or false value and set it equal to eat. Ex this expression("off"==="on") will console log to true.
req.body.readyToEat = req.body.readyToEat === "on"; 
fruits.push(req.body);
console.log(fruits);
  // sent from client, will be in the request object of body in this function
  // console.log('Create Controller');
  // we can access req.body because of the middleware creating req object.So can now see the console log in VS for req.body
  // console.log(req.body)

  // we are redirecting the user back to the fruits index page to let user know their submitted form works.
  res.redirect('/fruits');
});


// Edit Route



  //Show Route
  /* fruit singular because show route only show 1
   user id  in req.params.id to access fruits array
   second param of the render method must be an object. The res.render for Show gives rendering so fruits.js can be imported from models folder.*/
  app.get('/fruits/:id', (req, res) => {
    res.render('fruits/Show', {
      // this is passing the props on the server.js side.(server side rendering)Now go to veiws folder react Show.jsx to access props
       //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitsArray]   
      fruit: fruits[req.params.id]
    });
  });

  app.get('/vegetables/:id', (req, res) => {
    res.render("vegetables/Show", {
      vegetable:vegetables[req.params.id]
    });
  });


  app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
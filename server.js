const express = require('express');
const app = express( );
const PORT = process.env.PORT || 3000;
// imported fruits 
const fruits = require("./models/fruits")
const vegetables = require("./models/vegetables")
const jsxViewEngine = require('jsx-view-engine');

//  line 10 :app.set('view engine', 'jsx') is one line of code that make app able to use jsx engine
app.set('view engine', 'jsx')
app.set("views", './views');

/* line 14:app.engine('jsx', jsxViewEngine( )); 
Only need to invoke jsxEngine. This will be 2nd line of code that make app able to use jsx engine */
app.engine('jsx', jsxViewEngine( )); 

  // Index Route
  app.get('/fruits', (req, res) => {
    res.render("fruits/Index", {fruits});
  });
  
  app.get('/vegetables', (req, res) => {
    res.render("vegetables/Index", {vegetables});
  });

  //Show Route
  /* fruit singular because show route only show 1
   use id  in req.params.id to access fruits array
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
const React = require('react')

class Show extends React.Component {
    render ( ) {
        //.fruit here because we passed the key from server.js
        const vegetable  = this.props.vegetable 

         return (
            // create div with ternary for the boolean from the fruits.js in models folder
            <div>
            <h1> Show Page </h1>
            The {vegetable.name} is {vegetable.color}.
            And {
                vegetable.readyToEat ? 
                "It is ready to eat!"
                :
                "It is not ready to eat... Cant touch this"
            }
            </div>
        );
     }
 }
 module.exports  = Show;
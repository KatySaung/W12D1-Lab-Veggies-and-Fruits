const React = require('react')


class Show extends React.Component {
    render ( ) {
        //.fruit here because we passed the key from server.js
        const fruit = this.props.fruit 

         return (
            // create div with ternary for the boolean from the fruits.js in models folder
            <div>
            <h1> Show Page </h1>
            The {fruit.name} is {fruit.color}.
            And {
                fruit.readyToEat ? 
                "It is ready to eat!"
                :
                "It is not ready to eat... Cant touch this"
            }
            </div>
        );
     }
 }
 module.exports  = Show;
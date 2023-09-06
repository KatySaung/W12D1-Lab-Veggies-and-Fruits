const React = require('react')

class Show extends React.Component {
    render ( ) {
        //.vegetable here because we passed the key from server.js
        const { name, color, readyToEat, img } = this.props.vegetable 

         return (
            // create div with ternary for the boolean from the fruits.js in models folder
            <div>
            <h1> Show Page </h1>
            The {name} is {color}.
            And {
                readyToEat ? 
                "It is ready to eat!"
                :
                "It is not ready to eat... Cant touch this"
            }
            <img src={ img } alt="" />
            </div>
        );
     }
 }
 module.exports  = Show;
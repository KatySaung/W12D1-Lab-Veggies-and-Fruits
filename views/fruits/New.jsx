const React = require("react")

class New extends React.Component{
    render( ) {
        return ( 
            <div>
                <h1>New Fruit Page</h1>

                    {/* this form will be creating the actual request, so need to make a request to /fruits at the post route not a get request ,if we leave it blank, it will just refresh the page(refreshing is just another get request) */}
                <form action="/fruits" method="POST">    
                    {/* the name="name" is setting up the key value pair for the user input */}
                    Name: <input type="text" name="name" /> <br />
                    Color: <input type="text" name="color" /> <br />
                    Is Ready To Eat <input type="checkbox"name="readyToEat" /> <br />
                    Image URL: <input type="text" name="img" />
                    <input type="submit"  value="Create Fruit" /> 
                </form>
                <nav>
                    <a href="/fruits">Back</a>
                </nav>
            </div>
        )
    }
}

// jsx export 
module.exports = New

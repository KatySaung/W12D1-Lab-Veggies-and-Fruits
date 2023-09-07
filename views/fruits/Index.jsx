const React = require("react")

class Index extends React.Component {
    render( ){
        const { fruits } = this.props
        return (
            <div>
                <h1>Fruits Index Page</h1>
                <nav>
                    <a href="/fruits/new">Create a New Fruit</a>
                </nav>
                <ul>
                    {
                        fruits.map((fruit, i) =>{
                            return (
                                // need to create a key in the li. or will have error.
                                <li key={ i }>
                                    The{' '}
                                    {/* changed the id to how it is in Mongo with underscore fruit_id */}
                                      <a href={`/fruits/${ fruit._id }`}>
                                          {fruit.name}
                                      </a>
                                      {'  '}
                                      is {fruit.color} <br></br>
                                      {fruit.readyToEat ?
                                             `It is ready to eat`
                                           :
                                            `It is not ready to eat`
                                        }
                                                                <br />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
module.exports = Index
const React = require("react")
const DefaultLayout = require('../layout/Default');


class Index extends React.Component {
    render( ){
        const { fruits } = this.props
        return (
            // imported Default layout and placed it as the higher order and this will now wrap everthing instead of using a div to wrap.
            <DefaultLayout title={"Fruits Index Page"}>
                <nav>
                    <a href="/fruits/new">Create a New Fruit</a>
                </nav>
                <ul>
                    {
                        fruits &&
                        fruits.map((fruit, i) =>{
                            return (
                                // need to create a key in the li. or will have error.
                                <li key={ i }>
                                    The{' '}
                                    {/* changed the id to how it is in Mongo with underscore fruit._id */}
                                      <a href={`/fruits/${ fruit._id }`}>
                                          {fruit.name}
                                      </a>
                                      {'  '}
                                      is {fruit.color} <br></br>
                                      {fruit.readyToEat ?
                                             `It is ready to eat`
                                           :
                                            `It is not ready to eat`
                                        } <br />
                                        {/* Create edit route/page - Using database id */}
                                        <a href={`/fruits/${fruit._id}/edit`}>Edit this fruit</a>
                                        {/* DELETE form goes here */}
                                        <form action={`/fruits/${fruit._id}?_method=DELETE`} method='POST'>
                                            <input type='submit' value='DELETE' />
                                         </form>
                                </li>    
                            )
                        })
                    }
                </ul>
                </DefaultLayout>
        )
    }
}
module.exports = Index
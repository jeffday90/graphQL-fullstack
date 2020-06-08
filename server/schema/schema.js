const graphql = require('graphql');

// pulls schema class from the package
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// defined first object type for the graphql server
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})

// when somone makes a query, expect some arguments to be passed in
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      // when someone queries a book, use the below code to go and get it
      book: {
        type: BookType,
        args: { id: { type: GraphQLString }},
        resolve(parent, args){ 
            // this is the function where we write code to get data from DB/ other source
            
        }
      }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})



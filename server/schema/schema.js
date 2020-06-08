const graphql = require('graphql');
const _ = require('lodash');
const { 
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema, 
    GraphQLString, 
    GraphQLID,
    GraphQLInt,
 } = graphql;

// dummy data
const books = [
    { name: 'book one', genre: 'sci-fi', id: '1', authorID: '1' },
    { name: 'book 2', genre: 'fantasy', id: '2', authorID: '2' },
    { name: 'book 3', genre: 'sci-fi', id: '3', authorID: '1' },
    { name: 'book FOUR', genre: 'fantasy', id: '4', authorID: '3' },
    { name: 'book 5', genre: 'sci-fi', id: '5', authorID: '2' },
    { name: 'book SIX', genre: 'fantasy', id: '6', authorID: '3' }
]

const authors = [
    { name: 'Jeff', age: 24, id: '1'},
    { name: 'Alfie', age: 99, id: '2'},
    { name: 'Lorraine', age: 4, id: '3'},
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
          type: AuthorType,
          resolve(parent, args) {
            return _.find(authors, { id: parent.authorID })
          }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorID: parent.id })
            }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      // when someone queries a book, use the below code to go and get it
      book: {
        type: BookType,
        args: { id: { type: GraphQLID }},
        resolve(parent, args){ 
            // this is the function where we write code to get data from DB/ other source

            // uses lodash to look through books for id that matches args.id
            return _.find(books, { id: args.id });
            
        }
      },
      author: {
        type: AuthorType,
        args: { id: { type: GraphQLID }},
        resolve(parent, args){ 
            // this is the function where we write code to get data from DB/ other source

            // uses lodash to look through author for id that matches args.id
            return _.find(authors, { id: args.id });
            
        }
      },
      books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
            return books
        }
      },
      authors: {
        type: new GraphQLList(AuthorType),
        resolve(parent, args) {
            return authors
        }
      }
    },
})

module.exports = new GraphQLSchema({
    query: RootQuery
})



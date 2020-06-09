const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const { 
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLNonNull, 
    GraphQLString, 
    GraphQLID,
    GraphQLInt,
 } = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
          type: AuthorType,
          resolve(parent, args) {
            return Author.findById(parent.authorID);
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
              return Book.find({ authorID: parent.id });
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      book: {
        type: BookType,
        args: { id: { type: GraphQLID }},
        resolve(parent, args){ 
          return Book.findById(args.id);
        }
      },
      author: {
        type: AuthorType,
        args: { id: { type: GraphQLID }},
        resolve(parent, args){ 
          return Author.findById(args.id);
            
        }
      },
      books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
            return Book.find({});
        }
      },
      authors: {
        type: new GraphQLList(AuthorType),
        resolve(parent, args) {
            return Author.find({});
        }
      }
    },
});

const Mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        return Author(args).save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorID: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Book(args).save();
      }
    }
  }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations,
})



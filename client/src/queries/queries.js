import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
{
   authors {
      name
      id
   }
}
`

const getBooksQuery = gql`
   {
      books {
         name
         genre
         id
      }
   }
`

const addBookMutation = gql`
   mutation($name: String!, $genre: String!, $authorID: ID!) {
       addBook(name: $name, genre: $genre, authorID: $authorID) {
           name
           id
       }
   }
`;

export { getAuthorsQuery, getBooksQuery, addBookMutation };
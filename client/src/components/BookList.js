import React from 'react';
import { useQuery } from '@apollo/react-hooks';

// queries
import { getBooksQuery } from '../queries/queries';

function BookList(){
    const { loading, error, data } = useQuery(getBooksQuery);
 
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
 
    const { books } = data;
 
    const bookListItems = books.map( ({ id, name, genre }) => {
      return <li key={id}>'{name}' is of '{genre}' genre</li>;
    });
 
    return (
       <div>
          <ul id="book-list">{bookListItems}</ul>
       </div>
    );
 };
 
 export default BookList;

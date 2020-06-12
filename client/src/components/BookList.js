import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

// queries
import { getBooksQuery } from '../queries/queries';

// components
import BookDetails from './BookDetails';

function BookList(){
   const { loading, error, data } = useQuery(getBooksQuery);
   const [selected, setSelected] = useState(null);
 
   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error :(</p>;
 
   const { books } = data;
 
   const bookListItems = books.map( ({ id, name }) => {
     return (
        <li onClick={() => setSelected(id)} key={id}>
           {name}
         </li>
      )
   });
 
   return (
     <div>
        <ul id="book-list">{bookListItems}</ul>
        <BookDetails bookId={selected}/>
      </div>
   );
 };
 
 export default BookList;

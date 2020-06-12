import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const getAuthors = gql`
   {
      authors {
         name
         id
      }
   }
`

function AddBook (){
    const { error, loading, data } = useQuery(getAuthors);

    const displayAuthors = () => {
        if (loading) return <option>Loading Authors.</option>;
        if (error) return <option>Error Loading Authors :(</option>;

        if (data) {
            const { authors } = data;
            return [
                <option key="" value="">Select Author</option>,
                authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))
              ];
        }
    };

    return (
        <form id="add-book">
          <div className="field">
            <label htmlFor="book-name">Book Name:&nbsp;</label>
            <input type="text" name="book-name" />
          </div>
    
    
          <div className="field">
            <label htmlFor="genre">Genre:&nbsp;</label>
            <input type="text" name="genre" />
          </div>
    
    
          <div className="field">
            <label htmlFor="author-name">Author:&nbsp;</label>
            <select name="author-name">{displayAuthors()}</select>
          </div>
          <button>+</button>
        </form>
    );
}

export default AddBook;

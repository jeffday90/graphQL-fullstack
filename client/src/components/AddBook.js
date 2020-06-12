import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

// queries
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

function AddBook (){
    const { error, loading, data } = useQuery(getAuthorsQuery);
    const [addBookMut, { dataMutation }] = useMutation(addBookMutation);

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

    const [book, setBook] = React.useState({ name: "", genre: "", authorID: "" });

    const handleSubmit = e => {
        e.preventDefault();
        addBookMut({
            variables: {
                name: book.name,
                genre: book.genre,
                authorID: book.authorID,
            },
            // make sure its square brackets, otherwise it won't work
            refetchQueries: [{ query: getBooksQuery }]
        })
    }

    return (
        <form id="add-book" onSubmit={handleSubmit}>
          <div className="field">
            <label>Book Name:&nbsp;</label>
            <input 
                value={book.name} 
                onChange={e => setBook({...book, name: e.target.value})} 
                type="text" 
                name="book-name" 
            />
          </div>
    
    
          <div className="field">
            <label>Genre:&nbsp;</label>
            <input 
                value={book.genre} 
                onChange={e => setBook({...book, genre: e.target.value})} 
                type="text" 
                name="book-genre" 
            />
          </div>
    
    
          <div className="field">
            <label>Author:&nbsp;</label>
            <select 
                value={book.authorID} 
                name="author-name"
                onChange={e => setBook({...book, authorID: e.target.value})}>
            {displayAuthors()}
            </select>
          </div>
          <button>+</button>
        </form>
    );
}

export default AddBook;

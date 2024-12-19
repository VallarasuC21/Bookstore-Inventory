import React, { useState } from 'react';
import './App.css';

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  price: number;
}

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<Omit<Book, 'id'>>({ title: '', author: '', genre: '', price: 0 });
  const [filter, setFilter] = useState<{ genre: string; author: string }>({ genre: '', author: '' });
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const addOrUpdateBook = () => {
    if (editingBook) {
      setBooks(books.map((book) => (book.id === editingBook.id ? { ...editingBook, ...newBook } : book)));
      setEditingBook(null);
    } else {
      const id = books.length > 0 ? books[books.length - 1].id + 1 : 1;
      setBooks([...books, { ...newBook, id }]);
    }
    setNewBook({ title: '', author: '', genre: '', price: 0 });
  };

  const deleteBook = (id: number) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const startEditing = (book: Book) => {
    setEditingBook(book);
    setNewBook({ title: book.title, author: book.author, genre: book.genre, price: book.price });
  };

  const filteredBooks = books.filter((book) => {
    return (
      (filter.genre ? book.genre === filter.genre : true) &&
      (filter.author ? book.author === filter.author : true)
    );
  });

  return (
    <div className="app-container">
      <h1 className="header">Bookstore Inventory</h1>

      <div className="box-container">
        <div className="form-container">
          <h2>{editingBook ? 'Edit Book' : 'Add a Book'}</h2>
          <input
            type="text"
            placeholder="Title"
            className="input"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Author"
            className="input"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          />
          <input
            type="text"
            placeholder="Genre"
            className="input"
            value={newBook.genre}
            onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            className="input"
            value={newBook.price}
            onChange={(e) => setNewBook({ ...newBook, price: parseFloat(e.target.value) || 0 })}
          />
          <button className="button" onClick={addOrUpdateBook}>{editingBook ? 'Update Book' : 'Add Book'}</button>
          {editingBook && <button className="button cancel" onClick={() => setEditingBook(null)}>Cancel</button>}
        </div>

        <div className="filter-container">
          <h2>Filter Books</h2>
          <select
            className="dropdown"
            value={filter.genre}
            onChange={(e) => setFilter({ ...filter, genre: e.target.value })}
          >
            <option value="">All Genres</option>
            {[...new Set(books.map((book) => book.genre))].map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <select
            className="dropdown"
            value={filter.author}
            onChange={(e) => setFilter({ ...filter, author: e.target.value })}
          >
            <option value="">All Authors</option>
            {[...new Set(books.map((book) => book.author))].map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>

        <div className="book-list">
          <h2>Book List</h2>
          {filteredBooks.map((book) => (
            <div key={book.id} className="book-item">
              <p className="book-details">
                <strong>{book.title}</strong> by {book.author} ({book.genre}) - ${book.price}
              </p>
              <button className="button delete" onClick={() => deleteBook(book.id)}>Delete</button>
              <button className="button edit" onClick={() => startEditing(book)}>Edit</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;

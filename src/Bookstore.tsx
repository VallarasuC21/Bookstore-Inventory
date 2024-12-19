// types.ts
export interface Book {
    title: string;
    author: string;
    genre: string;
    price: number;
  }
  
  // Bookstore.ts
  export class Bookstore {
    private inventory: Book[] = [];
  
    // Add a new book to the inventory
    addBook(book: Book): void {
      this.inventory.push(book);
    }
  
    // Edit an existing book by title
    editBook(title: string, updatedBook: Book): boolean {
      const bookIndex = this.inventory.findIndex(book => book.title === title);
      if (bookIndex === -1) return false;
      this.inventory[bookIndex] = updatedBook;
      return true;
    }
  
    // Delete a book by title
    deleteBook(title: string): boolean {
      const bookIndex = this.inventory.findIndex(book => book.title === title);
      if (bookIndex === -1) return false;
      this.inventory.splice(bookIndex, 1);
      return true;
    }
  
    // Filter books by genre or author
    filterBooks(genre: string, author: string): Book[] {
      return this.inventory.filter((book) =>
        (genre ? book.genre.toLowerCase().includes(genre.toLowerCase()) : true) &&
        (author ? book.author.toLowerCase().includes(author.toLowerCase()) : true)
      );
    }
  
    // Get all books in inventory
    getAllBooks(): Book[] {
      return this.inventory;
    }
  }
  
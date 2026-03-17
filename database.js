const Database = require('better-sqlite3');
const path = require('path');

// Initialize database
const dbPath = path.join(__dirname, 'orders.db');
const db = new Database(dbPath, { verbose: console.log });

// Create the orders table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    order_text TEXT NOT NULL,
    date TEXT NOT NULL
  )
`);

module.exports = {
  // Insert a new order
  addOrder: (name, order_text, date) => {
    const stmt = db.prepare('INSERT INTO orders (name, order_text, date) VALUES (?, ?, ?)');
    const info = stmt.run(name, order_text, date);
    return info.lastInsertRowid;
  },

  // Get all orders
  getAllOrders: () => {
    const stmt = db.prepare('SELECT * FROM orders');
    return stmt.all();
  },

  // Clear all orders
  clearOrders: () => {
    const stmt = db.prepare('DELETE FROM orders');
    stmt.run();
    // Reset autoincrement counter
    db.prepare('DELETE FROM sqlite_sequence WHERE name="orders"').run();
  }
};

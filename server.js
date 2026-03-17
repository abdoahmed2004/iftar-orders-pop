const express = require('express');
const cors = require('cors');
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;
const EXCEL_FILE = path.join(__dirname, 'orders.xlsx');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = require('./database');

// POST /api/orders — Add a new order
app.post('/api/orders', async (req, res) => {
  try {
    const { name, order } = req.body;
    
    if (!name || !order) {
      return res.status(400).json({ error: 'Name and order are required' });
    }
    
    const date = new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
    
    const id = db.addOrder(name, order, date);
    
    console.log(`✅ Order #${id}: ${name} — ${order}`);
    res.json({ success: true, message: 'Order saved successfully!', id });
  } catch (err) {
    console.error('Error saving order:', err);
    res.status(500).json({ error: 'Failed to save order' });
  }
});

// GET /api/orders — Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = db.getAllOrders();
    res.json({ orders, total: orders.length });
  } catch (err) {
    console.error('Error reading orders:', err);
    res.status(500).json({ error: 'Failed to read orders' });
  }
});

// GET /api/orders/download — Download Excel file
app.get('/api/orders/download', async (req, res) => {
  try {
    const orders = db.getAllOrders();
    
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Orders');
    
    // Style the header row
    sheet.columns = [
      { header: '#', key: 'id', width: 8 },
      { header: 'Name', key: 'name', width: 25 },
      { header: 'Order', key: 'order', width: 40 },
      { header: 'Date', key: 'date', width: 22 },
    ];
    
    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF8B5E3C' },
    };
    headerRow.alignment = { horizontal: 'center' };
    
    // Add rows
    orders.forEach(o => {
      sheet.addRow({ id: o.id, name: o.name, order: o.order_text, date: o.date });
    });
    
    // Write to file and send
    await workbook.xlsx.writeFile(EXCEL_FILE);
    res.download(EXCEL_FILE, 'elqahwa-iftar-orders.xlsx');
  } catch (err) {
    console.error('Error creating Excel file:', err);
    res.status(500).json({ error: 'Failed to create Excel file' });
  }
});

// DELETE /api/orders — Clear all orders
app.delete('/api/orders', async (req, res) => {
  try {
    db.clearOrders();
    
    // Optionally delete the excel file if it exists
    if (fs.existsSync(EXCEL_FILE)) {
      fs.unlinkSync(EXCEL_FILE);
    }
    
    res.json({ success: true, message: 'All orders cleared' });
  } catch (err) {
    console.error('Error clearing orders:', err);
    res.status(500).json({ error: 'Failed to clear orders' });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n☕ Elqahwa Iftar server running at http://0.0.0.0:${PORT}`);
  console.log(`📋 Admin panel at http://0.0.0.0:${PORT}/admin.html\n`);
});

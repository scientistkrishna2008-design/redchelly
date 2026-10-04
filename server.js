import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  getMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getTables,
  getOrders,
  createOrder,
  updateOrderStatus,
  getReviews,
  addReview
} from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

// API Routes

// --- MENU ROUTES ---
app.get('/api/menu', (req, res) => {
  try {
    const menu = getMenuItems();
    res.json({ success: true, data: menu });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/menu', (req, res) => {
  try {
    const newItem = addMenuItem(req.body);
    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.put('/api/menu/:id', (req, res) => {
  try {
    const updated = updateMenuItem(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.patch('/api/menu/:id/toggle-stock', (req, res) => {
  try {
    const menu = getMenuItems();
    const item = menu.find(m => m.id === Number(req.params.id));
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    const updated = updateMenuItem(req.params.id, { inStock: !item.inStock });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.delete('/api/menu/:id', (req, res) => {
  try {
    const success = deleteMenuItem(req.params.id);
    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- TABLES ROUTES ---
app.get('/api/tables', (req, res) => {
  try {
    const tables = getTables();
    res.json({ success: true, data: tables });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- ORDERS ROUTES ---
app.get('/api/orders', (req, res) => {
  try {
    const orders = getOrders();
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/orders/table/:tableNo', (req, res) => {
  try {
    const tableNo = Number(req.params.tableNo);
    const orders = getOrders().filter(o => o.tableNo === tableNo && o.status !== 'Completed' && o.status !== 'Cancelled');
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/orders', (req, res) => {
  try {
    const { tableNo, items, totalAmount, customerName } = req.body;
    if (!tableNo || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Table number and items are required' });
    }
    const order = createOrder({ tableNo, items, totalAmount, customerName });
    res.status(201).json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.patch('/api/orders/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = updateOrderStatus(req.params.id, status);
    if (!updatedOrder) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, data: updatedOrder });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// --- REVIEWS ROUTES ---
app.get('/api/reviews', (req, res) => {
  try {
    const reviews = getReviews();
    res.json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/reviews', (req, res) => {
  try {
    const review = addReview(req.body);
    res.status(201).json({ success: true, data: review });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Serve frontend SPA fallback
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, message: 'API route not found' });
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), (err) => {
    if (err) {
      res.send("Red Chelly API Server Running. Build client using 'npm run build' to serve frontend from Express.");
    }
  });
});

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🔥 Red Chelly Backend Server running on http://localhost:${PORT}`);
  });
}

export default app;

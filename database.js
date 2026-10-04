import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// On Vercel, use /tmp folder for ephemeral write access if no external cloud DB is specified
const isVercel = Boolean(process.env.VERCEL);
const DB_FILE = isVercel
  ? path.join('/tmp', 'restaurant_db.json')
  : path.join(__dirname, 'data', 'restaurant_db.json');

// Ensure data folder exists locally
if (!isVercel && !fs.existsSync(path.dirname(DB_FILE))) {
  fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
}

// Initial seed data
const initialData = {
  menu: [
    {
      id: 1,
      name: "Hyderabadi Chicken Dum Biryani",
      category: "Biryani & Rice",
      price: 180,
      description: "Fragrant basmati rice cooked with succulent chicken pieces, aromatic spices, topped with boiled egg & mint.",
      image: "/images/hyderabadi_chicken_biryani.jpg",
      isVeg: false,
      inStock: true,
      badge: "Bestseller"
    },
    {
      id: 2,
      name: "SPL Gravy Chicken",
      category: "Gravies & Curries",
      price: 160,
      description: "Signature Red Chelly spicy chicken curry with secret South Indian whole spices & roasted coconut gravy.",
      image: "/images/spl_gravy_chicken.jpg",
      isVeg: false,
      inStock: true,
      badge: "Chef's Special"
    },
    {
      id: 3,
      name: "Moghlai Chi Gravy",
      category: "Gravies & Curries",
      price: 175,
      description: "Rich Mughlai style chicken curry crafted in creamy cashew-almond sauce with aromatic herbs & saffron infusion.",
      image: "/images/moghlai_chicken_gravy.jpg",
      isVeg: false,
      inStock: true,
      badge: "Must Try"
    },
    {
      id: 4,
      name: "Chicken Tika",
      category: "Starters & Tandoori",
      price: 150,
      description: "Tender boneless chicken marinated in spiced yogurt, charcoal roasted to perfection. Served with mint chutney.",
      image: "/images/chicken_tikka.jpg",
      isVeg: false,
      inStock: true,
      badge: "Popular"
    },
    {
      id: 5,
      name: "Butter Naan",
      category: "Breads",
      price: 35,
      description: "Soft clay-oven baked flatbread brushed generously with pure butter.",
      image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80",
      isVeg: true,
      inStock: true,
      badge: ""
    },
    {
      id: 6,
      name: "Tandoori Roti",
      category: "Breads",
      price: 20,
      description: "Traditional whole wheat bread cooked in tandoor.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
      isVeg: true,
      inStock: true,
      badge: ""
    },
    {
      id: 7,
      name: "Paneer Butter Masala",
      category: "Gravies & Curries",
      price: 140,
      description: "Fresh paneer cubes simmered in rich creamy tomato butter sauce.",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
      isVeg: true,
      inStock: true,
      badge: "Veg Special"
    },
    {
      id: 8,
      name: "Jeera Rice",
      category: "Biryani & Rice",
      price: 90,
      description: "Long grain basmati rice tempered with aromatic cumin seeds and ghee.",
      image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&w=600&q=80",
      isVeg: true,
      inStock: true,
      badge: ""
    },
    {
      id: 9,
      name: "Fresh Lime Soda",
      category: "Beverages & Desserts",
      price: 40,
      description: "Refreshing fizzy drink with fresh squeezed lemon juice, mint & choice of sweet/salted.",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
      isVeg: true,
      inStock: true,
      badge: ""
    },
    {
      id: 10,
      name: "Gulab Jamun (2 Pcs)",
      category: "Beverages & Desserts",
      price: 50,
      description: "Warm milk dumplings soaked in cardamom infused sugar syrup.",
      image: "https://images.unsplash.com/photo-1629851478794-5b432a5ff5f0?auto=format&fit=crop&w=600&q=80",
      isVeg: true,
      inStock: true,
      badge: "Sweet"
    }
  ],
  tables: Array.from({ length: 10 }, (_, i) => ({
    tableNo: i + 1,
    status: "Available",
    currentOrderId: null
  })),
  orders: [],
  reviews: [
    {
      id: 1,
      name: "Karthik R.",
      rating: 5,
      comment: "Best place to have a meal in Thirumalaisamudram. The Hyderabadi Dum Biryani and SPL Gravy Chicken are unmatched!",
      date: "2026-09-28"
    },
    {
      id: 2,
      name: "Suresh M.",
      rating: 3,
      comment: "More food colour, but taste was OK, quality can be improved.",
      date: "2026-09-15"
    },
    {
      id: 3,
      name: "Anand K.",
      rating: 4,
      comment: "Great spot near SASTRA university area. Quick service and affordable price range ₹1-200.",
      date: "2026-09-02"
    }
  ]
};

// Database helper functions
export const getDb = () => {
  if (!fs.existsSync(DB_FILE)) {
    saveDb(initialData);
    return initialData;
  }
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading database:", err);
    saveDb(initialData);
    return initialData;
  }
};

export const saveDb = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error("Error saving database:", err);
  }
};

// Menu helper functions
export const getMenuItems = () => getDb().menu;

export const addMenuItem = (item) => {
  const db = getDb();
  const newId = db.menu.length > 0 ? Math.max(...db.menu.map(m => m.id)) + 1 : 1;
  const newItem = {
    id: newId,
    name: item.name,
    category: item.category || "Main Course",
    price: Number(item.price) || 0,
    description: item.description || "",
    image: item.image || "/images/hyderabadi_chicken_biryani.jpg",
    isVeg: Boolean(item.isVeg),
    inStock: item.inStock !== undefined ? Boolean(item.inStock) : true,
    badge: item.badge || ""
  };
  db.menu.push(newItem);
  saveDb(db);
  return newItem;
};

export const updateMenuItem = (id, updatedFields) => {
  const db = getDb();
  const index = db.menu.findIndex(m => m.id === Number(id));
  if (index === -1) return null;

  db.menu[index] = { ...db.menu[index], ...updatedFields };
  saveDb(db);
  return db.menu[index];
};

export const deleteMenuItem = (id) => {
  const db = getDb();
  db.menu = db.menu.filter(m => m.id !== Number(id));
  saveDb(db);
  return true;
};

// Table helper functions
export const getTables = () => getDb().tables;

// Order helper functions
export const getOrders = () => getDb().orders;

export const createOrder = (orderData) => {
  const db = getDb();
  const orderId = `ORD-${Date.now().toString().slice(-6)}`;
  const tableNo = Number(orderData.tableNo);

  const newOrder = {
    id: orderId,
    tableNo: tableNo,
    customerName: orderData.customerName || `Table ${tableNo} Guest`,
    items: orderData.items || [],
    totalAmount: Number(orderData.totalAmount) || 0,
    status: "Pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.orders.unshift(newOrder);

  // Update table status
  const table = db.tables.find(t => t.tableNo === tableNo);
  if (table) {
    table.status = "Occupied";
    table.currentOrderId = orderId;
  }

  saveDb(db);
  return newOrder;
};

export const updateOrderStatus = (orderId, status) => {
  const db = getDb();
  const order = db.orders.find(o => o.id === orderId);
  if (!order) return null;

  order.status = status;
  order.updatedAt = new Date().toISOString();

  // If completed or cancelled, free up table if it matches
  if (status === "Completed" || status === "Cancelled") {
    const table = db.tables.find(t => t.tableNo === order.tableNo);
    if (table && table.currentOrderId === orderId) {
      table.status = "Available";
      table.currentOrderId = null;
    }
  }

  saveDb(db);
  return order;
};

// Review helper functions
export const getReviews = () => getDb().reviews;

export const addReview = (reviewData) => {
  const db = getDb();
  const newReview = {
    id: db.reviews.length + 1,
    name: reviewData.name || "Anonymous Guest",
    rating: Number(reviewData.rating) || 5,
    comment: reviewData.comment || "",
    date: new Date().toISOString().split('T')[0]
  };
  db.reviews.unshift(newReview);
  saveDb(db);
  return newReview;
};

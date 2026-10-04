# 🌶️ Red Chelly Restaurant

> Authentic Dine-in & Fast Food Experience at Tirumalaisamudram, Thanjavur (Tamil Nadu 613401). Built with React, Vite, Express, and Vercel support.

---

## 🌟 Features

### 🍽️ Customer Dine-In Ordering
- **Dine-In Table Selector (Tables 1 - 10)**: Select table number 1 through 10 before or during ordering.
- **Interactive Menu Catalog**: Search, filter by category (Biryani & Rice, Gravies, Starters, Breads, Beverages), and toggle Pure Veg / Non-Veg.
- **Highlights**: Hyderabadi Chicken Dum Biryani, SPL Gravy Chicken, Moghlai Chi Gravy, Chicken Tikka.
- **Cart & Special Notes**: Customize quantities & add special kitchen instructions.
- **Live Order Tracker**: Real-time status update steps (`Pending` -> `Preparing` -> `Served`).

### 👨‍🍳 Admin & Kitchen Portal (KDS)
- **Live Kitchen Orders Stream**: Instant order stream categorized by Table Number (e.g. Table #4).
- **Status Workflow**: Accept & Prepare -> Mark Served -> Finish & Clear Bill.
- **Full Menu CRUD**: Add new dishes, edit pricing/descriptions/images, toggle In Stock / Out of Stock, delete dishes.
- **Table Seating Monitor**: Live view of Tables 1-10 occupation status.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start full-stack local application
npm run dev

# App running on http://localhost:5000 (Express + Vite)
```

---

## ☁️ Deploy to Vercel

This repository is pre-configured with `vercel.json` and serverless API handlers in `/api`:

1. Connect this GitHub repository to [Vercel](https://vercel.com).
2. Framework Preset: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Click **Deploy**!

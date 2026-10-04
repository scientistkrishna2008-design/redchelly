import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import TableSelectorModal from './components/TableSelectorModal.jsx';
import MenuSection from './components/MenuSection.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import OrderTrackerModal from './components/OrderTrackerModal.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import ReviewsSection from './components/ReviewsSection.jsx';
import Footer from './components/Footer.jsx';

// Helper for persistent local storage sync
const getLocalData = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setLocalData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {}
};

export default function App() {
  const [menu, setMenu] = useState(() => getLocalData('rc_menu', []));
  const [orders, setOrders] = useState(() => getLocalData('rc_orders', []));
  const [tables, setTables] = useState(() => getLocalData('rc_tables', []));
  const [reviews, setReviews] = useState(() => getLocalData('rc_reviews', []));

  const [selectedTable, setSelectedTable] = useState(() => getLocalData('rc_selected_table', null));
  const [cart, setCart] = useState(() => getLocalData('rc_cart', []));
  const [activeOrder, setActiveOrder] = useState(null);

  // Modals & UI Toggles
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Save selected table and cart to localStorage whenever changed
  useEffect(() => {
    setLocalData('rc_selected_table', selectedTable);
  }, [selectedTable]);

  useEffect(() => {
    setLocalData('rc_cart', cart);
  }, [cart]);

  // Save orders and menu to localStorage whenever changed
  useEffect(() => {
    if (orders.length > 0) setLocalData('rc_orders', orders);
  }, [orders]);

  useEffect(() => {
    if (menu.length > 0) setLocalData('rc_menu', menu);
  }, [menu]);

  // Initial Fetch & Merge Data
  const fetchData = async () => {
    try {
      const [resMenu, resTables, resOrders, resReviews] = await Promise.all([
        fetch('/api/menu').then(r => r.json()).catch(() => ({ success: false })),
        fetch('/api/tables').then(r => r.json()).catch(() => ({ success: false })),
        fetch('/api/orders').then(r => r.json()).catch(() => ({ success: false })),
        fetch('/api/reviews').then(r => r.json()).catch(() => ({ success: false }))
      ]);

      if (resMenu.success && resMenu.data?.length > 0) {
        setMenu(resMenu.data);
        setLocalData('rc_menu', resMenu.data);
      }

      if (resReviews.success && resReviews.data?.length > 0) {
        setReviews(resReviews.data);
        setLocalData('rc_reviews', resReviews.data);
      }

      // Merge API orders intelligently with local orders to prevent serverless instance wipeouts
      if (resOrders.success && Array.isArray(resOrders.data)) {
        setOrders(prev => {
          const apiOrdersMap = new Map(resOrders.data.map(o => [o.id, o]));
          // Merge local orders that might not be in api instance yet
          const merged = [...resOrders.data];
          prev.forEach(localOrder => {
            if (!apiOrdersMap.has(localOrder.id)) {
              merged.push(localOrder);
            }
          });
          // Sort newest first
          merged.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setLocalData('rc_orders', merged);
          return merged;
        });
      }

      if (resTables.success && Array.isArray(resTables.data)) {
        setTables(resTables.data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
    // Realtime polling every 3 seconds for live kitchen updates
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  // Update active order for selected table whenever orders or selectedTable change
  useEffect(() => {
    if (selectedTable) {
      const liveOrder = orders.find(
        o => o.tableNo === Number(selectedTable) && o.status !== 'Completed' && o.status !== 'Cancelled'
      );
      setActiveOrder(liveOrder || null);
    } else {
      setActiveOrder(null);
    }
  }, [orders, selectedTable]);

  // Cart actions
  const handleAddToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart((prev) => prev.map((i) => (i.id === itemId ? { ...i, quantity } : i)));
  };

  const handleRemoveItem = (itemId) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  // Order Placement (Optimistic Instant Update + API Sync)
  const handlePlaceOrder = async (specialInstructions) => {
    if (!selectedTable || cart.length === 0) return;

    setIsPlacingOrder(true);
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;

    const newOrder = {
      id: orderId,
      tableNo: Number(selectedTable),
      customerName: `Table ${selectedTable} Guest`,
      items: cart.map(i => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        specialNotes: specialInstructions || ''
      })),
      totalAmount,
      status: "Pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // 1. Instant local optimistic update
    setOrders(prev => {
      const updated = [newOrder, ...prev];
      setLocalData('rc_orders', updated);
      return updated;
    });

    setTables(prev => prev.map(t => t.tableNo === Number(selectedTable) ? { ...t, status: "Occupied", currentOrderId: orderId } : t));
    setCart([]);
    setIsCartOpen(false);
    setActiveOrder(newOrder);
    setIsTrackerOpen(true);

    // 2. API Sync
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
    } catch (err) {
      console.error("API sync error:", err);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // Admin Actions (Optimistic Local Update + API Sync)
  const handleAddMenuItem = async (newItem) => {
    const createdItem = {
      ...newItem,
      id: menu.length > 0 ? Math.max(...menu.map(m => m.id)) + 1 : 1,
      price: Number(newItem.price)
    };
    setMenu(prev => {
      const updated = [...prev, createdItem];
      setLocalData('rc_menu', updated);
      return updated;
    });

    try {
      await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
    } catch (err) {
      console.error("Error adding dish:", err);
    }
  };

  const handleUpdateMenuItem = async (id, updatedFields) => {
    setMenu(prev => {
      const updated = prev.map(m => m.id === Number(id) ? { ...m, ...updatedFields, price: Number(updatedFields.price || m.price) } : m);
      setLocalData('rc_menu', updated);
      return updated;
    });

    try {
      await fetch(`/api/menu/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
      });
    } catch (err) {
      console.error("Error updating dish:", err);
    }
  };

  const handleToggleStock = async (id) => {
    setMenu(prev => {
      const updated = prev.map(m => m.id === Number(id) ? { ...m, inStock: !m.inStock } : m);
      setLocalData('rc_menu', updated);
      return updated;
    });

    try {
      await fetch(`/api/menu/${id}/toggle-stock`, { method: 'PATCH' });
    } catch (err) {
      console.error("Error toggling stock:", err);
    }
  };

  const handleDeleteMenuItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this dish from menu?")) return;

    setMenu(prev => {
      const updated = prev.filter(m => m.id !== Number(id));
      setLocalData('rc_menu', updated);
      return updated;
    });

    try {
      await fetch(`/api/menu/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error("Error deleting dish:", err);
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    setOrders(prev => {
      const updated = prev.map(o => o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o);
      setLocalData('rc_orders', updated);
      return updated;
    });

    try {
      await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  const handleSubmitReview = async (reviewData) => {
    const newRev = {
      id: reviews.length + 1,
      name: reviewData.name || "Anonymous Guest",
      rating: Number(reviewData.rating) || 5,
      comment: reviewData.comment || "",
      date: new Date().toISOString().split('T')[0]
    };

    setReviews(prev => {
      const updated = [newRev, ...prev];
      setLocalData('rc_reviews', updated);
      return updated;
    });

    try {
      await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData)
      });
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        selectedTable={selectedTable}
        onOpenTableModal={() => setIsTableModalOpen(true)}
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        activeOrder={activeOrder}
        onOpenTracker={() => setIsTrackerOpen(true)}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />

      <main style={{ flex: 1 }}>
        {isAdmin ? (
          <AdminDashboard
            menu={menu}
            orders={orders}
            tables={tables}
            reviews={reviews}
            onAddMenuItem={handleAddMenuItem}
            onUpdateMenuItem={handleUpdateMenuItem}
            onToggleStock={handleToggleStock}
            onDeleteMenuItem={handleDeleteMenuItem}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onRefreshData={fetchData}
          />
        ) : (
          <>
            <MenuSection
              menu={menu}
              cart={cart}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={handleUpdateQuantity}
              onOpenTableModal={() => setIsTableModalOpen(true)}
              selectedTable={selectedTable}
            />

            <ReviewsSection
              reviews={reviews}
              onSubmitReview={handleSubmitReview}
            />
          </>
        )}
      </main>

      <Footer />

      {/* Modals & Drawers */}
      <TableSelectorModal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
        selectedTable={selectedTable}
        onSelectTable={(tableNum) => setSelectedTable(tableNum)}
        tables={tables}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        selectedTable={selectedTable}
        onOpenTableModal={() => {
          setIsCartOpen(false);
          setIsTableModalOpen(true);
        }}
        onPlaceOrder={handlePlaceOrder}
        isPlacingOrder={isPlacingOrder}
      />

      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        activeOrder={activeOrder}
      />
    </div>
  );
}

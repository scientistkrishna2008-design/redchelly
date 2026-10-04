import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import TableSelectorModal from './components/TableSelectorModal.jsx';
import MenuSection from './components/MenuSection.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import OrderTrackerModal from './components/OrderTrackerModal.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import ReviewsSection from './components/ReviewsSection.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [menu, setMenu] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [selectedTable, setSelectedTable] = useState(null);
  const [cart, setCart] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);

  // Modals & UI Toggles
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Initial Fetch Data
  const fetchData = async () => {
    try {
      const [resMenu, resTables, resOrders, resReviews] = await Promise.all([
        fetch('/api/menu').then(r => r.json()),
        fetch('/api/tables').then(r => r.json()),
        fetch('/api/orders').then(r => r.json()),
        fetch('/api/reviews').then(r => r.json())
      ]);

      if (resMenu.success) setMenu(resMenu.data);
      if (resTables.success) setTables(resTables.data);
      if (resOrders.success) setOrders(resOrders.data);
      if (resReviews.success) setReviews(resReviews.data);
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
        o => o.tableNo === selectedTable && o.status !== 'Completed' && o.status !== 'Cancelled'
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

  // Order Placement
  const handlePlaceOrder = async (specialInstructions) => {
    if (!selectedTable || cart.length === 0) return;

    setIsPlacingOrder(true);
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const payload = {
      tableNo: selectedTable,
      customerName: `Table ${selectedTable} Guest`,
      items: cart.map(i => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        specialNotes: specialInstructions || ''
      })),
      totalAmount
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setCart([]);
        setIsCartOpen(false);
        setActiveOrder(data.data);
        setIsTrackerOpen(true);
        fetchData();
      } else {
        alert("Failed to place order: " + data.message);
      }
    } catch (err) {
      console.error("Order error:", err);
      alert("Error placing order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // Admin Actions (CRUD)
  const handleAddMenuItem = async (newItem) => {
    try {
      const res = await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      const data = await res.json();
      if (data.success) fetchData();
    } catch (err) {
      console.error("Error adding dish:", err);
    }
  };

  const handleUpdateMenuItem = async (id, updatedFields) => {
    try {
      const res = await fetch(`/api/menu/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
      });
      const data = await res.json();
      if (data.success) fetchData();
    } catch (err) {
      console.error("Error updating dish:", err);
    }
  };

  const handleToggleStock = async (id) => {
    try {
      const res = await fetch(`/api/menu/${id}/toggle-stock`, { method: 'PATCH' });
      const data = await res.json();
      if (data.success) fetchData();
    } catch (err) {
      console.error("Error toggling stock:", err);
    }
  };

  const handleDeleteMenuItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this dish from menu?")) return;
    try {
      const res = await fetch(`/api/menu/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) fetchData();
    } catch (err) {
      console.error("Error deleting dish:", err);
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) fetchData();
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  const handleSubmitReview = async (reviewData) => {
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData)
      });
      const data = await res.json();
      if (data.success) fetchData();
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

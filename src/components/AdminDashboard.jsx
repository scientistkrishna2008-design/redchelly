import React, { useState } from 'react';
import {
  Utensils,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  ChefHat,
  Eye,
  EyeOff,
  RefreshCw,
  Search,
  Star,
  CheckSquare,
  AlertTriangle,
  XCircle,
  ShieldCheck
} from 'lucide-react';

export default function AdminDashboard({
  menu,
  orders,
  tables,
  reviews,
  onAddMenuItem,
  onUpdateMenuItem,
  onToggleStock,
  onDeleteMenuItem,
  onUpdateOrderStatus,
  onRefreshData
}) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'menu', 'tables', 'reviews'
  const [orderFilter, setOrderFilter] = useState('All'); // 'All', 'Pending', 'Preparing', 'Served', 'Completed'
  
  // Menu Item Modal Form State
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [menuForm, setMenuForm] = useState({
    name: '',
    category: 'Biryani & Rice',
    price: '',
    description: '',
    image: '/images/hyderabadi_chicken_biryani.jpg',
    isVeg: false,
    inStock: true,
    badge: ''
  });

  const categories = [
    'Biryani & Rice',
    'Gravies & Curries',
    'Starters & Tandoori',
    'Breads',
    'Beverages & Desserts'
  ];

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setMenuForm({
      name: '',
      category: 'Biryani & Rice',
      price: '',
      description: '',
      image: '/images/hyderabadi_chicken_biryani.jpg',
      isVeg: false,
      inStock: true,
      badge: ''
    });
    setIsMenuModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setMenuForm({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
      image: item.image,
      isVeg: item.isVeg,
      inStock: item.inStock,
      badge: item.badge || ''
    });
    setIsMenuModalOpen(true);
  };

  const handleSaveMenuForm = (e) => {
    e.preventDefault();
    if (!menuForm.name || !menuForm.price) return;

    if (editingItem) {
      onUpdateMenuItem(editingItem.id, menuForm);
    } else {
      onAddMenuItem(menuForm);
    }
    setIsMenuModalOpen(false);
  };

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'All') return true;
    return o.status === orderFilter;
  });

  return (
    <div style={{ padding: '2rem 0 4rem', backgroundColor: '#F3F4F6', minHeight: 'calc(100vh - 120px)' }}>
      <div className="container">
        
        {/* Admin Header Bar */}
        <div style={{
          backgroundColor: '#111827',
          color: '#FFF',
          borderRadius: '1rem',
          padding: '1.25rem 1.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck color="#F59E0B" size={24} />
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0, color: '#FFF' }}>
                Red Chelly Admin & Kitchen Portal
              </h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#9CA3AF', margin: '4px 0 0' }}>
              Manage Dine-in Orders by Table Number (1-10) & Live Menu Catalog
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={onRefreshData}
              className="btn btn-secondary"
              style={{ backgroundColor: '#374151', color: '#FFF', border: '1px solid #4B5563', borderRadius: '0.5rem', fontSize: '0.85rem' }}
            >
              <RefreshCw size={15} /> Refresh Live Orders
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.75rem', borderBottom: '2px solid #E5E7EB', paddingBottom: '0.75rem' }}>
          <button
            onClick={() => setActiveTab('orders')}
            style={{
              padding: '0.65rem 1.25rem',
              borderRadius: '0.5rem',
              border: 'none',
              fontWeight: '800',
              fontSize: '0.9375rem',
              cursor: 'pointer',
              backgroundColor: activeTab === 'orders' ? '#C81E1E' : '#FFF',
              color: activeTab === 'orders' ? '#FFF' : '#4B5563',
              boxShadow: activeTab === 'orders' ? '0 4px 10px rgba(200,30,30,0.3)' : 'var(--shadow-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Clock size={18} /> Kitchen Live Orders ({orders.filter(o => o.status !== 'Completed' && o.status !== 'Cancelled').length})
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            style={{
              padding: '0.65rem 1.25rem',
              borderRadius: '0.5rem',
              border: 'none',
              fontWeight: '800',
              fontSize: '0.9375rem',
              cursor: 'pointer',
              backgroundColor: activeTab === 'menu' ? '#C81E1E' : '#FFF',
              color: activeTab === 'menu' ? '#FFF' : '#4B5563',
              boxShadow: activeTab === 'menu' ? '0 4px 10px rgba(200,30,30,0.3)' : 'var(--shadow-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Utensils size={18} /> Menu Editor ({menu.length} Dishes)
          </button>

          <button
            onClick={() => setActiveTab('tables')}
            style={{
              padding: '0.65rem 1.25rem',
              borderRadius: '0.5rem',
              border: 'none',
              fontWeight: '800',
              fontSize: '0.9375rem',
              cursor: 'pointer',
              backgroundColor: activeTab === 'tables' ? '#C81E1E' : '#FFF',
              color: activeTab === 'tables' ? '#FFF' : '#4B5563',
              boxShadow: activeTab === 'tables' ? '0 4px 10px rgba(200,30,30,0.3)' : 'var(--shadow-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <CheckSquare size={18} /> Table Overview (1-10)
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            style={{
              padding: '0.65rem 1.25rem',
              borderRadius: '0.5rem',
              border: 'none',
              fontWeight: '800',
              fontSize: '0.9375rem',
              cursor: 'pointer',
              backgroundColor: activeTab === 'reviews' ? '#C81E1E' : '#FFF',
              color: activeTab === 'reviews' ? '#FFF' : '#4B5563',
              boxShadow: activeTab === 'reviews' ? '0 4px 10px rgba(200,30,30,0.3)' : 'var(--shadow-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Star size={18} /> Reviews
          </button>
        </div>

        {/* TAB 1: KITCHEN LIVE ORDERS */}
        {activeTab === 'orders' && (
          <div>
            {/* Status Filter Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {['All', 'Pending', 'Preparing', 'Served', 'Completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setOrderFilter(status)}
                  style={{
                    padding: '0.45rem 0.9rem',
                    borderRadius: '9999px',
                    border: orderFilter === status ? 'none' : '1px solid #D1D5DB',
                    backgroundColor: orderFilter === status ? '#1F2937' : '#FFF',
                    color: orderFilter === status ? '#FFF' : '#4B5563',
                    fontWeight: '700',
                    fontSize: '0.8125rem',
                    cursor: 'pointer'
                  }}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Orders Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {filteredOrders.map((order) => {
                let badgeBg = '#FEF3C7';
                let badgeText = '#B45309';
                if (order.status === 'Preparing') { badgeBg = '#E0F2FE'; badgeText = '#0369A1'; }
                if (order.status === 'Served') { badgeBg = '#DEF7EC'; badgeText = '#03543F'; }
                if (order.status === 'Completed') { badgeBg = '#F3F4F6'; badgeText = '#4B5563'; }

                return (
                  <div
                    key={order.id}
                    style={{
                      backgroundColor: '#FFF',
                      borderRadius: '1rem',
                      border: '1px solid #E5E7EB',
                      boxShadow: 'var(--shadow-md)',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      {/* Card Header: Table No & Status */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6', paddingBottom: '0.75rem', marginBottom: '0.85rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ backgroundColor: '#C81E1E', color: '#FFF', padding: '4px 10px', borderRadius: '6px', fontWeight: '900', fontSize: '1.1rem' }}>
                            TABLE #{order.tableNo}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '600' }}>
                            {order.id}
                          </span>
                        </div>

                        <span style={{ backgroundColor: badgeBg, color: badgeText, padding: '4px 10px', borderRadius: '9999px', fontWeight: '800', fontSize: '0.75rem' }}>
                          {order.status}
                        </span>
                      </div>

                      {/* Timestamp */}
                      <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.85rem' }}>
                        🕒 Ordered at: {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>

                      {/* Items Ordered List */}
                      <div style={{ backgroundColor: '#FAFAFA', borderRadius: '0.5rem', padding: '0.75rem', border: '1px solid #F3F4F6', marginBottom: '0.85rem' }}>
                        {order.items?.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '4px' }}>
                            <span style={{ fontWeight: '700', color: '#111827' }}>
                              {item.quantity}x {item.name}
                            </span>
                            <span style={{ fontWeight: '800', color: '#C81E1E' }}>
                              ₹{item.price * item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Total Payable */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '900', fontSize: '1.05rem', color: '#111827', marginBottom: '1rem' }}>
                        <span>Total Bill</span>
                        <span style={{ color: '#C81E1E' }}>₹{order.totalAmount}</span>
                      </div>
                    </div>

                    {/* Status Action Buttons */}
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {order.status === 'Pending' && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'Preparing')}
                          style={{ flex: 1, padding: '0.5rem', backgroundColor: '#D97706', color: '#FFF', border: 'none', borderRadius: '6px', fontWeight: '700', fontSize: '0.8125rem', cursor: 'pointer' }}
                        >
                          👨‍🍳 Accept & Prepare
                        </button>
                      )}

                      {order.status === 'Preparing' && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'Served')}
                          style={{ flex: 1, padding: '0.5rem', backgroundColor: '#059669', color: '#FFF', border: 'none', borderRadius: '6px', fontWeight: '700', fontSize: '0.8125rem', cursor: 'pointer' }}
                        >
                          🍽️ Mark Served
                        </button>
                      )}

                      {order.status === 'Served' && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'Completed')}
                          style={{ flex: 1, padding: '0.5rem', backgroundColor: '#4B5563', color: '#FFF', border: 'none', borderRadius: '6px', fontWeight: '700', fontSize: '0.8125rem', cursor: 'pointer' }}
                        >
                          ✅ Finish & Clear Bill
                        </button>
                      )}

                      {order.status !== 'Completed' && order.status !== 'Cancelled' && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'Cancelled')}
                          style={{ padding: '0.5rem', backgroundColor: '#FEE2E2', color: '#9B1C1C', border: 'none', borderRadius: '6px', fontWeight: '700', fontSize: '0.8125rem', cursor: 'pointer' }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

            {filteredOrders.length === 0 && (
              <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#6B7280', backgroundColor: '#FFF', borderRadius: '1rem' }}>
                <Clock size={40} style={{ opacity: 0.4, marginBottom: '0.5rem' }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>No orders found in "{orderFilter}"</h3>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MENU EDITOR (CRUD) */}
        {activeTab === 'menu' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#111827', margin: 0 }}>
                Manage Restaurant Menu Catalog
              </h3>
              <button onClick={handleOpenAddModal} className="btn btn-primary" style={{ borderRadius: '0.5rem' }}>
                <Plus size={16} /> Add New Dish
              </button>
            </div>

            {/* Menu Items Table */}
            <div style={{ backgroundColor: '#FFF', borderRadius: '1rem', border: '1px solid #E5E7EB', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead style={{ backgroundColor: '#111827', color: '#FFF' }}>
                  <tr>
                    <th style={{ padding: '0.85rem 1rem' }}>Dish Name</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Category</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Price (₹)</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Type</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Stock Status</th>
                    <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {menu.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: '800', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                        <div>
                          <div>{item.name}</div>
                          {item.badge && <span style={{ fontSize: '0.6875rem', backgroundColor: '#FEF3C7', color: '#D97706', padding: '1px 6px', borderRadius: '4px', fontWeight: '700' }}>{item.badge}</span>}
                        </div>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', color: '#4B5563' }}>{item.category}</td>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: '800', color: '#C81E1E' }}>₹{item.price}</td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span className={`badge ${item.isVeg ? 'badge-veg' : 'badge-nonveg'}`}>
                          {item.isVeg ? 'Veg' : 'Non-Veg'}
                        </span>
                      </td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <button
                          onClick={() => onToggleStock(item.id)}
                          style={{
                            padding: '0.3rem 0.65rem',
                            borderRadius: '9999px',
                            border: 'none',
                            fontWeight: '800',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            backgroundColor: item.inStock ? '#DEF7EC' : '#FDE8E8',
                            color: item.inStock ? '#03543F' : '#9B1C1C'
                          }}
                        >
                          {item.inStock ? 'In Stock' : 'Out of Stock'}
                        </button>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                          <button onClick={() => handleOpenEditModal(item)} style={{ padding: '6px', border: '1px solid #D1D5DB', borderRadius: '6px', backgroundColor: '#FFF', cursor: 'pointer' }}>
                            <Edit2 size={15} color="#4B5563" />
                          </button>
                          <button onClick={() => onDeleteMenuItem(item.id)} style={{ padding: '6px', border: '1px solid #F8B4B4', borderRadius: '6px', backgroundColor: '#FDE8E8', cursor: 'pointer' }}>
                            <Trash2 size={15} color="#9B1C1C" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: TABLE OVERVIEW */}
        {activeTab === 'tables' && (
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#111827', marginBottom: '1.25rem' }}>
              Live Table Seating Status (Tables 1 - 10)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
              {tables.map((table) => {
                const activeOrder = orders.find(o => o.tableNo === table.tableNo && o.status !== 'Completed' && o.status !== 'Cancelled');
                const isOccupied = Boolean(activeOrder);

                return (
                  <div
                    key={table.tableNo}
                    style={{
                      backgroundColor: isOccupied ? '#FEF3C7' : '#FFFFFF',
                      borderRadius: '1rem',
                      border: isOccupied ? '2px solid #D97706' : '1px solid #E5E7EB',
                      padding: '1.25rem',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '1.35rem', fontWeight: '900', color: isOccupied ? '#B45309' : '#111827' }}>
                        TABLE #{table.tableNo}
                      </span>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: '800',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        backgroundColor: isOccupied ? '#D97706' : '#059669',
                        color: '#FFF'
                      }}>
                        {isOccupied ? 'OCCUPIED' : 'FREE'}
                      </span>
                    </div>

                    {isOccupied ? (
                      <div style={{ fontSize: '0.8125rem', color: '#78350F', marginTop: '0.5rem' }}>
                        <div>Order: <strong>{activeOrder.id}</strong></div>
                        <div>Status: <strong>{activeOrder.status}</strong></div>
                        <div>Total: <strong>₹{activeOrder.totalAmount}</strong></div>
                      </div>
                    ) : (
                      <p style={{ fontSize: '0.8125rem', color: '#6B7280', margin: '0.5rem 0 0' }}>
                        Ready for new dine-in guests.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: REVIEWS */}
        {activeTab === 'reviews' && (
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#111827', marginBottom: '1.25rem' }}>
              Customer Ratings & Reviews
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
              {reviews.map((rev) => (
                <div key={rev.id} style={{ backgroundColor: '#FFF', borderRadius: '1rem', padding: '1.25rem', border: '1px solid #E5E7EB', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <strong style={{ fontSize: '1rem', color: '#111827' }}>{rev.name}</strong>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} size={15} fill={i < rev.rating ? '#F59E0B' : '#E5E7EB'} color={i < rev.rating ? '#F59E0B' : '#E5E7EB'} />
                      ))}
                    </div>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#4B5563', fontStyle: 'italic', margin: '0.5rem 0' }}>
                    "{rev.comment}"
                  </p>
                  <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{rev.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADD/EDIT MENU ITEM MODAL */}
        {isMenuModalOpen && (
          <div className="modal-overlay" onClick={() => setIsMenuModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '1.75rem', maxWidth: '500px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '1rem' }}>
                {editingItem ? 'Edit Dish Details' : 'Add New Menu Dish'}
              </h3>
              
              <form onSubmit={handleSaveMenuForm} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Dish Name *</label>
                  <input
                    type="text"
                    required
                    value={menuForm.name}
                    onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Category</label>
                    <select
                      value={menuForm.category}
                      onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={menuForm.price}
                      onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Description</label>
                  <textarea
                    rows={2}
                    value={menuForm.description}
                    onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Image URL</label>
                  <input
                    type="text"
                    value={menuForm.image}
                    onChange={(e) => setMenuForm({ ...menuForm, image: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', fontWeight: '700' }}>
                    <input
                      type="checkbox"
                      checked={menuForm.isVeg}
                      onChange={(e) => setMenuForm({ ...menuForm, isVeg: e.target.checked })}
                    /> Pure Veg
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', fontWeight: '700' }}>
                    <input
                      type="checkbox"
                      checked={menuForm.inStock}
                      onChange={(e) => setMenuForm({ ...menuForm, inStock: e.target.checked })}
                    /> In Stock
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                  <button type="button" onClick={() => setIsMenuModalOpen(false)} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Dish
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

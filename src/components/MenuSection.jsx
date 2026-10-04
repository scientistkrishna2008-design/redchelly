import React, { useState } from 'react';
import { Search, Plus, Minus, Check, Flame, Star, Sparkles } from 'lucide-react';

export default function MenuSection({ menu, cart, onAddToCart, onUpdateQuantity, onOpenTableModal, selectedTable }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All'); // All, Veg, NonVeg

  const categories = [
    'All',
    'Biryani & Rice',
    'Gravies & Curries',
    'Starters & Tandoori',
    'Breads',
    'Beverages & Desserts'
  ];

  const filteredMenu = menu.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = filterType === 'All' || (filterType === 'Veg' ? item.isVeg : !item.isVeg);
    return matchesCategory && matchesSearch && matchesVeg;
  });

  const getCartQuantity = (itemId) => {
    const cartItem = cart.find((i) => i.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <section style={{ padding: '2rem 0 4rem' }}>
      <div className="container">
        
        {/* Banner Card / Hero Prompt Highlights */}
        <div style={{
          background: 'linear-gradient(135deg, #111827 0%, #1F2937 100%)',
          borderRadius: '1.25rem',
          padding: '2rem',
          color: '#FFF',
          marginBottom: '2.5rem',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          border: '1px solid #374151'
        }}>
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '650px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#C81E1E', color: '#FFF', padding: '0.3rem 0.8rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '800', marginBottom: '0.85rem' }}>
              <Sparkles size={14} /> DINE-IN DIGITAL ORDERING SYSTEM
            </div>
            <h2 style={{ fontSize: '2.1rem', fontWeight: '800', margin: '0 0 0.5rem', color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              Fresh, Spiced & Authentic Delicacies at <span style={{ color: '#F59E0B' }}>Red Chelly</span>
            </h2>
            <p style={{ color: '#D1D5DB', fontSize: '0.95rem', marginBottom: '1.25rem', lineHeight: '1.6' }}>
              Located in Thirumalaisamudram, Thanjavur. Order directly from your table — experience our legendary Hyderabadi Dum Biryani, SPL Gravy Chicken & Moghlai Delights.
            </p>
            
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
                📍 <strong style={{ color: '#F59E0B' }}>Table Seating:</strong> 10 Dine-In Tables
              </div>
              {!selectedTable ? (
                <button onClick={onOpenTableModal} className="btn btn-primary pulse-button" style={{ borderRadius: '0.5rem' }}>
                  Select Table Number Now
                </button>
              ) : (
                <div style={{ backgroundColor: '#059669', color: '#FFF', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: '700', fontSize: '0.875rem' }}>
                  ✓ Ordering for Table #{selectedTable}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category Tabs & Search Bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            {/* Search Input */}
            <div style={{ position: 'relative', minWidth: '280px', flex: 1 }}>
              <Search size={18} color="#9CA3AF" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search dishes (e.g. Biryani, Chicken Tikka, Naan)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.7rem 1rem 0.7rem 2.6rem',
                  borderRadius: '0.75rem',
                  border: '1px solid #D1D5DB',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  backgroundColor: '#FFF',
                  boxShadow: 'var(--shadow-sm)'
                }}
              />
            </div>

            {/* Veg / Non-Veg Toggles */}
            <div style={{ display: 'flex', backgroundColor: '#E5E7EB', borderRadius: '0.5rem', padding: '3px' }}>
              {['All', 'Veg', 'NonVeg'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  style={{
                    padding: '0.4rem 0.9rem',
                    borderRadius: '0.375rem',
                    border: 'none',
                    fontWeight: '700',
                    fontSize: '0.8125rem',
                    cursor: 'pointer',
                    backgroundColor: filterType === type ? '#FFF' : 'transparent',
                    color: filterType === type ? (type === 'Veg' ? '#059669' : type === 'NonVeg' ? '#C81E1E' : '#111827') : '#6B7280',
                    boxShadow: filterType === type ? 'var(--shadow-sm)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {type === 'Veg' ? '🟢 Pure Veg' : type === 'NonVeg' ? '🔴 Non-Veg' : 'All Dishes'}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs Scrollable Bar */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.6rem 1.2rem',
                  borderRadius: '9999px',
                  border: activeCategory === cat ? 'none' : '1px solid #D1D5DB',
                  backgroundColor: activeCategory === cat ? '#C81E1E' : '#FFF',
                  color: activeCategory === cat ? '#FFF' : '#374151',
                  fontWeight: '700',
                  fontSize: '0.875rem',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  boxShadow: activeCategory === cat ? '0 4px 10px rgba(200,30,30,0.3)' : 'var(--shadow-sm)',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Menu Items Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {filteredMenu.map((item) => {
            const qty = getCartQuantity(item.id);

            return (
              <div
                key={item.id}
                className="animate-fade-in"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  border: '1px solid #E5E7EB',
                  boxShadow: 'var(--shadow-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  opacity: item.inStock ? 1 : 0.6
                }}
              >
                <div>
                  {/* Image Container */}
                  <div style={{ height: '180px', width: '100%', position: 'relative', overflow: 'hidden', backgroundColor: '#F3F4F6' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";
                      }}
                    />
                    
                    {/* Veg/Non-Veg Badge */}
                    <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                      <span className={`badge ${item.isVeg ? 'badge-veg' : 'badge-nonveg'}`}>
                        {item.isVeg ? '🟢 VEG' : '🔴 NON-VEG'}
                      </span>
                    </div>

                    {/* Special Highlights Badge */}
                    {item.badge && (
                      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        <span className="badge badge-gold" style={{ boxShadow: 'var(--shadow-sm)' }}>
                          🔥 {item.badge}
                        </span>
                      </div>
                    )}

                    {!item.inStock && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        color: '#FFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '800',
                        fontSize: '1.1rem',
                        letterSpacing: '0.05em'
                      }}>
                        OUT OF STOCK
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '1.15rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#111827', margin: 0, lineHeight: '1.3' }}>
                        {item.name}
                      </h3>
                      <div style={{ fontSize: '1.15rem', fontWeight: '900', color: '#C81E1E', whiteSpace: 'nowrap' }}>
                        ₹{item.price}
                      </div>
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: '#6B7280', margin: 0, lineHeight: '1.5', minHeight: '2.5rem' }}>
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div style={{ padding: '0 1.15rem 1.15rem' }}>
                  {!item.inStock ? (
                    <button disabled style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', backgroundColor: '#E5E7EB', color: '#9CA3AF', border: 'none', fontWeight: '700', cursor: 'not-allowed' }}>
                      Unavailable
                    </button>
                  ) : qty === 0 ? (
                    <button
                      onClick={() => onAddToCart(item)}
                      style={{
                        width: '100%',
                        padding: '0.65rem',
                        borderRadius: '0.5rem',
                        backgroundColor: '#FFF',
                        color: '#C81E1E',
                        border: '1.5px solid #C81E1E',
                        fontWeight: '800',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <Plus size={16} /> ADD TO ORDER
                    </button>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#C81E1E', borderRadius: '0.5rem', padding: '0.35rem 0.5rem', color: '#FFF' }}>
                      <button
                        onClick={() => onUpdateQuantity(item.id, qty - 1)}
                        style={{ background: 'none', border: 'none', color: '#FFF', width: '28px', height: '28px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: '800' }}
                      >
                        <Minus size={16} />
                      </button>
                      <span style={{ fontWeight: '900', fontSize: '1rem' }}>{qty}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, qty + 1)}
                        style={{ background: 'none', border: 'none', color: '#FFF', width: '28px', height: '28px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: '800' }}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {filteredMenu.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#6B7280' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>No dishes found</h3>
            <p>Try searching for another dish or clearing filters.</p>
          </div>
        )}

      </div>
    </section>
  );
}

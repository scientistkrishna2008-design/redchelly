import React from 'react';
import { ShoppingBag, Utensils, MapPin, ShieldAlert, Clock, Star, Phone } from 'lucide-react';

export default function Header({
  selectedTable,
  onOpenTableModal,
  cartCount,
  onOpenCart,
  activeOrder,
  onOpenTracker,
  isAdmin,
  setIsAdmin
}) {
  return (
    <header style={{ backgroundColor: '#111827', color: '#FFFFFF', borderBottom: '3px solid #C81E1E', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
      {/* Top Announcement Bar */}
      <div style={{ backgroundColor: '#C81E1E', color: '#FFF', fontSize: '0.8125rem', padding: '0.35rem 0', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span>📍 P2J8+CJJ, Thirumalaisamudram, Tamil Nadu 613401</span>
            <span style={{ opacity: 0.8 }}>|</span>
            <span>📞 096003 60804</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Star size={13} fill="#F59E0B" color="#F59E0B" /> 3.0 (16+ Google Reviews)
            </span>
            <span>₹1–200 per person</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container" style={{ padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => setIsAdmin(false)}>
          <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: '#C81E1E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: '900', fontSize: '1.4rem', boxShadow: '0 2px 8px rgba(200,30,30,0.5)' }}>
            🌶️
          </div>
          <div>
            <h1 style={{ fontSize: '1.45rem', fontWeight: '800', margin: 0, letterSpacing: '-0.02em', color: '#FFF', lineHeight: '1.1' }}>
              RED CHELLY
            </h1>
            <p style={{ fontSize: '0.75rem', color: '#9CA3AF', margin: 0, fontWeight: '500' }}>
              Dine-In & Fast Food • Tirumalaisamudram
            </p>
          </div>
        </div>

        {/* Center / Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          
          {/* Table Selector Pill */}
          <button
            onClick={onOpenTableModal}
            className="pulse-button"
            style={{
              backgroundColor: selectedTable ? '#1F2937' : '#C81E1E',
              color: '#FFFFFF',
              border: selectedTable ? '1.5px solid #F59E0B' : '1px solid #C81E1E',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              fontWeight: '700',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Utensils size={16} color={selectedTable ? '#F59E0B' : '#FFF'} />
            {selectedTable ? (
              <span>Table <strong style={{ color: '#F59E0B', fontSize: '1.05rem' }}>#{selectedTable}</strong> Selected</span>
            ) : (
              <span>Select Table No (1-10)</span>
            )}
          </button>

          {/* Active Order Tracker Button if order placed */}
          {activeOrder && (
            <button
              onClick={onOpenTracker}
              style={{
                backgroundColor: '#059669',
                color: '#FFF',
                border: 'none',
                padding: '0.5rem 0.85rem',
                borderRadius: '9999px',
                fontWeight: '700',
                fontSize: '0.8125rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer'
              }}
            >
              <Clock size={15} />
              <span>Track Order ({activeOrder.status})</span>
            </button>
          )}

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            style={{
              backgroundColor: '#374151',
              color: '#FFF',
              border: '1px solid #4B5563',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              fontWeight: '700',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <ShoppingBag size={17} color="#F59E0B" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span style={{
                backgroundColor: '#C81E1E',
                color: '#FFF',
                fontSize: '0.75rem',
                fontWeight: '900',
                borderRadius: '9999px',
                padding: '2px 7px',
                marginLeft: '4px'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin Switch Toggle */}
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            style={{
              backgroundColor: isAdmin ? '#D97706' : 'transparent',
              color: isAdmin ? '#FFF' : '#D1D5DB',
              border: '1px solid #4B5563',
              padding: '0.45rem 0.85rem',
              borderRadius: '0.5rem',
              fontWeight: '600',
              fontSize: '0.8125rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer'
            }}
          >
            <ShieldAlert size={15} />
            <span>{isAdmin ? "Exit Admin" : "Admin Side"}</span>
          </button>

        </div>
      </div>
    </header>
  );
}

import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, Utensils, Send, AlertCircle } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  selectedTable,
  onOpenTableModal,
  onPlaceOrder,
  isPlacingOrder
}) {
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!selectedTable) {
      onOpenTableModal();
      return;
    }
    onPlaceOrder(specialInstructions);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100vh',
          backgroundColor: '#FFFFFF',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          animation: 'fadeIn 0.2s ease-out'
        }}
      >
        {/* Drawer Header */}
        <div style={{ padding: '1.25rem 1.5rem', backgroundColor: '#111827', color: '#FFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={22} color="#F59E0B" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0 }}>Dine-In Cart</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Selected Table Status Banner */}
        <div style={{
          backgroundColor: selectedTable ? '#FDE8E8' : '#FEF3C7',
          padding: '0.85rem 1.5rem',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: '700', color: selectedTable ? '#9B1C1C' : '#B45309' }}>
            <Utensils size={18} />
            {selectedTable ? (
              <span>Ordering for <strong style={{ textDecoration: 'underline' }}>Table #{selectedTable}</strong></span>
            ) : (
              <span>⚠️ No Table Selected Yet</span>
            )}
          </div>
          <button
            onClick={onOpenTableModal}
            style={{
              backgroundColor: '#1F2937',
              color: '#FFF',
              border: 'none',
              borderRadius: '6px',
              padding: '0.3rem 0.6rem',
              fontSize: '0.75rem',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            {selectedTable ? 'Change Table' : 'Pick Table'}
          </button>
        </div>

        {/* Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#9CA3AF' }}>
              <ShoppingBag size={48} style={{ opacity: 0.4, marginBottom: '0.75rem' }} />
              <p style={{ fontWeight: '700', fontSize: '1.1rem', color: '#4B5563' }}>Your cart is empty</p>
              <p style={{ fontSize: '0.875rem' }}>Select delicious dishes from our menu to begin.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.85rem',
                    borderRadius: '0.75rem',
                    border: '1px solid #E5E7EB',
                    backgroundColor: '#FAFAFA'
                  }}
                >
                  <div style={{ flex: 1, paddingRight: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontSize: '0.7rem' }}>{item.isVeg ? '🟢' : '🔴'}</span>
                      <h4 style={{ fontSize: '0.9375rem', fontWeight: '800', margin: 0, color: '#111827' }}>{item.name}</h4>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#C81E1E', fontWeight: '800', marginTop: '2px' }}>
                      ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#E5E7EB', borderRadius: '6px' }}>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        style={{ border: 'none', background: 'none', padding: '4px 8px', cursor: 'pointer', fontWeight: '800' }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ fontWeight: '800', padding: '0 6px', fontSize: '0.875rem' }}>{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        style={{ border: 'none', background: 'none', padding: '4px 8px', cursor: 'pointer', fontWeight: '800' }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      style={{ border: 'none', background: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Special Instructions Note */}
              <div style={{ marginTop: '1rem' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '4px' }}>
                  Special Instructions / Kitchen Notes:
                </label>
                <textarea
                  placeholder="E.g., Make gravy extra spicy, less oil, bring extra raita..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  style={{
                    width: '100%',
                    height: '65px',
                    borderRadius: '0.5rem',
                    border: '1px solid #D1D5DB',
                    padding: '0.5rem',
                    fontSize: '0.8125rem',
                    outline: 'none',
                    resize: 'none'
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Billing */}
        {cart.length > 0 && (
          <div style={{ padding: '1.25rem 1.5rem', borderTop: '2px solid #E5E7EB', backgroundColor: '#F9FAFB' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#4B5563' }}>
              <span>Item Subtotal ({cart.reduce((sum, i) => sum + i.quantity, 0)} items)</span>
              <span>₹{totalAmount}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '900', color: '#111827' }}>
              <span>Total Payable</span>
              <span style={{ color: '#C81E1E' }}>₹{totalAmount}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isPlacingOrder}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: '0.65rem',
                fontSize: '1rem',
                fontWeight: '800',
                boxShadow: '0 4px 14px rgba(200,30,30,0.4)'
              }}
            >
              <Send size={18} />
              {isPlacingOrder ? "Sending Order to Kitchen..." : selectedTable ? `Send Order to Kitchen (Table #${selectedTable})` : "Select Table & Place Order"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

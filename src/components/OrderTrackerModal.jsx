import React from 'react';
import { Clock, CheckCircle, ChefHat, UtensilsCrossed, X, AlertCircle } from 'lucide-react';

export default function OrderTrackerModal({ isOpen, onClose, activeOrder }) {
  if (!isOpen || !activeOrder) return null;

  const statuses = ['Pending', 'Preparing', 'Served', 'Completed'];
  const currentStatusIndex = statuses.indexOf(activeOrder.status);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '1.75rem', maxWidth: '520px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ backgroundColor: '#C81E1E', color: '#FFF', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '800' }}>
                LIVE ORDER
              </span>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '800', margin: 0, color: '#111827' }}>
                Table #{activeOrder.tableNo} Status
              </h2>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#6B7280', margin: '2px 0 0' }}>
              Order ID: <strong style={{ color: '#111827' }}>{activeOrder.id}</strong> • {new Date(activeOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
            <X size={22} />
          </button>
        </div>

        {/* Live Status Progress Bar */}
        <div style={{ backgroundColor: '#F9FAFB', borderRadius: '1rem', padding: '1.25rem', border: '1px solid #E5E7EB', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
            
            {/* Step 1: Pending */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '9999px',
                backgroundColor: currentStatusIndex >= 0 ? '#C81E1E' : '#E5E7EB',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Clock size={20} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', marginTop: '6px', color: currentStatusIndex >= 0 ? '#111827' : '#9CA3AF' }}>
                Received
              </span>
            </div>

            {/* Step 2: Preparing */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '9999px',
                backgroundColor: currentStatusIndex >= 1 ? '#D97706' : '#E5E7EB',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ChefHat size={20} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', marginTop: '6px', color: currentStatusIndex >= 1 ? '#111827' : '#9CA3AF' }}>
                Preparing
              </span>
            </div>

            {/* Step 3: Served */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '9999px',
                backgroundColor: currentStatusIndex >= 2 ? '#059669' : '#E5E7EB',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <UtensilsCrossed size={20} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', marginTop: '6px', color: currentStatusIndex >= 2 ? '#111827' : '#9CA3AF' }}>
                Served
              </span>
            </div>

          </div>
        </div>

        {/* Ordered Items Breakdown */}
        <h4 style={{ fontSize: '0.9375rem', fontWeight: '800', marginBottom: '0.75rem', color: '#111827' }}>
          Items Ordered:
        </h4>
        <div style={{ maxHeight: '180px', overflowY: 'auto', marginBottom: '1.25rem' }}>
          {activeOrder.items?.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.6rem 0',
                borderBottom: '1px solid #F3F4F6',
                fontSize: '0.875rem'
              }}
            >
              <div>
                <span style={{ fontWeight: '700', color: '#111827' }}>{item.quantity}x {item.name}</span>
              </div>
              <span style={{ fontWeight: '800', color: '#C81E1E' }}>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '2px solid #E5E7EB' }}>
          <span style={{ fontSize: '1.05rem', fontWeight: '800' }}>Total Amount</span>
          <span style={{ fontSize: '1.35rem', fontWeight: '900', color: '#C81E1E' }}>₹{activeOrder.totalAmount}</span>
        </div>

        <button
          onClick={onClose}
          className="btn btn-secondary"
          style={{ width: '100%', marginTop: '1.25rem', borderRadius: '0.5rem', fontWeight: '700' }}
        >
          Close Tracker
        </button>

      </div>
    </div>
  );
}

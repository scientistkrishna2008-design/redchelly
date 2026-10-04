import React from 'react';
import { Utensils, CheckCircle2, X } from 'lucide-react';

export default function TableSelectorModal({ isOpen, onClose, selectedTable, onSelectTable, tables }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '1.75rem', maxWidth: '540px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#111827', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Utensils color="#C81E1E" size={24} /> Select Your Table Number
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', marginTop: '4px' }}>
              Please pick the table number you are currently seated at (Tables 1 - 10)
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
            <X size={22} />
          </button>
        </div>

        {/* Grid of 10 Tables */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem', margin: '1.25rem 0' }}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((tableNum) => {
            const isSelected = selectedTable === tableNum;
            const tableInfo = tables?.find(t => t.tableNo === tableNum);
            const isOccupied = tableInfo?.status === "Occupied";

            return (
              <button
                key={tableNum}
                onClick={() => {
                  onSelectTable(tableNum);
                  onClose();
                }}
                style={{
                  height: '80px',
                  borderRadius: '12px',
                  border: isSelected ? '3px solid #C81E1E' : '2px solid #E5E7EB',
                  backgroundColor: isSelected ? '#FDE8E8' : isOccupied ? '#FEF3C7' : '#FFFFFF',
                  color: isSelected ? '#9B1C1C' : '#1F2937',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justify: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease-in-out',
                  position: 'relative',
                  boxShadow: isSelected ? '0 4px 12px rgba(200,30,30,0.2)' : 'none'
                }}
              >
                {isSelected && (
                  <CheckCircle2 size={16} color="#C81E1E" style={{ position: 'absolute', top: '6px', right: '6px' }} />
                )}
                <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6B7280', marginTop: '6px' }}>TABLE</span>
                <span style={{ fontSize: '1.5rem', fontWeight: '900', lineHeight: '1.1' }}>{tableNum}</span>
                <span style={{ fontSize: '0.65rem', fontWeight: '700', color: isOccupied ? '#D97706' : '#059669', marginBottom: '4px' }}>
                  {isOccupied ? 'Occupied' : 'Free'}
                </span>
              </button>
            );
          })}
        </div>

        <div style={{ backgroundColor: '#F9FAFB', padding: '0.85rem', borderRadius: '8px', fontSize: '0.8125rem', color: '#4B5563', border: '1px solid #E5E7EB', textAlign: 'center' }}>
          💡 Your selected table number will be linked directly to your kitchen order so food is delivered right to your table!
        </div>

      </div>
    </div>
  );
}

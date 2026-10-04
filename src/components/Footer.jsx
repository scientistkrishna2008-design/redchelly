import React from 'react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#111827', color: '#9CA3AF', padding: '2.5rem 0 1.5rem', borderTop: '3px solid #C81E1E' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
        
        <div style={{ maxWidth: '360px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FFF', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.4rem' }}>🌶️</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0 }}>RED CHELLY RESTAURANT</h3>
          </div>
          <p style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
            Cherished culinary spot in Tirumalaisamudram, Thanjavur. Known for our Hyderabadi Dum Biryani, SPL Gravy Chicken, Tandoori Starters & seamless Table QR Ordering.
          </p>
        </div>

        <div>
          <h4 style={{ color: '#FFF', fontSize: '0.95rem', fontWeight: '800', marginBottom: '0.75rem' }}>Location & Contact</h4>
          <p style={{ fontSize: '0.85rem', margin: '0 0 4px' }}>📍 P2J8+CJJ, Thirumalaisamudram, Tamil Nadu 613401</p>
          <p style={{ fontSize: '0.85rem', margin: '0 0 4px' }}>📞 096003 60804</p>
          <p style={{ fontSize: '0.85rem', margin: 0 }}>🕒 Open Daily • Closes 9:00 PM</p>
        </div>

        <div>
          <h4 style={{ color: '#FFF', fontSize: '0.95rem', fontWeight: '800', marginBottom: '0.75rem' }}>Highlights</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <li>• Hyderabadi Chicken Dum Biryani</li>
            <li>• SPL Gravy Chicken</li>
            <li>• Moghlai Chi Gravy</li>
            <li>• Tandoori Chicken Tikka</li>
          </ul>
        </div>

      </div>

      <div style={{ borderTop: '1px solid #1F2937', marginTop: '2rem', paddingTop: '1rem', textAlign: 'center', fontSize: '0.75rem', color: '#6B7280' }}>
        © 2026 Red Chelly Restaurant • Dine-In Digital Table Ordering & Kitchen KDS Platform.
      </div>
    </footer>
  );
}

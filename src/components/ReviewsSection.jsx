import React, { useState } from 'react';
import { Star, MessageSquare, Send } from 'lucide-react';

export default function ReviewsSection({ reviews, onSubmitReview }) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment) return;
    onSubmitReview({ name: name || 'Dine-In Customer', rating: Number(rating), comment });
    setSubmitted(true);
    setName('');
    setComment('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section style={{ backgroundColor: '#FFFFFF', padding: '3rem 0', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#FEF3C7', color: '#D97706', padding: '0.3rem 0.8rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '800', marginBottom: '0.5rem' }}>
            <Star size={14} fill="#D97706" /> GOOGLE REVIEWS & FEEDBACK
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#111827', margin: 0 }}>
            What Our Customers Say
          </h2>
          <p style={{ color: '#6B7280', fontSize: '0.9rem', marginTop: '4px' }}>
            Google Rating: <strong>3.0 ⭐ (16 Reviews)</strong> • Tirumalaisamudram, Thanjavur
          </p>
        </div>

        {/* Reviews Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {reviews.map((rev) => (
            <div
              key={rev.id}
              style={{
                backgroundColor: '#F9FAFB',
                borderRadius: '1rem',
                padding: '1.25rem',
                border: '1px solid #E5E7EB',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: '800', fontSize: '0.95rem', color: '#111827' }}>{rev.name}</span>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={14} fill={i < rev.rating ? '#F59E0B' : '#E5E7EB'} color={i < rev.rating ? '#F59E0B' : '#E5E7EB'} />
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

        {/* Submit Review Box */}
        <div style={{ maxWidth: '560px', margin: '0 auto', backgroundColor: '#F9FAFB', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #E5E7EB' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#111827', margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <MessageSquare size={18} color="#C81E1E" /> Leave a Review
          </h3>

          {submitted ? (
            <div style={{ padding: '1rem', backgroundColor: '#DEF7EC', color: '#03543F', borderRadius: '0.5rem', fontWeight: '700', fontSize: '0.875rem', textAlign: 'center' }}>
              Thank you for sharing your feedback with Red Chelly!
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '2px' }}>Your Name</label>
                  <input
                    type="text"
                    placeholder="E.g., Priya S."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '2px' }}>Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
                  >
                    <option value={5}>5 Stars ⭐⭐⭐⭐⭐</option>
                    <option value={4}>4 Stars ⭐⭐⭐⭐</option>
                    <option value={3}>3 Stars ⭐⭐⭐</option>
                    <option value={2}>2 Stars ⭐⭐</option>
                    <option value={1}>1 Star ⭐</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '2px' }}>Review Comment</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us about the biryani taste, gravy quality, or dine-in experience..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ borderRadius: '0.5rem', alignSelf: 'flex-start' }}>
                <Send size={15} /> Submit Feedback
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Plus, Star } from 'lucide-react';
import { SHOP_B_CATEGORIES } from '../../data/mockData';

export const ServicesScreen = () => {
  const { services, selectedCategory, setSelectedCategory, setBookingService, setIsBookingOpen } = useApp();
  const [keyword, setKeyword] = useState('');

  const filtered = services.filter((s) => {
    const matchCat = selectedCategory === 'all' || s.category === selectedCategory;
    const matchQuery =
      s.name.toLowerCase().includes(keyword.toLowerCase()) ||
      s.description.toLowerCase().includes(keyword.toLowerCase());
    return matchCat && matchQuery;
  });

  const handleBook = (svc) => {
    setBookingService(svc);
    setIsBookingOpen(true);
  };

  return (
    <div style={{ padding: '16px 20px 120px' }} className="animate-fade-up">
      {/* Title */}
      <div style={{ marginBottom: '14px' }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '800',
          color: '#691F31',
          letterSpacing: '-0.01em'
        }}>
          Menu Dịch Vụ Tiệm B
        </h2>
        <p style={{ fontSize: '11.5px', color: 'rgba(105, 31, 49, 0.65)', marginTop: '2px' }}>
          Liệu trình cao cấp, chuẩn chuyên gia & giá cọc minh bạch
        </p>
      </div>

      {/* Clean Search Input - Warm Glass */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '999px',
        padding: '10px 16px',
        border: '1px solid rgba(201, 168, 117, 0.25)',
        boxShadow: '0 4px 16px rgba(105, 31, 49, 0.04)',
        marginBottom: '14px'
      }}>
        <Search size={16} color="rgba(105, 31, 49, 0.6)" />
        <input
          type="text"
          placeholder="Tìm dịch vụ làm đẹp tại Tiệm B..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            fontSize: '12.5px',
            width: '100%',
            padding: 0,
            color: '#691F31',
            boxShadow: 'none'
          }}
        />
        {keyword && (
          <button onClick={() => setKeyword('')} style={{ fontSize: '11px', color: '#691F31', fontWeight: '700' }}>
            Xóa
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '6px',
        marginBottom: '16px',
        scrollbarWidth: 'none'
      }}>
        {SHOP_B_CATEGORIES.map((c) => {
          const isSel = selectedCategory === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              style={{
                padding: '7px 15px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: isSel ? '800' : '600',
                backgroundColor: isSel ? '#691F31' : 'rgba(255, 255, 255, 0.85)',
                color: isSel ? '#F8F2EC' : '#691F31',
                border: isSel ? 'none' : '1px solid rgba(201, 168, 117, 0.22)',
                boxShadow: isSel ? '0 4px 12px rgba(105, 31, 49, 0.25)' : 'none',
                whiteSpace: 'nowrap',
                transition: 'all 0.18s ease'
              }}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      {/* Services List - Individual cards that jump to blush pink on hover */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.length === 0 ? (
          <div className="warm-glass-card" style={{ textAlign: 'center', padding: '40px 10px', color: 'rgba(105, 31, 49, 0.55)', fontSize: '13px', borderRadius: '24px' }}>
            Không tìm thấy dịch vụ nào phù hợp!
          </div>
        ) : (
          filtered.map((s) => (
            <div
              key={s.id}
              onClick={() => handleBook(s)}
              className="warm-glass-card hover-blush"
              style={{
                padding: '16px 18px',
                borderRadius: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px',
                cursor: 'pointer',
                border: '1px solid rgba(201, 168, 117, 0.22)'
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{
                  fontSize: '13.5px',
                  fontWeight: '800',
                  color: '#691F31',
                  marginBottom: '4px',
                  lineHeight: '1.3'
                }}>
                  {s.name}
                </h3>

                <p style={{
                  fontSize: '11px',
                  color: 'rgba(105, 31, 49, 0.72)',
                  lineHeight: '1.4',
                  marginBottom: '6px'
                }}>
                  {s.description}
                </p>

                <div style={{
                  fontSize: '11px',
                  color: 'rgba(105, 31, 49, 0.65)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{
                    backgroundColor: 'rgba(201, 168, 117, 0.2)',
                    padding: '2px 7px',
                    borderRadius: '999px',
                    fontSize: '10px',
                    fontWeight: '800',
                    color: '#691F31',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '2px'
                  }}>
                    <Star size={9} fill="#C9A875" color="#C9A875" />
                    <span>4.9★</span>
                  </span>
                  <span style={{
                    backgroundColor: '#F6E1DB',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontSize: '10px',
                    fontWeight: '700',
                    color: '#691F31',
                    border: '1px solid rgba(201, 168, 117, 0.2)'
                  }}>
                    {s.duration} phút
                  </span>
                  <span>Cọc: <strong>{s.deposit.toLocaleString()}đ</strong></span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                <div style={{
                  fontSize: '14.5px',
                  fontWeight: '800',
                  color: '#691F31',
                  whiteSpace: 'nowrap'
                }}>
                  {s.price.toLocaleString()}đ
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBook(s);
                  }}
                  className="btn-burgundy-cta"
                  style={{
                    height: '32px',
                    padding: '0 14px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    boxShadow: '0 2px 8px rgba(105, 31, 49, 0.22)'
                  }}
                >
                  <Plus size={13} />
                  <span>Đặt</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

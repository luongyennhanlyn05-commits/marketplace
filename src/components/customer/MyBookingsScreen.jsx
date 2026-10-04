import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CalendarCheck, Star, QrCode } from 'lucide-react';

export const MyBookingsScreen = () => {
  const { bookings, cancelBooking, completeBooking, setReviewBooking, setCustomerTab, shopInfo } = useApp();
  const [activeTab, setActiveTab] = useState('CONFIRMED');

  const filtered = bookings.filter((b) => b.status === activeTab);

  const handleCancel = (booking) => {
    const confirmCancel = window.confirm(
      `Bạn có chắc chắn muốn hủy lịch hẹn #${booking.id} tại ${shopInfo.name}?\n\nChính sách: Vì hủy trước 24h, Tiệm B sẽ HOÀN TRẢ 100% số tiền cọc (${booking.depositAmount.toLocaleString()}đ) về tài khoản của bạn!`
    );
    if (confirmCancel) {
      cancelBooking(booking.id);
    }
  };

  return (
    <div style={{ padding: '16px 18px 90px' }} className="animate-fade-up">
      <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#691F31', marginBottom: '14px' }}>
        Lịch Hẹn Của Bạn Tại Tiệm B
      </h2>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: '16px',
        padding: '4px',
        marginBottom: '16px',
        border: '1px solid rgba(201, 168, 117, 0.22)',
        boxShadow: '0 2px 10px rgba(105, 31, 49, 0.04)'
      }}>
        {[
          { id: 'CONFIRMED', label: 'Sắp tới' },
          { id: 'COMPLETED', label: 'Đã xong' },
          { id: 'CANCELLED', label: 'Đã hủy' }
        ].map((tab) => {
          const count = bookings.filter((b) => b.status === tab.id).length;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '8px 0',
                borderRadius: '12px',
                fontSize: '11.5px',
                fontWeight: isActive ? '800' : '600',
                backgroundColor: isActive ? '#691F31' : 'transparent',
                color: isActive ? '#FFF8F4' : '#691F31',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                transition: 'all 0.18s ease'
              }}
            >
              <span>{tab.label}</span>
              <span style={{
                fontSize: '9.5px',
                backgroundColor: isActive ? '#F1D0C9' : 'rgba(105, 31, 49, 0.08)',
                color: '#691F31',
                padding: '1px 7px',
                borderRadius: '999px',
                fontWeight: '800'
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.length === 0 ? (
          <div className="warm-glass-card" style={{
            textAlign: 'center',
            padding: '40px 20px',
            borderRadius: '22px',
            border: '1px solid rgba(201, 168, 117, 0.25)'
          }}>
            <CalendarCheck size={36} color="rgba(105, 31, 49, 0.35)" style={{ margin: '0 auto 10px' }} />
            <p style={{ color: '#691F31', fontWeight: '800', fontSize: '14px', marginBottom: '4px' }}>
              Chưa có lịch hẹn nào ở mục này
            </p>
            <p style={{ color: 'rgba(105, 31, 49, 0.68)', fontSize: '11px', marginBottom: '16px' }}>
              Đặt lịch làm đẹp tại Tiệm B ngay để giữ khung giờ phục vụ tốt nhất.
            </p>
            <button
              onClick={() => setCustomerTab('menu')}
              className="btn-burgundy-cta"
              style={{
                padding: '10px 22px',
                borderRadius: '16px',
                fontSize: '12px',
                fontWeight: '700',
                boxShadow: '0 4px 14px rgba(105, 31, 49, 0.22)'
              }}
            >
              Xem bảng giá & Đặt ngay
            </button>
          </div>
        ) : (
          filtered.map((b) => (
            <div
              key={b.id}
              className="warm-glass-card"
              style={{
                borderRadius: '20px',
                padding: '15px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                border: '1px solid rgba(201, 168, 117, 0.25)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontSize: '10px',
                  fontWeight: '800',
                  padding: '3px 9px',
                  borderRadius: '999px',
                  backgroundColor:
                    b.status === 'CONFIRMED'
                      ? 'rgba(46, 125, 50, 0.12)'
                      : b.status === 'COMPLETED'
                      ? '#F1D0C9'
                      : 'rgba(198, 40, 40, 0.12)',
                  color:
                    b.status === 'CONFIRMED'
                      ? '#2E7D32'
                      : b.status === 'COMPLETED'
                      ? '#691F31'
                      : '#C62828'
                }}>
                  {b.statusLabel}
                </span>

                <span style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(105, 31, 49, 0.6)' }}>
                  #{b.id}
                </span>
              </div>

              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#691F31', marginBottom: '2px' }}>
                  {b.serviceName}
                </h3>
                <div style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.68)', marginBottom: '8px' }}>
                  Chuyên viên: <strong>{b.staffName || 'Tiệm B tự sắp xếp'}</strong>
                </div>

                <div style={{
                  backgroundColor: 'rgba(246, 225, 219, 0.45)',
                  padding: '10px 14px',
                  borderRadius: '14px',
                  border: '1px solid rgba(201, 168, 117, 0.22)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ fontSize: '11.5px', color: '#691F31' }}>
                    <div>📅 {b.date}</div>
                    <div style={{ marginTop: '2px' }}>⏰ {b.time}</div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '10px', color: 'rgba(105, 31, 49, 0.6)' }}>Đã cọc:</div>
                    <div style={{ fontSize: '13.5px', fontWeight: '800', color: '#691F31' }}>
                      {b.depositAmount.toLocaleString()}đ
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingTop: '4px' }}>
                {b.status === 'CONFIRMED' && (
                  <>
                    <button
                      onClick={() => handleCancel(b)}
                      style={{
                        padding: '7px 12px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: '600',
                        color: '#C62828',
                        backgroundColor: '#FFEBEE',
                        border: '1px solid rgba(198, 40, 40, 0.2)'
                      }}
                    >
                      Hủy & Hoàn Cọc
                    </button>
                    <button
                      onClick={() => {
                        completeBooking(b.id);
                        setActiveTab('COMPLETED');
                      }}
                      style={{
                        padding: '7px 12px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: '700',
                        color: '#2E7D32',
                        backgroundColor: '#E8F5E9',
                        border: '1px solid rgba(46, 125, 50, 0.3)',
                        cursor: 'pointer'
                      }}
                      title="Mô phỏng thợ làm xong để trải nghiệm đánh giá dịch vụ"
                    >
                      ✓ Đã xong (Đánh giá)
                    </button>
                    <button
                      onClick={() => alert(`Mã Check-in của bạn tại Tiệm B:\n#${b.id}\nGiờ hẹn: ${b.time} ngày ${b.date}\nĐịa chỉ: ${shopInfo.address}`)}
                      className="btn-burgundy-cta"
                      style={{
                        padding: '7px 14px',
                        borderRadius: '14px',
                        fontSize: '11px',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <QrCode size={13} />
                      <span>Check-in</span>
                    </button>
                  </>
                )}

                {b.status === 'COMPLETED' && (
                  b.hasReviewed ? (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#691F31',
                      padding: '5px 12px',
                      backgroundColor: '#F1D0C9',
                      borderRadius: '999px',
                      border: '1px solid rgba(201, 168, 117, 0.3)'
                    }}>
                      <Star size={12} fill="#C9A875" color="#C9A875" />
                      <span>Đã đánh giá {b.userRating || 5}⭐</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setReviewBooking(b)}
                      className="btn-burgundy-cta"
                      style={{
                        padding: '8px 16px',
                        borderRadius: '14px',
                        fontSize: '11px',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <Star size={13} fill="#FFF8F4" />
                      <span>Đánh Giá Trên Google Maps (+50K)</span>
                    </button>
                  )
                )}

                {b.status === 'CANCELLED' && (
                  <div style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.65)', fontStyle: 'italic' }}>
                    Tiệm B đã hoàn tiền cọc vào tài khoản của bạn
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

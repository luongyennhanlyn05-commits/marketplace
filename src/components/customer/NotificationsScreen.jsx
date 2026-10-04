import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, CreditCard, Sparkles, CheckCheck } from 'lucide-react';

export const NotificationsScreen = () => {
  const { notifications, markAllNotificationsRead, setCustomerTab, shopInfo } = useApp();
  const [filterType, setFilterType] = useState('all');

  const filtered = notifications.filter((n) => {
    if (filterType === 'all') return true;
    return n.type === filterType;
  });

  const getNotifIcon = (type) => {
    switch (type) {
      case 'reminder':
        return <Clock size={16} color="#691F31" />;
      case 'payment':
        return <CreditCard size={16} color="#691F31" />;
      default:
        return <Sparkles size={16} color="#691F31" />;
    }
  };

  return (
    <div style={{ padding: '16px 18px 90px' }} className="animate-fade-up">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#691F31' }}>
            Thông Báo Từ {shopInfo.name}
          </h2>
          <p style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.65)' }}>
            Nhắc lịch tự động & Cập nhật cọc (Module d)
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          style={{
            fontSize: '11px',
            color: '#691F31',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: '#F1D0C9',
            padding: '5px 12px',
            borderRadius: '999px',
            border: '1px solid rgba(201, 168, 117, 0.3)'
          }}
        >
          <CheckCheck size={13} />
          <span>Đã đọc</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', overflowX: 'auto', paddingBottom: '2px' }}>
        {[
          { id: 'all', label: 'Tất cả' },
          { id: 'reminder', label: 'Nhắc lịch ⏰' },
          { id: 'payment', label: 'Thanh toán cọc 💳' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '11.5px',
              fontWeight: filterType === tab.id ? '800' : '600',
              backgroundColor: filterType === tab.id ? '#691F31' : 'rgba(255, 255, 255, 0.85)',
              color: filterType === tab.id ? '#FFF8F4' : '#691F31',
              border: filterType === tab.id ? '1px solid #691F31' : '1px solid rgba(201, 168, 117, 0.22)',
              boxShadow: filterType === tab.id ? '0 4px 12px rgba(105, 31, 49, 0.2)' : 'none',
              whiteSpace: 'nowrap',
              transition: 'all 0.18s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.map((n) => (
          <div
            key={n.id}
            className="warm-glass-card"
            style={{
              borderRadius: '18px',
              padding: '13px 15px',
              border: n.read ? '1px solid rgba(201, 168, 117, 0.22)' : '1.5px solid #691F31',
              display: 'flex',
              gap: '12px',
              position: 'relative'
            }}
          >
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              backgroundColor: '#F6E1DB',
              border: '1px solid rgba(201, 168, 117, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {getNotifIcon(n.type)}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#691F31' }}>
                  {n.title}
                </h4>
                <span style={{ fontSize: '10px', color: 'rgba(105, 31, 49, 0.55)' }}>
                  {n.time}
                </span>
              </div>

              <p style={{ fontSize: '11.5px', color: 'rgba(105, 31, 49, 0.72)', lineHeight: '1.45', marginBottom: n.bookingId ? '6px' : '0' }}>
                {n.body}
              </p>

              {n.bookingId && (
                <button
                  onClick={() => setCustomerTab('bookings')}
                  style={{ fontSize: '11px', fontWeight: '700', color: '#691F31', textDecoration: 'underline' }}
                >
                  Xem chi tiết lịch hẹn →
                </button>
              )}
            </div>

            {!n.read && (
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#691F31'
              }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

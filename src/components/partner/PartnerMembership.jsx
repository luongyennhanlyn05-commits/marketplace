import React from 'react';
import { Check } from 'lucide-react';
import { MEMBERSHIP_CARDS } from '../../data/mockData';

export const PartnerMembership = () => {

  return (
    <div style={{ padding: '16px 18px 90px' }} className="animate-fade-up">
      <div style={{ marginBottom: '14px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#62202F' }}>
          Quản Lý Thẻ Thành Viên Tiệm B (Module f)
        </h2>
        <p style={{ fontSize: '11px', color: 'rgba(98, 32, 47, 0.7)', marginTop: '2px' }}>
          Thiết lập các gói ưu đãi thành viên giữ chân khách hàng quen thuộc.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {MEMBERSHIP_CARDS.map((card) => (
          <div
            key={card.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '16px',
              border: card.highlight ? '2px solid #62202F' : '1px solid rgba(98, 32, 47, 0.15)',
              boxShadow: card.highlight ? '0 8px 24px rgba(98, 32, 47, 0.1)' : 'none'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <span style={{ fontSize: '10px', color: 'rgba(98, 32, 47, 0.65)', fontWeight: '700' }}>
                  {card.badge}
                </span>
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#62202F' }}>
                  {card.name}
                </h3>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '16px', fontWeight: '800', color: '#62202F' }}>
                  {card.price.toLocaleString()}đ
                </span>
                <div style={{ fontSize: '10px', color: 'rgba(98, 32, 47, 0.6)' }}>
                  Hạn dùng: {card.validity}
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: '#FBF7E8',
              borderRadius: '12px',
              padding: '10px 12px',
              margin: '10px 0',
              border: '1px solid rgba(245, 208, 198, 0.8)'
            }}>
              <div style={{ fontSize: '11.5px', fontWeight: '800', color: '#62202F', marginBottom: '4px' }}>
                Mức giảm giá dịch vụ: {card.discount}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {card.benefits.map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'rgba(98, 32, 47, 0.85)' }}>
                    <Check size={12} color="#62202F" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => alert(`Đã kích hoạt ưu đãi cho ${card.name} tại Tiệm B!`)}
              style={{
                width: '100%',
                padding: '9px',
                borderRadius: '999px',
                fontSize: '11.5px',
                fontWeight: '700',
                backgroundColor: card.highlight ? '#62202F' : '#F5D0C6',
                color: card.highlight ? '#FBF7E8' : '#62202F'
              }}
            >
              Cập nhật quyền lợi gói
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

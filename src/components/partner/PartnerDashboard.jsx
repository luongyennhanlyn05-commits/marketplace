import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarDays,
  DollarSign,
  Star,
  Sparkles,
  Crown,
  ChevronRight,
  Store
} from 'lucide-react';

export const PartnerDashboard = () => {
  const { shopInfo, services, setOwnerTab, bookings, reviews } = useApp();

  const confirmedCount = bookings.filter((b) => b.status === 'CONFIRMED').length;
  const totalDepositRevenue = bookings
    .filter((b) => b.status === 'CONFIRMED' || b.status === 'COMPLETED')
    .reduce((sum, b) => sum + (b.depositAmount || 0), 0);

  return (
    <div style={{ padding: '16px 18px 90px' }} className="animate-fade-up">
      {/* Top Shop Card */}
      <div className="component-card" style={{
        borderRadius: '20px',
        padding: '16px',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <img
            src={shopInfo.coverImage}
            alt={shopInfo.name}
            style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'cover' }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <span style={{
                fontSize: '10px',
                fontWeight: '800',
                padding: '2px 8px',
                borderRadius: '999px',
                backgroundColor: '#62202F',
                color: '#FBF7E8'
              }}>
                HỆ THỐNG QUẢN LÝ TIỆM B
              </span>
              <span style={{ fontSize: '10px', color: '#2E7D32', fontWeight: 'bold' }}>● Đang mở cửa</span>
            </div>

            <h2 style={{ fontSize: '14px', fontWeight: '800', color: '#62202F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {shopInfo.name}
            </h2>
            <p style={{ fontSize: '11px', color: 'rgba(98, 32, 47, 0.72)' }}>
              {shopInfo.address}
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '18px' }}>
        <div className="component-card" style={{
          borderRadius: '16px',
          padding: '12px 14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(98, 32, 47, 0.7)', fontSize: '11px', marginBottom: '4px' }}>
            <DollarSign size={14} color="#62202F" />
            <span>Tiền cọc đã nhận</span>
          </div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#62202F' }}>
            {totalDepositRevenue.toLocaleString()}đ
          </div>
        </div>

        <div className="component-card" style={{
          borderRadius: '16px',
          padding: '12px 14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(98, 32, 47, 0.7)', fontSize: '11px', marginBottom: '4px' }}>
            <CalendarDays size={14} color="#62202F" />
            <span>Lịch hẹn đang chờ</span>
          </div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#62202F' }}>
            {confirmedCount} lịch hẹn
          </div>
        </div>

        <div className="component-card" style={{
          borderRadius: '16px',
          padding: '12px 14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(98, 32, 47, 0.7)', fontSize: '11px', marginBottom: '4px' }}>
            <Star size={14} color="#62202F" />
            <span>Đánh giá Tiệm B</span>
          </div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#62202F' }}>
            {shopInfo.rating} ⭐ ({shopInfo.reviewCount})
          </div>
        </div>

        <div className="component-card" style={{
          borderRadius: '16px',
          padding: '12px 14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(98, 32, 47, 0.7)', fontSize: '11px', marginBottom: '4px' }}>
            <Sparkles size={14} color="#62202F" />
            <span>Menu dịch vụ</span>
          </div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#62202F' }}>
            {services.length} dịch vụ
          </div>
        </div>
      </div>

      {/* Modules Menu */}
      <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#62202F', marginBottom: '10px' }}>
        Các phân hệ quản lý của Tiệm B
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Calendar & Lock Slots */}
        <div
          onClick={() => setOwnerTab('calendar')}
          className="component-card card-hover-lift"
          style={{
            borderRadius: '16px',
            padding: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              backgroundColor: 'var(--bg-component-sub)',
              border: '1px solid var(--border-component)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#62202F'
            }}>
              <CalendarDays size={18} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#62202F' }}>
                Lịch Làm Việc & Khóa Khung Giờ (Module a)
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(98, 32, 47, 0.72)' }}>
                Chủ động khóa slot khi thợ bận hoặc tiệm kín chỗ
              </div>
            </div>
          </div>
          <ChevronRight size={16} color="#62202F" />
        </div>

        {/* Services & Price Menu */}
        <div
          onClick={() => setOwnerTab('services')}
          className="component-card card-hover-lift"
          style={{
            borderRadius: '16px',
            padding: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              backgroundColor: 'var(--bg-component-sub)',
              border: '1px solid var(--border-component)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#62202F'
            }}>
              <Sparkles size={18} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#62202F' }}>
                Danh Mục Dịch Vụ & Bảng Giá (Module a)
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(98, 32, 47, 0.72)' }}>
                Thêm mới, sửa giá, thời lượng và mức cọc của Tiệm B
              </div>
            </div>
          </div>
          <ChevronRight size={16} color="#62202F" />
        </div>

        {/* VIP Memberships */}
        <div
          onClick={() => setOwnerTab('memberships')}
          className="component-card card-hover-lift"
          style={{
            borderRadius: '16px',
            padding: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              backgroundColor: '#62202F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FBF7E8'
            }}>
              <Crown size={18} color="#DDA74F" />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#62202F' }}>
                Gói Thẻ Thành Viên & Ưu Đãi VIP (Module f)
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(98, 32, 47, 0.72)' }}>
                Quản lý các hạng thẻ Thân thiết, Gold VIP, Diamond
              </div>
            </div>
          </div>
          <ChevronRight size={16} color="#62202F" />
        </div>

        {/* Reviews & Feedback Moderation */}
        <div
          onClick={() => setOwnerTab('shop_profile')}
          className="component-card card-hover-lift"
          style={{
            borderRadius: '16px',
            padding: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              backgroundColor: 'rgba(241, 208, 201, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#691F31'
            }}>
              <Star size={18} fill="#C9A875" color="#C9A875" />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#691F31', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Đánh Giá & Phản Hồi Dịch Vụ</span>
                <span style={{ fontSize: '10px', backgroundColor: '#E8F5E9', color: '#2E7D32', padding: '1px 6px', borderRadius: '4px', fontWeight: '700' }}>
                  {shopInfo.rating}⭐ ({reviews.length})
                </span>
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.72)' }}>
                Xem feedback, trả lời khách & xử lý vi phạm chính sách Marketplace
              </div>
            </div>
          </div>
          <ChevronRight size={16} color="#691F31" />
        </div>

        {/* Shop Profile */}
        <div
          onClick={() => setOwnerTab('shop_profile')}
          className="component-card card-hover-lift"
          style={{
            borderRadius: '16px',
            padding: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              backgroundColor: 'var(--bg-component-sub)',
              border: '1px solid var(--border-component)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#62202F'
            }}>
              <Store size={18} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#62202F' }}>
                Thông Tin Cơ Sở Tiệm B (Module a)
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(98, 32, 47, 0.72)' }}>
                Địa chỉ, Hotline, Giờ hoạt động và giới thiệu không gian
              </div>
            </div>
          </div>
          <ChevronRight size={16} color="#62202F" />
        </div>
      </div>
    </div>
  );
};

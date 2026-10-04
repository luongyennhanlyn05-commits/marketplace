import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Store, CheckCircle2, Save, Star } from 'lucide-react';
import { PartnerReviews } from './PartnerReviews';

export const PartnerProfile = () => {
  const { shopInfo, updateShopInfo, reviews } = useApp();
  const [profileTab, setProfileTab] = useState('info'); // 'info' | 'reviews'

  const flaggedCount = reviews.filter((r) => r.status === 'FLAGGED').length;

  const [formData, setFormData] = useState({
    name: shopInfo.name,
    tagline: shopInfo.tagline,
    address: shopInfo.address,
    hotline: shopInfo.hotline,
    openTime: shopInfo.openTime,
    closeTime: shopInfo.closeTime,
    description: shopInfo.description
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateShopInfo(formData);
    alert('Đã cập nhật thông tin Tiệm B thành công! Khách hàng sẽ thấy thông tin mới nhất trên hồ sơ cơ sở.');
  };

  return (
    <div style={{ padding: '16px 18px 90px' }} className="animate-fade-up">
      {/* Header */}
      <div style={{ marginBottom: '14px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#691F31', margin: 0 }}>
          Hồ Sơ Cơ Sở & Quản Lý Đánh Giá
        </h2>
        <p style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.7)', marginTop: '3px' }}>
          Quản lý thông tin tiệm, duyệt hiển thị và phản hồi nhận xét sau dịch vụ.
        </p>
      </div>

      {/* Verified Online Status */}
      <div style={{
        backgroundColor: '#E8F5E9',
        border: '1.5px solid #2E7D32',
        borderRadius: '16px',
        padding: '10px 14px',
        marginBottom: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <CheckCircle2 size={20} color="#2E7D32" style={{ flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: '12px', fontWeight: '800', color: '#2E7D32' }}>
            HỆ THỐNG ĐÃ KÍCH HOẠT NHẬN ĐẶT CỌC & ĐÁNH GIÁ
          </div>
          <div style={{ fontSize: '10.5px', color: '#1B5E20', marginTop: '1px' }}>
            Cơ sở Tiệm B đang hoạt động trực tuyến sẵn sàng đón tiếp khách & thu thập feedback.
          </div>
        </div>
      </div>

      {/* Sub Tabs: Thông Tin Cơ Sở vs Quản Lý Đánh Giá */}
      <div style={{
        display: 'flex',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: '16px',
        padding: '4px',
        marginBottom: '16px',
        border: '1px solid rgba(201, 168, 117, 0.25)',
        boxShadow: '0 2px 8px rgba(105, 31, 49, 0.04)'
      }}>
        <button
          onClick={() => setProfileTab('info')}
          style={{
            flex: 1,
            padding: '9px 0',
            borderRadius: '12px',
            fontSize: '11.5px',
            fontWeight: profileTab === 'info' ? '800' : '600',
            backgroundColor: profileTab === 'info' ? '#691F31' : 'transparent',
            color: profileTab === 'info' ? '#FFF8F4' : '#691F31',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: 'pointer',
            transition: 'all 0.18s ease'
          }}
        >
          <Store size={14} />
          <span>Thông tin cơ sở</span>
        </button>

        <button
          onClick={() => setProfileTab('reviews')}
          style={{
            flex: 1,
            padding: '9px 0',
            borderRadius: '12px',
            fontSize: '11.5px',
            fontWeight: profileTab === 'reviews' ? '800' : '600',
            backgroundColor: profileTab === 'reviews' ? '#691F31' : 'transparent',
            color: profileTab === 'reviews' ? '#FFF8F4' : '#691F31',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: 'pointer',
            position: 'relative',
            transition: 'all 0.18s ease'
          }}
        >
          <Star size={14} fill={profileTab === 'reviews' ? '#C9A875' : '#691F31'} />
          <span>Đánh giá & Phản hồi</span>
          {flaggedCount > 0 && (
            <span style={{
              fontSize: '9px',
              backgroundColor: '#D97706',
              color: '#FFFFFF',
              padding: '1px 6px',
              borderRadius: '999px',
              fontWeight: '800'
            }}>
              {flaggedCount}
            </span>
          )}
        </button>
      </div>

      {/* TAB CONTENT */}
      {profileTab === 'info' ? (
        <div
          className="warm-glass-card"
          style={{
            borderRadius: '20px',
            padding: '16px',
            border: '1px solid rgba(201, 168, 117, 0.28)',
            backgroundColor: '#FFFFFF'
          }}
        >
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: '800', color: '#691F31', display: 'block', marginBottom: '3px' }}>
                Tên cơ sở:
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '12px', fontSize: '12px', border: '1px solid rgba(201, 168, 117, 0.35)', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: '800', color: '#691F31', display: 'block', marginBottom: '3px' }}>
                Khẩu hiệu / Slogan:
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '12px', fontSize: '12px', border: '1px solid rgba(201, 168, 117, 0.35)', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '800', color: '#691F31', display: 'block', marginBottom: '3px' }}>
                  Hotline đặt hẹn:
                </label>
                <input
                  type="text"
                  value={formData.hotline}
                  onChange={(e) => setFormData({ ...formData, hotline: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '12px', fontSize: '12px', border: '1px solid rgba(201, 168, 117, 0.35)', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '800', color: '#691F31', display: 'block', marginBottom: '3px' }}>
                  Giờ phục vụ:
                </label>
                <input
                  type="text"
                  value={`${formData.openTime} - ${formData.closeTime}`}
                  onChange={(e) => {
                    const parts = e.target.value.split('-');
                    if (parts.length === 2) {
                      setFormData({ ...formData, openTime: parts[0].trim(), closeTime: parts[1].trim() });
                    }
                  }}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '12px', fontSize: '12px', border: '1px solid rgba(201, 168, 117, 0.35)', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: '800', color: '#691F31', display: 'block', marginBottom: '3px' }}>
                Địa chỉ cơ sở:
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '12px', fontSize: '12px', border: '1px solid rgba(201, 168, 117, 0.35)', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: '800', color: '#691F31', display: 'block', marginBottom: '3px' }}>
                Giới thiệu không gian tiệm:
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '12px', fontSize: '12px', resize: 'none', border: '1px solid rgba(201, 168, 117, 0.35)', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: '6px',
                backgroundColor: '#691F31',
                color: '#FFF8F4',
                padding: '12px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: '700',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(105, 31, 49, 0.25)'
              }}
            >
              <Save size={15} />
              <span>Lưu Thông Tin Tiệm B</span>
            </button>
          </form>
        </div>
      ) : (
        /* REVIEWS & FEEDBACK MANAGEMENT */
        <PartnerReviews />
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Store,
  CheckCircle2,
  Save,
  Star,
  Camera,
  MapPin,
  Clock,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
  Settings,
  Plus,
  Trash2,
  ExternalLink,
  Check,
  AlertCircle
} from 'lucide-react';
import { PartnerReviews } from './PartnerReviews';

export const PartnerProfile = () => {
  const { shopInfo, updateShopInfo, reviews, staffList } = useApp();
  const [profileTab, setProfileTab] = useState('brand'); // 'brand' | 'operations' | 'staff' | 'reviews'

  const flaggedCount = reviews.filter((r) => r.status === 'FLAGGED').length;

  const [formData, setFormData] = useState({
    name: shopInfo.name || 'B Beauty & Luxury Spa',
    tagline: shopInfo.tagline || 'Không gian thư giãn đẳng cấp & chăm sóc vẻ đẹp chuẩn chuyên gia',
    address: shopInfo.address || '86 Pasteur, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    hotline: shopInfo.hotline || '0908 888 999',
    openTime: shopInfo.openTime || '08:30',
    closeTime: shopInfo.closeTime || '21:00',
    description: shopInfo.description || 'Tiệm B là không gian làm đẹp cao cấp tích hợp Hair Studio, Nail Art và Spa Trị Liệu.',
    depositRate: shopInfo.depositRate || 20,
    depositPolicy: shopInfo.depositPolicy || 'Quý khách vui lòng đặt cọc giữ khung giờ phục vụ riêng. Tiệm B cam kết hoàn 100% tiền cọc nếu hủy trước 24 giờ.',
    googleMapsUrl: shopInfo.googleMapsUrl || 'https://maps.google.com/?q=86+Pasteur+Ben+Nghe+Quan+1+Ho+Chi+Minh',
    zaloPhone: shopInfo.zaloPhone || '0908888999',
    facebookName: shopInfo.facebookName || 'B Beauty & Luxury Spa',
    instagramTag: shopInfo.instagramTag || '@bbeautyspa.saigon',
    isOnlineActive: true,
    amenities: shopInfo.amenities || [
      '🅿️ Có chỗ đỗ ô tô & xe máy miễn phí',
      '🍵 Trà thảo mộc & bánh ngọt đón tiếp',
      '🧖‍♀️ Phòng trị liệu riêng tư chuẩn VIP',
      '📶 Wi-Fi 5G & sạc điện thoại tại ghế'
    ],
    gallery: shopInfo.gallery || [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80'
    ]
  });

  const [newAmenityText, setNewAmenityText] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e) => {
    if (e) e.preventDefault();
    updateShopInfo(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddAmenity = () => {
    if (!newAmenityText.trim()) return;
    setFormData((prev) => ({
      ...prev,
      amenities: [...prev.amenities, newAmenityText.trim()]
    }));
    setNewAmenityText('');
  };

  const handleRemoveAmenity = (index) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };

  return (
    <div style={{ padding: '16px 18px 130px' }} className="animate-fade-up">
      {/* 1. Header */}
      <div style={{ marginBottom: '14px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#691F31', margin: 0 }}>
          Hồ Sơ Cơ Sở & Quản Lý Hoạt Động
        </h2>
        <p style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.7)', marginTop: '3px' }}>
          Quản lý thông tin tiệm, tiện ích 5 sao, chính sách đặt cọc và đội ngũ chuyên viên.
        </p>
      </div>

      {/* 2. Verified Online Banner */}
      <div style={{
        backgroundColor: '#E8F5E9',
        border: '1.5px solid #2E7D32',
        borderRadius: '16px',
        padding: '10px 14px',
        marginBottom: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={18} color="#2E7D32" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '11.5px', fontWeight: '800', color: '#2E7D32' }}>
              CƠ SỞ ĐANG HOẠT ĐỘNG TRỰC TUYẾN
            </div>
            <div style={{ fontSize: '10px', color: '#1B5E20', marginTop: '1px' }}>
              Tiệm B sẵn sàng đón tiếp khách đặt hẹn & nhận thanh toán đặt cọc 20%.
            </div>
          </div>
        </div>

        <span style={{
          backgroundColor: '#2E7D32',
          color: '#FFFFFF',
          fontSize: '9.5px',
          fontWeight: '800',
          padding: '2px 8px',
          borderRadius: '999px',
          flexShrink: 0
        }}>
          LIVE
        </span>
      </div>

      {/* 3. 4 Segmented Tabs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: '14px',
        padding: '3px',
        marginBottom: '14px',
        border: '1px solid rgba(201, 168, 117, 0.25)',
        gap: '2px'
      }}>
        <button
          onClick={() => setProfileTab('brand')}
          style={{
            padding: '8px 2px',
            borderRadius: '10px',
            fontSize: '10.5px',
            fontWeight: profileTab === 'brand' ? '800' : '600',
            backgroundColor: profileTab === 'brand' ? '#691F31' : 'transparent',
            color: profileTab === 'brand' ? '#FFF8F4' : '#691F31',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px'
          }}
        >
          <Store size={13} />
          <span>Cơ sở & Ảnh</span>
        </button>

        <button
          onClick={() => setProfileTab('operations')}
          style={{
            padding: '8px 2px',
            borderRadius: '10px',
            fontSize: '10.5px',
            fontWeight: profileTab === 'operations' ? '800' : '600',
            backgroundColor: profileTab === 'operations' ? '#691F31' : 'transparent',
            color: profileTab === 'operations' ? '#FFF8F4' : '#691F31',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px'
          }}
        >
          <ShieldCheck size={13} />
          <span>Chính sách cọc</span>
        </button>

        <button
          onClick={() => setProfileTab('staff')}
          style={{
            padding: '8px 2px',
            borderRadius: '10px',
            fontSize: '10.5px',
            fontWeight: profileTab === 'staff' ? '800' : '600',
            backgroundColor: profileTab === 'staff' ? '#691F31' : 'transparent',
            color: profileTab === 'staff' ? '#FFF8F4' : '#691F31',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px'
          }}
        >
          <Users size={13} />
          <span>Kỹ thuật viên</span>
        </button>

        <button
          onClick={() => setProfileTab('reviews')}
          style={{
            padding: '8px 2px',
            borderRadius: '10px',
            fontSize: '10.5px',
            fontWeight: profileTab === 'reviews' ? '800' : '600',
            backgroundColor: profileTab === 'reviews' ? '#691F31' : 'transparent',
            color: profileTab === 'reviews' ? '#FFF8F4' : '#691F31',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            position: 'relative'
          }}
        >
          <Star size={13} fill={profileTab === 'reviews' ? '#D9BD8C' : '#691F31'} />
          <span>Đánh giá</span>
          {flaggedCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '2px',
              right: '4px',
              fontSize: '8.5px',
              backgroundColor: '#D97706',
              color: '#FFFFFF',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800'
            }}>
              {flaggedCount}
            </span>
          )}
        </button>
      </div>

      {/* 4. TAB CONTENTS */}
      {profileTab === 'brand' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Form Brand Info */}
          <div
            className="warm-glass-card"
            style={{
              borderRadius: '20px',
              padding: '16px',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(201, 168, 117, 0.28)'
            }}
          >
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '800', color: '#691F31', display: 'block', marginBottom: '3px' }}>
                  Tên cơ sở làm đẹp:
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '12px', fontSize: '12px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '800', color: '#691F31', display: 'block', marginBottom: '3px' }}>
                  Khẩu hiệu / Slogan tiệm:
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '12px', fontSize: '12px' }}
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
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '12px', fontSize: '12px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: '#691F31', display: 'block', marginBottom: '3px' }}>
                    Khung giờ mở cửa:
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
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '12px', fontSize: '12px' }}
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
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '12px', fontSize: '12px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '800', color: '#691F31', display: 'block', marginBottom: '3px' }}>
                  Giới thiệu không gian & trải nghiệm:
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '12px', fontSize: '12px', resize: 'none' }}
                />
              </div>

              {/* Gallery of Shop Photos */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: '800', color: '#691F31', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
                  <Camera size={13} />
                  <span>Bộ sưu tập hình ảnh không gian tiệm ({formData.gallery.length} ảnh):</span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                  {formData.gallery.map((imgUrl, i) => (
                    <div key={i} style={{ position: 'relative', height: '65px', borderRadius: '10px', overflow: 'hidden' }}>
                      <img src={imgUrl} alt={`Ảnh ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* 5-star Amenities */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: '800', color: '#691F31', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
                  <Sparkles size={13} color="#C9A875" />
                  <span>Tiện ích 5 sao đón tiếp khách:</span>
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {formData.amenities.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 10px',
                        borderRadius: '8px',
                        backgroundColor: '#F8F2EC',
                        fontSize: '11.5px',
                        color: '#691F31'
                      }}
                    >
                      <span>{item}</span>
                      <button type="button" onClick={() => handleRemoveAmenity(index)}>
                        <Trash2 size={12} color="#C62828" />
                      </button>
                    </div>
                  ))}

                  <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                    <input
                      type="text"
                      value={newAmenityText}
                      onChange={(e) => setNewAmenityText(e.target.value)}
                      placeholder="Thêm tiện ích mới (VD: Ghế massage tự động)..."
                      style={{ flex: 1, padding: '7px 10px', borderRadius: '8px', fontSize: '11px' }}
                    />
                    <button
                      type="button"
                      onClick={handleAddAmenity}
                      style={{
                        padding: '7px 12px',
                        borderRadius: '8px',
                        backgroundColor: '#691F31',
                        color: '#FFF8F4',
                        fontSize: '11px',
                        fontWeight: '700'
                      }}
                    >
                      Thêm
                    </button>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="btn-burgundy-cta"
                style={{ width: '100%', marginTop: '8px', gap: '6px' }}
              >
                <Save size={15} />
                <span>{saveSuccess ? '✓ Đã Lưu Thông Tin Cơ Sở' : 'Lưu Thay Đổi Cơ Sở Tiệm B'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {profileTab === 'operations' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div
            className="warm-glass-card"
            style={{
              borderRadius: '20px',
              padding: '16px',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(201, 168, 117, 0.28)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
          >
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#691F31', margin: 0 }}>
                Thiết Lập Chính Sách Đặt Cọc & Hoàn Tiền
              </h3>
              <p style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.7)', marginTop: '2px' }}>
                Hệ thống đặt cọc giữ chỗ chống bùng lịch, bảo vệ quyền lợi của cả tiệm và khách hàng.
              </p>
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: '800', color: '#691F31', display: 'block', marginBottom: '3px' }}>
                Tỷ lệ tiền cọc khi đặt hẹn online:
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[15, 20, 25, 30].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setFormData({ ...formData, depositRate: rate })}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '10px',
                      fontWeight: '800',
                      fontSize: '12px',
                      backgroundColor: formData.depositRate === rate ? '#691F31' : '#F8F2EC',
                      color: formData.depositRate === rate ? '#FFF8F4' : '#691F31',
                      border: formData.depositRate === rate ? '1.5px solid #C9A875' : 'none'
                    }}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: '800', color: '#691F31', display: 'block', marginBottom: '3px' }}>
                Cam kết hoàn tiền cọc hiển thị cho khách:
              </label>
              <textarea
                rows={3}
                value={formData.depositPolicy}
                onChange={(e) => setFormData({ ...formData, depositPolicy: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '12px', fontSize: '12px', resize: 'none' }}
              />
            </div>

            <div style={{
              backgroundColor: '#FFF7F0',
              borderRadius: '12px',
              padding: '10px 12px',
              border: '1px solid rgba(201, 168, 117, 0.35)',
              fontSize: '11px',
              color: '#691F31',
              lineHeight: '1.4'
            }}>
              💡 <strong>Chính sách VIP:</strong> Hội viên Thẻ Kim Cương (Diamond VIP) được miễn trừ phạt cọc và hỗ trợ dời lịch linh hoạt 100%.
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="btn-burgundy-cta"
              style={{ width: '100%', gap: '6px' }}
            >
              <Save size={15} />
              <span>{saveSuccess ? '✓ Đã Cập Nhật Chính Sách' : 'Cập Nhật Chính Sách Đặt Cọc'}</span>
            </button>
          </div>
        </div>
      )}

      {profileTab === 'staff' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#691F31' }}>
              Danh Sách Chuyên Viên Tiệm B ({staffList.length} người):
            </span>
            <button
              onClick={() => alert('Chức năng thêm chuyên viên mới đang kết nối với hệ thống chấm công Tiệm B!')}
              style={{ fontSize: '11px', fontWeight: '700', color: '#691F31', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Plus size={13} />
              <span>Thêm Thợ Mới</span>
            </button>
          </div>

          {staffList.map((staff) => (
            <div
              key={staff.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '12px 14px',
                border: '1px solid rgba(201, 168, 117, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(105, 31, 49, 0.04)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={staff.avatar}
                  alt={staff.name}
                  style={{ width: '42px', height: '42px', borderRadius: '12px', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#691F31' }}>
                    {staff.name}
                  </div>
                  <div style={{ fontSize: '10.5px', color: 'rgba(105, 31, 49, 0.7)' }}>
                    {staff.role}
                  </div>
                  <div style={{ fontSize: '10px', color: '#2E7D32', marginTop: '2px', fontWeight: '700' }}>
                    ⭐ {staff.rating} • {staff.experience}
                  </div>
                </div>
              </div>

              <span style={{
                fontSize: '10px',
                fontWeight: '700',
                padding: '3px 8px',
                borderRadius: '999px',
                backgroundColor: '#E8F5E9',
                color: '#2E7D32'
              }}>
                Đang trực ca
              </span>
            </div>
          ))}
        </div>
      )}

      {profileTab === 'reviews' && (
        <PartnerReviews />
      )}
    </div>
  );
};

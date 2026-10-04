import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Store,
  CheckCircle2,
  Save,
  Star,
  Camera,
  ShieldCheck,
  Sparkles,
  Users,
  Trash2
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
    gallery: shopInfo.gallery || [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: shopInfo.amenities || [
      '🅿️ Có chỗ đỗ ô tô & xe máy miễn phí',
      '🍵 Trà thảo mộc & bánh ngọt đón tiếp',
      '🧖‍♀️ Phòng trị liệu riêng tư chuẩn VIP',
      '📶 Wi-Fi 5G & sạc điện thoại tại ghế'
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
    <div style={{ padding: '20px 20px 140px' }} className="animate-fade-up">
      {/* 1. Header & Status Strip */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '19px', fontWeight: '800', color: '#691F31', margin: 0, letterSpacing: '-0.3px' }}>
            Hồ Sơ Cơ Sở Tiệm B
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2E7D32' }} />
            <span style={{ fontSize: '11px', color: '#2E7D32', fontWeight: '700' }}>
              Trực tuyến sẵn sàng nhận lịch
            </span>
          </div>
        </div>

        <button
          onClick={handleSave}
          style={{
            padding: '8px 16px',
            borderRadius: '999px',
            backgroundColor: '#691F31',
            color: '#FFF8F4',
            fontSize: '11.5px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(105, 31, 49, 0.25)'
          }}
        >
          <Save size={13} />
          <span>{saveSuccess ? 'Đã lưu ✓' : 'Lưu hồ sơ'}</span>
        </button>
      </div>

      {/* 2. Clean Segmented Navigation */}
      <div style={{
        display: 'flex',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        padding: '3px',
        marginBottom: '20px',
        border: '1px solid rgba(201, 168, 117, 0.22)',
        boxShadow: '0 2px 8px rgba(105, 31, 49, 0.02)'
      }}>
        {[
          { id: 'brand', label: 'Thông tin', icon: Store },
          { id: 'operations', label: 'Tiền cọc', icon: ShieldCheck },
          { id: 'staff', label: 'Chuyên viên', icon: Users },
          { id: 'reviews', label: 'Đánh giá', icon: Star, badge: flaggedCount }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = profileTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setProfileTab(tab.id)}
              style={{
                flex: 1,
                padding: '9px 0',
                borderRadius: '13px',
                fontSize: '11px',
                fontWeight: isActive ? '800' : '600',
                backgroundColor: isActive ? '#691F31' : 'transparent',
                color: isActive ? '#FFF8F4' : 'rgba(105, 31, 49, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                position: 'relative',
                transition: 'all 0.18s ease'
              }}
            >
              <Icon size={13} />
              <span>{tab.label}</span>
              {tab.badge > 0 && (
                <span style={{
                  fontSize: '8px',
                  backgroundColor: '#D97706',
                  color: '#FFFFFF',
                  padding: '1px 5px',
                  borderRadius: '999px',
                  fontWeight: '800'
                }}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Tab Contents: Grouped Cards with Generous Breathing Space */}
      {profileTab === 'brand' && (
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Card 1: Thương hiệu */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '22px',
            padding: '18px',
            border: '1px solid rgba(201, 168, 117, 0.22)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: '0 4px 16px rgba(105, 31, 49, 0.02)'
          }}>
            <div style={{ fontSize: '13px', fontWeight: '800', color: '#691F31', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Store size={15} color="#C9A875" />
              <span>Nhận diện thương hiệu</span>
            </div>

            <div>
              <span style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.7)', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                Tên cơ sở:
              </span>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', fontSize: '12.5px' }}
              />
            </div>

            <div>
              <span style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.7)', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                Khẩu hiệu / Slogan:
              </span>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', fontSize: '12.5px' }}
              />
            </div>

            <div>
              <span style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.7)', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                Giới thiệu không gian tiệm:
              </span>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', fontSize: '12px', resize: 'none', lineHeight: '1.45' }}
              />
            </div>
          </div>

          {/* Card 2: Liên hệ & Giờ phục vụ */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '22px',
            padding: '18px',
            border: '1px solid rgba(201, 168, 117, 0.22)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: '0 4px 16px rgba(105, 31, 49, 0.02)'
          }}>
            <div style={{ fontSize: '13px', fontWeight: '800', color: '#691F31', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={15} color="#C9A875" />
              <span>Liên hệ & Phục vụ</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.7)', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                  Hotline đặt hẹn:
                </span>
                <input
                  type="text"
                  value={formData.hotline}
                  onChange={(e) => setFormData({ ...formData, hotline: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', fontSize: '12px' }}
                />
              </div>

              <div>
                <span style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.7)', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                  Giờ mở cửa:
                </span>
                <input
                  type="text"
                  value={`${formData.openTime} - ${formData.closeTime}`}
                  onChange={(e) => {
                    const parts = e.target.value.split('-');
                    if (parts.length === 2) {
                      setFormData({ ...formData, openTime: parts[0].trim(), closeTime: parts[1].trim() });
                    }
                  }}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', fontSize: '12px' }}
                />
              </div>
            </div>

            <div>
              <span style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.7)', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                Địa chỉ:
              </span>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', fontSize: '12px' }}
              />
            </div>
          </div>

          {/* Card 3: Hình ảnh không gian tiệm (Cuộn ngang thoáng đãng) */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '22px',
            padding: '18px',
            border: '1px solid rgba(201, 168, 117, 0.22)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 4px 16px rgba(105, 31, 49, 0.02)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#691F31', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Camera size={15} color="#C9A875" />
                <span>Không gian tiệm ({formData.gallery.length} ảnh)</span>
              </div>
              <span style={{ fontSize: '10.5px', color: 'rgba(105, 31, 49, 0.6)' }}>Vuốt ngang ➔</span>
            </div>

            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
              {formData.gallery.map((imgUrl, i) => (
                <div
                  key={i}
                  style={{
                    width: '130px',
                    height: '90px',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                  }}
                >
                  <img src={imgUrl} alt={`Ảnh ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Tiện ích đón tiếp khách */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '22px',
            padding: '18px',
            border: '1px solid rgba(201, 168, 117, 0.22)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            boxShadow: '0 4px 16px rgba(105, 31, 49, 0.02)'
          }}>
            <div style={{ fontSize: '13px', fontWeight: '800', color: '#691F31' }}>
              Tiện ích phục vụ khách
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {formData.amenities.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    backgroundColor: '#F8F2EC',
                    fontSize: '11.5px',
                    color: '#691F31'
                  }}
                >
                  <span>{item}</span>
                  <button type="button" onClick={() => handleRemoveAmenity(index)}>
                    <Trash2 size={13} color="rgba(105, 31, 49, 0.5)" />
                  </button>
                </div>
              ))}

              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <input
                  type="text"
                  value={newAmenityText}
                  onChange={(e) => setNewAmenityText(e.target.value)}
                  placeholder="Thêm tiện ích (VD: Ghế massage tự động)..."
                  style={{ flex: 1, padding: '8px 12px', borderRadius: '10px', fontSize: '11.5px' }}
                />
                <button
                  type="button"
                  onClick={handleAddAmenity}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '10px',
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

          <button
            type="submit"
            className="btn-burgundy-cta"
            style={{ width: '100%', height: '48px', gap: '6px', marginTop: '4px' }}
          >
            <Save size={16} />
            <span>{saveSuccess ? '✓ Đã Lưu Toàn Bộ Hồ Sơ Cơ Sở' : 'Lưu Thay Đổi Cơ Sở Tiệm B'}</span>
          </button>
        </form>
      )}

      {profileTab === 'operations' && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '22px',
          padding: '20px',
          border: '1px solid rgba(201, 168, 117, 0.22)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#691F31', margin: 0 }}>
              Chính Sách Đặt Cọc & Hoàn Tiền
            </h3>
            <p style={{ fontSize: '11.5px', color: 'rgba(105, 31, 49, 0.65)', marginTop: '3px' }}>
              Quy định đặt cọc bảo đảm giữ khung giờ riêng cho khách
            </p>
          </div>

          <div>
            <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#691F31', display: 'block', marginBottom: '8px' }}>
              Tỷ lệ đặt cọc:
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[15, 20, 25, 30].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setFormData({ ...formData, depositRate: rate })}
                  style={{
                    flex: 1,
                    padding: '10px 0',
                    borderRadius: '12px',
                    fontWeight: '800',
                    fontSize: '13px',
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
            <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#691F31', display: 'block', marginBottom: '6px' }}>
              Cam kết hoàn tiền cọc hiển thị cho khách:
            </span>
            <textarea
              rows={3}
              value={formData.depositPolicy}
              onChange={(e) => setFormData({ ...formData, depositPolicy: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', fontSize: '12px', resize: 'none', lineHeight: '1.45' }}
            />
          </div>

          <div style={{
            backgroundColor: '#FFF8F4',
            borderRadius: '14px',
            padding: '12px 14px',
            fontSize: '11.5px',
            color: '#691F31',
            lineHeight: '1.5',
            border: '1px solid rgba(201, 168, 117, 0.25)'
          }}>
            👑 <strong>Đặc quyền VIP:</strong> Hội viên Thẻ Kim Cương (Diamond VIP) được miễn trừ phạt cọc và được hỗ trợ dời lịch linh hoạt 100%.
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="btn-burgundy-cta"
            style={{ width: '100%', height: '46px', gap: '6px' }}
          >
            <Save size={15} />
            <span>{saveSuccess ? '✓ Đã Lưu Chính Sách' : 'Cập Nhật Chính Sách Cọc'}</span>
          </button>
        </div>
      )}

      {profileTab === 'staff' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {staffList.map((staff) => (
            <div
              key={staff.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '14px 16px',
                border: '1px solid rgba(201, 168, 117, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(105, 31, 49, 0.02)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={staff.avatar}
                  alt={staff.name}
                  style={{ width: '42px', height: '42px', borderRadius: '14px', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: '800', color: '#691F31' }}>
                    {staff.name}
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.65)' }}>
                    {staff.role}
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#2E7D32', marginTop: '2px', fontWeight: '700' }}>
                    ⭐ {staff.rating} • {staff.experience}
                  </div>
                </div>
              </div>

              <span style={{
                fontSize: '10.5px',
                fontWeight: '700',
                padding: '4px 10px',
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

import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarCheck,
  Bell,
  Sparkles,
  ShieldCheck,
  Star,
  ChevronRight,
  Flower2,
  Smile,
  MapPin,
  Navigation,
  Phone,
  Flag,
  X,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { CustomerVipCard } from './CustomerVipCard';

export const HomeScreen = () => {
  const {
    shopInfo,
    services,
    staffList,
    reviews,
    reportReview,
    setBookingService,
    setBookingStaff,
    setIsBookingOpen,
    setCustomerTab,
    unreadCount
  } = useApp();

  const [reviewFilter, setReviewFilter] = useState('all');
  const [reportingReview, setReportingReview] = useState(null);
  const [reportReason, setReportReason] = useState('Nội dung thô tục / xúc phạm');

  const [shopOpenStatus] = useState(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const totalMinutes = currentHour * 60 + currentMinute;
    // 08:30 is 510; 21:00 is 1260
    return totalMinutes >= 510 && totalMinutes <= 1260;
  });

  const isShopOpen = () => shopOpenStatus;

  const handleStartBooking = (service, staff = null) => {
    setBookingService(service || services[0]);
    if (staff) setBookingStaff(staff);
    setIsBookingOpen(true);
  };

  // 3 Mini Featured Services
  const featuredServices = [
    {
      id: 'svc_massage',
      name: 'Massage Trị Liệu',
      duration: '60 phút',
      price: '350.000đ',
      icon: Flower2,
      matchedService: services.find((s) => s.id === 'svc_spa_1') || services[0]
    },
    {
      id: 'svc_skin',
      name: 'Chăm Sóc Da',
      duration: '75 phút',
      price: '450.000đ',
      icon: Smile,
      matchedService: services.find((s) => s.id === 'svc_skin_1') || services[1]
    },
    {
      id: 'svc_hair',
      name: 'Gội Dưỡng Sinh',
      duration: '60 phút',
      price: '250.000đ',
      icon: Sparkles,
      matchedService: services.find((s) => s.id === 'svc_hair_1') || services[2]
    }
  ];

  // Specific stylized staff roles
  const staffRoles = {
    staff_tri: 'Chuyên gia trị liệu',
    staff_mai: 'Chăm sóc da',
    staff_huong: 'Nghệ nhân Nail & Mi',
    staff_ha: 'Gội đầu dưỡng sinh'
  };

  // Only valid approved reviews are displayed publicly
  const approvedReviews = useMemo(() => {
    return (reviews || []).filter((r) => r.status === 'APPROVED');
  }, [reviews]);

  const displayedReviews = useMemo(() => {
    if (reviewFilter === '5star') return approvedReviews.filter((r) => r.rating === 5);
    if (reviewFilter === 'images') return approvedReviews.filter((r) => r.images && r.images.length > 0);
    if (reviewFilter === 'spa') return approvedReviews.filter((r) => (r.serviceName || '').toLowerCase().includes('trị liệu') || (r.serviceName || '').toLowerCase().includes('gội'));
    if (reviewFilter === 'hair') return approvedReviews.filter((r) => (r.serviceName || '').toLowerCase().includes('uốn') || (r.serviceName || '').toLowerCase().includes('nhuộm'));
    if (reviewFilter === 'nail') return approvedReviews.filter((r) => (r.serviceName || '').toLowerCase().includes('gel') || (r.serviceName || '').toLowerCase().includes('móng'));
    return approvedReviews;
  }, [approvedReviews, reviewFilter]);

  const handleSendReport = () => {
    if (reportingReview) {
      reportReview(reportingReview.id, reportReason);
      setReportingReview(null);
    }
  };

  return (
    <div style={{ paddingBottom: '160px' }} className="animate-fade-up">
      {/* 1. Header: Gọn gàng, thoáng đãng, sang trọng */}
      <header style={{
        padding: '16px 20px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo & Tên thương hiệu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '12px',
            backgroundColor: '#691F31',
            color: '#F8F2EC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-serif)',
            fontSize: '18px',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(105, 31, 49, 0.2)'
          }}>
            B
          </div>
          <div>
            <div style={{
              fontSize: '15px',
              fontWeight: '800',
              color: '#691F31',
              letterSpacing: '-0.01em',
              lineHeight: '1.2'
            }}>
              B Beauty Luxury Spa
            </div>
            <div style={{
              fontSize: '10.5px',
              color: 'rgba(105, 31, 49, 0.68)',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              marginTop: '2px'
            }}>
              <MapPin size={11} color="#691F31" />
              <span>86 Pasteur, Q.1</span>
              <span>•</span>
              <span style={{ color: isShopOpen() ? '#2E7D32' : '#C62828' }}>
                {isShopOpen() ? 'Mở cửa' : 'Nghỉ'}
              </span>
            </div>
          </div>
        </div>

        {/* Actions bên phải: Nút Gọi Hotline & Nút Chuông Thông Báo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a
            href={`tel:${shopInfo.hotline ? shopInfo.hotline.replace(/\s+/g, '') : '0908888999'}`}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#F6E1DB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#691F31',
              border: '1px solid rgba(201, 168, 117, 0.25)',
              boxShadow: '0 2px 8px rgba(105, 31, 49, 0.04)',
              textDecoration: 'none',
              transition: 'transform 0.18s'
            }}
            title={`Gọi Hotline Tiệm B (${shopInfo.hotline || '0908 888 999'})`}
          >
            <Phone size={16} />
          </a>

          {/* Nút Chuông Thông Báo với chấm đỏ đô nhỏ */}
          <button
            onClick={() => setCustomerTab('notifications')}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#F6E1DB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#691F31',
              position: 'relative',
              border: '1px solid rgba(201, 168, 117, 0.25)',
              boxShadow: '0 2px 8px rgba(105, 31, 49, 0.04)'
            }}
            title="Thông báo lịch hẹn"
          >
            <Bell size={17} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#691F31',
                border: '1.5px solid #F6E1DB'
              }} />
            )}
          </button>
        </div>
      </header>

      {/* 2. Thẻ Hội Viên VIP Tiệm B */}
      <CustomerVipCard />

      {/* 3. Hero Card: Điểm nhấn chính của trang chủ */}
      <section style={{ padding: '8px 20px 24px' }}>
        <div className="warm-glass-card hover-blush" style={{
          overflow: 'hidden',
          borderRadius: '26px',
          border: '1px solid rgba(201, 168, 117, 0.25)'
        }}>
          {/* Ảnh spa thư giãn chiếm 55-60% */}
          <div style={{ height: '175px', position: 'relative', overflow: 'hidden' }}>
            <img
              src={shopInfo.coverImage}
              alt="Không gian thư giãn Tiệm B"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Lớp gradient nhẹ nhàng ở chân ảnh */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(35, 14, 20, 0.02) 40%, rgba(35, 14, 20, 0.65) 100%)'
            }} />

            {/* Tag nhỏ tinh tế */}
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.88)',
              backdropFilter: 'blur(12px)',
              padding: '4px 10px',
              borderRadius: '999px',
              fontSize: '10.5px',
              fontWeight: '700',
              color: '#691F31',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <Sparkles size={11} color="#C9A875" />
              <span>Không gian riêng tư & tinh tế</span>
            </div>
          </div>

          {/* Nội dung và CTA chính */}
          <div style={{ padding: '18px 20px 20px' }}>
            <h1 style={{
              fontSize: '18px',
              fontFamily: 'var(--font-serif)',
              fontWeight: '600',
              color: '#691F31',
              marginBottom: '5px',
              lineHeight: '1.25',
              letterSpacing: '-0.01em'
            }}>
              Thư giãn theo cách của bạn
            </h1>

            <p style={{
              fontSize: '12px',
              color: 'rgba(105, 31, 49, 0.72)',
              lineHeight: '1.45',
              marginBottom: '16px'
            }}>
              Liệu trình chăm sóc chuyên sâu trong không gian riêng tư và tinh tế.
            </p>

            {/* Nút CTA "Đặt lịch ngay" */}
            <button
              onClick={() => handleStartBooking(services[0])}
              className="btn-burgundy-cta"
              style={{
                width: '100%',
                height: '48px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <CalendarCheck size={16} />
              <span>Đặt lịch ngay</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Dịch Vụ Nổi Bật: Hàng ngang gồm 3 mini card */}
      <section style={{ padding: '0 20px 24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px'
        }}>
          <h2 style={{
            fontSize: '13px',
            fontWeight: '800',
            color: '#691F31',
            textTransform: 'uppercase',
            letterSpacing: '0.4px'
          }}>
            Dịch vụ nổi bật
          </h2>

          <button
            onClick={() => setCustomerTab('menu')}
            style={{
              fontSize: '11.5px',
              fontWeight: '700',
              color: '#691F31',
              display: 'flex',
              alignItems: 'center',
              gap: '2px'
            }}
          >
            <span>Xem tất cả</span>
            <ChevronRight size={13} />
          </button>
        </div>

        {/* Danh sách Dịch Vụ Nổi Bật: Vuốt ngang thông thoáng, không bị chi chít */}
        <div style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          paddingBottom: '8px',
          scrollbarWidth: 'none'
        }}>
          {featuredServices.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => handleStartBooking(item.matchedService)}
                className="warm-glass-card hover-blush"
                style={{
                  minWidth: '145px',
                  maxWidth: '145px',
                  flexShrink: 0,
                  padding: '16px 12px',
                  borderRadius: '22px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  border: '1px solid rgba(201, 168, 117, 0.22)'
                }}
              >
                {/* Icon tròn hồng phấn */}
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#F6E1DB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#691F31',
                  marginBottom: '10px'
                }}>
                  <IconComponent size={20} />
                </div>

                <div style={{
                  fontSize: '12px',
                  fontWeight: '800',
                  color: '#691F31',
                  lineHeight: '1.3',
                  marginBottom: '4px',
                  minHeight: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {item.name}
                </div>

                <div style={{
                  fontSize: '10px',
                  color: 'rgba(105, 31, 49, 0.65)',
                  marginBottom: '8px'
                }}>
                  {item.duration}
                </div>

                <div style={{
                  fontSize: '11.5px',
                  fontWeight: '800',
                  color: '#691F31',
                  backgroundColor: 'rgba(241, 208, 201, 0.4)',
                  padding: '3px 10px',
                  borderRadius: '999px'
                }}>
                  {item.price}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Đội Ngũ Chuyên Viên: Avatar tối giản, thanh lịch */}
      <section style={{ padding: '0 20px 24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px'
        }}>
          <h2 style={{
            fontSize: '13px',
            fontWeight: '800',
            color: '#691F31',
            textTransform: 'uppercase',
            letterSpacing: '0.4px'
          }}>
            Đội ngũ chuyên viên
          </h2>
          <span style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.55)' }}>
            Chọn thợ ruột
          </span>
        </div>

        {/* Danh sách ngang chuyên viên */}
        <div style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          paddingBottom: '4px',
          scrollbarWidth: 'none'
        }}>
          {staffList.slice(1).map((st) => {
            const roleTitle = staffRoles[st.id] || st.role.split('•')[0] || 'Kỹ thuật viên';
            return (
              <div
                key={st.id}
                onClick={() => handleStartBooking(services[0], st)}
                className="warm-glass-card hover-blush"
                style={{
                  minWidth: '135px',
                  padding: '14px 10px',
                  borderRadius: '20px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  border: '1px solid rgba(201, 168, 117, 0.2)'
                }}
              >
                {/* Avatar tròn viền champagne mảnh */}
                <div style={{ position: 'relative', marginBottom: '8px' }}>
                  <img
                    src={st.avatar}
                    alt={st.name}
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1.5px solid rgba(201, 168, 117, 0.45)',
                      boxShadow: '0 3px 8px rgba(105, 31, 49, 0.08)'
                    }}
                  />
                  <span style={{
                    position: 'absolute',
                    bottom: '-2px',
                    right: '-2px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '999px',
                    padding: '1px 5px',
                    fontSize: '9px',
                    fontWeight: '800',
                    color: '#691F31',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px'
                  }}>
                    <Star size={9} fill="#C9A875" color="#C9A875" />
                    <span>{st.rating}</span>
                  </span>
                </div>

                <div style={{
                  fontSize: '12px',
                  fontWeight: '800',
                  color: '#691F31',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%'
                }}>
                  {st.name}
                </div>

                <div style={{
                  fontSize: '10px',
                  color: 'rgba(105, 31, 49, 0.65)',
                  marginTop: '2px',
                  lineHeight: '1.2'
                }}>
                  {roleTitle}
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* 6. Đánh Giá & Trải Nghiệm Khách Hàng (Hệ thống đánh giá & phản hồi sau dịch vụ) */}
      <section style={{ padding: '0 20px 24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px'
        }}>
          <div>
            <h2 style={{
              fontSize: '13px',
              fontWeight: '800',
              color: '#691F31',
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
              margin: 0
            }}>
              Đánh giá từ khách hàng
            </h2>
            <span style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.65)' }}>
              100% khách hàng đã trải nghiệm dịch vụ thực tế
            </span>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: 'rgba(201, 168, 117, 0.2)',
            padding: '4px 8px',
            borderRadius: '10px',
            fontSize: '11px',
            fontWeight: '800',
            color: '#691F31'
          }}>
            <Star size={12} fill="#C9A875" color="#C9A875" />
            <span>{shopInfo.rating} / 5.0</span>
          </div>
        </div>

        {/* Rating Breakdown & Score Card */}
        <div
          className="warm-glass-card"
          style={{
            padding: '16px',
            borderRadius: '22px',
            marginBottom: '14px',
            border: '1px solid rgba(201, 168, 117, 0.28)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          {/* Left: Big Score */}
          <div style={{ textAlign: 'center', minWidth: '90px' }}>
            <div style={{
              fontSize: '32px',
              fontWeight: '800',
              color: '#691F31',
              lineHeight: 1,
              letterSpacing: '-1px'
            }}>
              {shopInfo.rating}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', margin: '4px 0' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={13} fill="#C9A875" color="#C9A875" />
              ))}
            </div>
            <div style={{ fontSize: '10.5px', color: 'rgba(105, 31, 49, 0.7)', fontWeight: '600' }}>
              {shopInfo.reviewCount || 186} đánh giá
            </div>
          </div>

          {/* Right: Score breakdown bars */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {[
              { stars: 5, pct: '92%' },
              { stars: 4, pct: '6%' },
              { stars: 3, pct: '2%' },
              { stars: 2, pct: '0%' },
              { stars: 1, pct: '0%' }
            ].map((item) => (
              <div key={item.stars} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '9.5px', color: '#691F31' }}>
                <span style={{ width: '14px', textAlign: 'right', fontWeight: '700' }}>{item.stars}★</span>
                <div style={{
                  flex: 1,
                  height: '5px',
                  backgroundColor: 'rgba(105, 31, 49, 0.08)',
                  borderRadius: '999px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: item.pct,
                    height: '100%',
                    backgroundColor: '#C9A875',
                    borderRadius: '999px'
                  }} />
                </div>
                <span style={{ width: '22px', fontSize: '9px', color: 'rgba(105, 31, 49, 0.6)' }}>{item.pct}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Nút Kết Nối Trực Tiếp Qua Google Maps Của Tiệm B */}
        <a
          href={shopInfo.googleMapsReviewUrl || 'https://maps.google.com/?q=86+Pasteur+Ben+Nghe+Quan+1+Ho+Chi+Minh#review'}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 16px',
            borderRadius: '16px',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid rgba(201, 168, 117, 0.35)',
            color: '#691F31',
            textDecoration: 'none',
            fontSize: '12px',
            fontWeight: '800',
            marginBottom: '14px',
            boxShadow: '0 4px 12px rgba(105, 31, 49, 0.06)',
            transition: 'all 0.2s ease'
          }}
        >
          <MapPin size={16} color="#2E7D32" />
          <span>Xem & Đánh Giá Trên Google Maps Tiệm B</span>
          <ExternalLink size={13} color="#691F31" />
        </a>

        {/* Filter Pills */}
        <div style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '6px',
          marginBottom: '12px',
          scrollbarWidth: 'none'
        }}>
          {[
            { id: 'all', label: `Tất cả (${approvedReviews.length})` },
            { id: '5star', label: '5 sao ⭐' },
            { id: 'images', label: 'Có hình ảnh 📸' },
            { id: 'spa', label: 'Spa trị liệu' },
            { id: 'hair', label: 'Tóc lơi' },
            { id: 'nail', label: 'Nail móng' }
          ].map((f) => {
            const isAct = reviewFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setReviewFilter(f.id)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: isAct ? '800' : '600',
                  backgroundColor: isAct ? '#691F31' : '#FFFFFF',
                  color: isAct ? '#FFF8F4' : '#691F31',
                  border: isAct ? '1.5px solid #691F31' : '1px solid rgba(201, 168, 117, 0.25)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Reviews List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {displayedReviews.map((rev) => (
            <div
              key={rev.id}
              className="warm-glass-card hover-blush"
              style={{
                borderRadius: '20px',
                padding: '14px 15px',
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(201, 168, 117, 0.22)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1.5px solid rgba(201, 168, 117, 0.35)'
                    }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: '800', color: '#691F31' }}>
                        {rev.author}
                      </span>
                      {rev.verifiedBooking && (
                        <span style={{
                          fontSize: '8.5px',
                          fontWeight: '800',
                          backgroundColor: '#E8F5E9',
                          color: '#2E7D32',
                          padding: '1px 5px',
                          borderRadius: '4px'
                        }}>
                          ✓ Đã dùng dịch vụ
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                      <div style={{ display: 'flex', gap: '1px' }}>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={11}
                            fill={s <= rev.rating ? '#C9A875' : 'none'}
                            color="#C9A875"
                          />
                        ))}
                      </div>
                      <span style={{ fontSize: '10px', color: '#8C5A65' }}>• {rev.date}</span>
                    </div>
                  </div>
                </div>

                {/* Report button */}
                <button
                  onClick={() => setReportingReview(rev)}
                  title="Báo cáo vi phạm chính sách cộng đồng"
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#8C5A65',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    fontSize: '10px',
                    padding: '4px 6px',
                    borderRadius: '6px'
                  }}
                >
                  <Flag size={11} />
                  <span>Báo cáo</span>
                </button>
              </div>

              {/* Service Tag */}
              <div style={{
                fontSize: '10.5px',
                fontWeight: '700',
                color: '#691F31',
                backgroundColor: 'rgba(241, 208, 201, 0.35)',
                padding: '3px 8px',
                borderRadius: '6px',
                alignSelf: 'flex-start'
              }}>
                {rev.serviceName}
              </div>

              {/* Comment text */}
              <p style={{
                fontSize: '12px',
                color: '#4A1525',
                lineHeight: 1.45,
                margin: 0
              }}>
                "{rev.comment}"
              </p>

              {/* Tags */}
              {rev.tags && rev.tags.length > 0 && (
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {rev.tags.map((t, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '9.5px',
                        backgroundColor: 'rgba(248, 242, 236, 0.9)',
                        color: '#691F31',
                        border: '1px solid rgba(201, 168, 117, 0.25)',
                        padding: '1px 6px',
                        borderRadius: '6px',
                        fontWeight: '600'
                      }}
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              {/* Customer Photos */}
              {rev.images && rev.images.length > 0 && (
                <div style={{ display: 'flex', gap: '6px', marginTop: '2px' }}>
                  {rev.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="Ảnh thực tế"
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '10px',
                        objectFit: 'cover',
                        border: '1px solid rgba(201, 168, 117, 0.3)'
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Official Tiệm B Reply */}
              {rev.shopReply && (
                <div style={{
                  backgroundColor: 'rgba(248, 242, 236, 0.85)',
                  borderLeft: '3px solid #691F31',
                  borderRadius: '0 12px 12px 0',
                  padding: '8px 10px',
                  fontSize: '11px',
                  color: '#691F31',
                  marginTop: '4px'
                }}>
                  <div style={{ fontWeight: '800', fontSize: '10.5px', marginBottom: '2px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>💬 Phản hồi từ Tiệm B:</span>
                    <span style={{ fontSize: '9px', color: '#8C5A65', fontWeight: 'normal' }}>{rev.shopReply.date}</span>
                  </div>
                  <div style={{ lineHeight: 1.4 }}>{rev.shopReply.text}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. Thông Tin Tiệm B & Chỉ Đường (Store Identity & Directions) */}
      <section id="store-info-section" style={{ padding: '0 20px 18px', scrollMarginTop: '20px' }}>
        <div
          className="warm-glass-card hover-blush"
          style={{
            borderRadius: '24px',
            padding: '18px',
            border: '1px solid rgba(201, 168, 117, 0.28)'
          }}
        >
          {/* Header Tiệm & Live Status */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div>
              <div style={{ fontSize: '10.5px', color: 'rgba(105, 31, 49, 0.65)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                Thông tin & Địa chỉ tiệm
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#691F31', marginTop: '2px' }}>
                {shopInfo.name}
              </h3>
            </div>

            {/* Live Open Status Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: isShopOpen() ? 'rgba(46, 125, 50, 0.12)' : 'rgba(198, 40, 40, 0.12)',
              color: isShopOpen() ? '#2E7D32' : '#C62828',
              padding: '4px 10px',
              borderRadius: '999px',
              fontSize: '10px',
              fontWeight: '800',
              border: `1px solid ${isShopOpen() ? 'rgba(46, 125, 50, 0.25)' : 'rgba(198, 40, 40, 0.25)'}`
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: isShopOpen() ? '#2E7D32' : '#C62828'
              }} />
              <span>{isShopOpen() ? '🟢 Đang mở cửa (08:30 - 21:00)' : '🔴 Tạm nghỉ (Mở lại 08:30)'}</span>
            </div>
          </div>

          {/* Address Line with MapPin */}
          <div style={{ display: 'flex', gap: '9px', marginBottom: '14px', alignItems: 'flex-start' }}>
            <MapPin size={18} color="#691F31" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#691F31', lineHeight: '1.4' }}>
                {shopInfo.address}
              </div>
              <div style={{ fontSize: '10.5px', color: 'rgba(105, 31, 49, 0.65)', marginTop: '2px' }}>
                Gần ngã tư Pasteur & Lê Lợi • Trung tâm Quận 1 • Cách bạn ~1.2 km
              </div>
            </div>
          </div>

          {/* 2 Nút Hành Động: Chỉ Đường 1 Chạm & Gọi Hotline */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
            <a
              href={shopInfo.googleMapsUrl || 'https://maps.google.com/?q=86+Pasteur+Ben+Nghe+Quan+1+Ho+Chi+Minh'}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 12px',
                borderRadius: '14px',
                backgroundColor: '#F6E1DB',
                color: '#691F31',
                fontSize: '11.5px',
                fontWeight: '700',
                border: '1px solid rgba(201, 168, 117, 0.35)',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
            >
              <Navigation size={14} color="#691F31" />
              <span>Chỉ đường Maps</span>
            </a>

            <a
              href={`tel:${shopInfo.hotline ? shopInfo.hotline.replace(/\s+/g, '') : '0908888999'}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 12px',
                borderRadius: '14px',
                backgroundColor: '#691F31',
                color: '#FFF8F4',
                fontSize: '11.5px',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(105, 31, 49, 0.25)',
                transition: 'all 0.2s'
              }}
            >
              <Phone size={14} color="#FFF8F4" />
              <span>Gọi Lễ Tân Tiệm</span>
            </a>
          </div>

          {/* Amenities & Dịch Vụ Đón Tiếp */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6px',
            padding: '10px 12px',
            borderRadius: '14px',
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            border: '1px solid rgba(201, 168, 117, 0.2)',
            fontSize: '10.5px',
            color: '#691F31',
            fontWeight: '600'
          }}>
            {(shopInfo.amenities || [
              '🅿️ Chỗ đỗ ô tô & xe máy',
              '🍵 Trà thảo mộc & bánh',
              '🧖‍♀️ Phòng riêng tư VIP',
              '📶 Wi-Fi 5G & sạc tại ghế'
            ]).map((amenity, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Cam Kết Đặt Cọc Minh Bạch */}
      <section style={{ padding: '0 20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 14px',
          borderRadius: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.65)',
          border: '1px solid rgba(201, 168, 117, 0.2)'
        }}>
          <ShieldCheck size={16} color="#691F31" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '10.5px', color: 'rgba(105, 31, 49, 0.8)', lineHeight: '1.4' }}>
            <strong>Cam kết minh bạch:</strong> Tiệm B hoàn 100% tiền cọc nếu quý khách thông báo hủy lịch trước 24 giờ.
          </div>
        </div>
      </section>

      {/* COMMUNITY VIOLATION REPORT MODAL */}
      {reportingReview && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(30, 8, 14, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setReportingReview(null)}
        >
          <div
            className="warm-glass-card animate-fade-up"
            style={{
              width: '100%',
              maxWidth: '340px',
              backgroundColor: '#FFFDF9',
              borderRadius: '24px',
              padding: '20px',
              border: '1.5px solid rgba(201, 168, 117, 0.4)',
              boxShadow: '0 20px 40px rgba(105, 31, 49, 0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  backgroundColor: '#FFEBEE',
                  color: '#C62828',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <AlertTriangle size={16} />
                </span>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#691F31' }}>
                  Báo Cáo Đánh Giá
                </h3>
              </div>
              <button
                onClick={() => setReportingReview(null)}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: 'rgba(105, 31, 49, 0.08)',
                  color: '#691F31',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={15} />
              </button>
            </div>

            <p style={{ fontSize: '11px', color: '#8C5A65', lineHeight: 1.4, margin: '0 0 12px' }}>
              Bạn đang báo cáo nhận xét của <strong>{reportingReview.author}</strong>. Nền tảng Marketplace sẽ kiểm duyệt và xử lý ẩn đánh giá nếu vi phạm quy định.
            </p>

            <label style={{ fontSize: '11.5px', fontWeight: '800', color: '#691F31', display: 'block', marginBottom: '6px' }}>
              Lý do báo cáo:
            </label>
            <select
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: '12px',
                fontSize: '11.5px',
                border: '1px solid rgba(201, 168, 117, 0.4)',
                backgroundColor: '#FFFFFF',
                marginBottom: '16px',
                outline: 'none'
              }}
            >
              <option value="Nội dung thô tục / xúc phạm cá nhân thợ">Nội dung thô tục / xúc phạm cá nhân thợ</option>
              <option value="Spam quảng cáo thương hiệu đối thủ">Spam quảng cáo thương hiệu đối thủ</option>
              <option value="Thông tin sai sự thật / vu khống">Thông tin sai sự thật / vu khống</option>
              <option value="Vi phạm quyền riêng tư / chia sẻ số điện thoại">Vi phạm quyền riêng tư / chia sẻ số điện thoại</option>
            </select>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setReportingReview(null)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '12px',
                  border: '1px solid rgba(105, 31, 49, 0.25)',
                  backgroundColor: 'transparent',
                  color: '#691F31',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSendReport}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: '#C62828',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(198, 40, 40, 0.25)'
                }}
              >
                Gửi báo cáo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

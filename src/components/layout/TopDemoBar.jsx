import React from 'react';
import { useApp } from '../../context/AppContext';
import { Smartphone, Monitor, RotateCcw, User, Store } from 'lucide-react';

export const TopDemoBar = () => {
  const {
    currentRole,
    setCurrentRole,
    displayMode,
    setDisplayMode,
    resetDemoData,
    unreadCount
  } = useApp();

  return (
    <header style={{
      width: '100%',
      backgroundColor: '#1C0B11',
      borderBottom: '1px solid rgba(245, 208, 198, 0.2)',
      padding: '10px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '12px',
      zIndex: 1000,
      position: 'relative'
    }}>
      {/* Brand & Palette indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
          <div style={{
            width: '30px',
            height: '30px',
            borderRadius: '999px',
            backgroundColor: '#691F31',
            color: '#FFF8F4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1.5px solid #C9A875',
            fontWeight: '800',
            fontSize: '15px',
            fontFamily: 'var(--font-serif)'
          }}>
            B
          </div>
          <div>
            <div style={{ color: '#FFF8F4', fontWeight: '800', fontSize: '13.5px', letterSpacing: '0.4px' }}>
              B BEAUTY & LUXURY SPA
            </div>
            <div style={{ color: 'rgba(255, 248, 244, 0.65)', fontSize: '10.5px' }}>
              Warm Luxury Glassmorphism
            </div>
          </div>
        </div>

        {/* 4 Color Palette indicator */}
        <div style={{
          display: 'none',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: '999px',
          backgroundColor: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(201, 168, 117, 0.25)'
        }} className="palette-badge">
          <span style={{ fontSize: '11px', color: '#FFF8F4', opacity: 0.8 }}>Tone Spa:</span>
          <span title="Soft Cream (#F8F2EC)" style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#F8F2EC', border: '1px solid #C9A875', display: 'inline-block' }}></span>
          <span title="Blush Pink (#F1D0C9)" style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#F1D0C9', display: 'inline-block' }}></span>
          <span title="Deep Burgundy (#691F31)" style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#691F31', border: '1px solid #C9A875', display: 'inline-block' }}></span>
          <span title="Champagne Gold (#C9A875)" style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#C9A875', display: 'inline-block' }}></span>
        </div>
      </div>

      {/* Role Switcher & Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {/* Role Toggle */}
        <div style={{
          display: 'flex',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '10px',
          padding: '3px',
          border: '1px solid rgba(201, 168, 117, 0.25)'
        }}>
          <button
            onClick={() => setCurrentRole('customer')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: currentRole === 'customer' ? '#691F31' : 'transparent',
              color: currentRole === 'customer' ? '#FFF8F4' : 'rgba(255, 248, 244, 0.7)',
              boxShadow: currentRole === 'customer' ? '0 2px 6px rgba(0,0,0,0.3)' : 'none'
            }}
          >
            <User size={14} />
            <span>Khách Của Tiệm B</span>
            {unreadCount > 0 && currentRole !== 'customer' && (
              <span style={{
                backgroundColor: '#F1D0C9',
                color: '#691F31',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                fontSize: '10px',
                fontWeight: 'bold',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentRole('owner')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: currentRole === 'owner' ? '#691F31' : 'transparent',
              color: currentRole === 'owner' ? '#FFF8F4' : 'rgba(255, 248, 244, 0.7)',
              boxShadow: currentRole === 'owner' ? '0 2px 6px rgba(0,0,0,0.3)' : 'none'
            }}
          >
            <Store size={14} />
            <span>Chủ Tiệm B (Quản Lý)</span>
          </button>
        </div>

        {/* View Mode Toggle */}
        <div style={{
          display: 'flex',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '8px',
          padding: '2px'
        }}>
          <button
            onClick={() => setDisplayMode('frame')}
            title="Xem dạng Khung Điện Thoại"
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              backgroundColor: displayMode === 'frame' ? '#F1D0C9' : 'transparent',
              color: displayMode === 'frame' ? '#691F31' : '#FFF8F4'
            }}
          >
            <Smartphone size={16} />
          </button>
          <button
            onClick={() => setDisplayMode('full')}
            title="Xem dạng Tràn Viền"
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              backgroundColor: displayMode === 'full' ? '#F1D0C9' : 'transparent',
              color: displayMode === 'full' ? '#691F31' : '#FFF8F4'
            }}
          >
            <Monitor size={16} />
          </button>
        </div>

        {/* Reset Demo Button */}
        <button
          onClick={resetDemoData}
          title="Khôi phục dữ liệu mẫu ban đầu"
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            backgroundColor: 'rgba(241, 208, 201, 0.15)',
            border: '1px solid rgba(201, 168, 117, 0.3)',
            color: '#FFF8F4',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <RotateCcw size={13} />
          <span>Reset Demo</span>
        </button>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .palette-badge {
            display: inline-flex !important;
          }
        }
      `}</style>
    </header>
  );
};

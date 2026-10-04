import React from 'react';
import { useApp } from '../../context/AppContext';
import { Crown, Sparkles, ChevronRight, Award, Gift, Zap } from 'lucide-react';

export const CustomerVipCard = () => {
  const { userTier, membershipTiers, setIsVipModalOpen } = useApp();

  const activeTier = membershipTiers.find((t) => t.id === userTier);
  const isVip = userTier && userTier !== 'standard' && activeTier;

  if (!isVip) {
    return (
      <div
        onClick={() => setIsVipModalOpen(true)}
        className="warm-glass-card hover-blush"
        style={{
          borderRadius: '22px',
          padding: '16px 18px',
          margin: '0 20px 16px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(246, 225, 219, 0.9) 100%)',
          border: '1.5px solid rgba(201, 168, 117, 0.35)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '14px',
            backgroundColor: '#691F31',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(105, 31, 49, 0.25)'
          }}>
            <Crown size={22} color="#D9BD8C" />
          </div>
          <div>
            <div style={{ fontSize: '13.5px', fontWeight: '800', color: '#691F31', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>Đăng Ký Hội Viên VIP Tiệm B</span>
              <span style={{ fontSize: '10px', backgroundColor: '#691F31', color: '#FFF8F4', padding: '1px 6px', borderRadius: '999px' }}>
                HOT
              </span>
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.72)', marginTop: '2px' }}>
              Giảm ngay 15% - 25% trọn đời & quà tặng sinh nhật đặc quyền
            </div>
          </div>
        </div>

        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: '#691F31',
          color: '#FFF8F4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <ChevronRight size={18} />
        </div>
      </div>
    );
  }

  // Active VIP Member Card View
  const isDiamond = userTier === 'card_diamond';
  const isGold = userTier === 'card_gold';

  const cardGradient = isDiamond
    ? 'linear-gradient(135deg, #1A0A0F 0%, #4A1624 55%, #1F0A12 100%)'
    : isGold
      ? 'linear-gradient(135deg, #7A283C 0%, #541724 60%, #3B1019 100%)'
      : 'linear-gradient(135deg, #5A5A5A 0%, #383838 100%)';

  const accentColor = isDiamond ? '#E0B0FF' : isGold ? '#D9BD8C' : '#E0E0E0';

  return (
    <div style={{ margin: '0 20px 16px' }}>
      <div
        style={{
          borderRadius: '22px',
          padding: '16px 18px',
          background: cardGradient,
          color: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 25px -4px rgba(105, 31, 49, 0.35)',
          border: `1.5px solid ${accentColor}44`
        }}
      >
        {/* Subtle metallic reflection */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accentColor}33 0%, transparent 70%)`,
          pointerEvents: 'none'
        }} />

        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Crown size={18} color={accentColor} />
            <div>
              <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8 }}>
                B Beauty & Luxury Spa
              </div>
              <div style={{ fontSize: '14.5px', fontWeight: '800', color: '#FFF8F4', marginTop: '1px' }}>
                {activeTier.name}
              </div>
            </div>
          </div>

          <span style={{
            fontSize: '11px',
            fontWeight: '800',
            backgroundColor: `${accentColor}25`,
            color: accentColor,
            border: `1px solid ${accentColor}66`,
            padding: '3px 8px',
            borderRadius: '999px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Sparkles size={11} />
            Giảm {activeTier.discount}
          </span>
        </div>

        {/* Card Number & Chip simulation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '14px 0 10px', position: 'relative', zIndex: 1 }}>
          <div style={{
            fontSize: '13px',
            fontFamily: 'monospace',
            letterSpacing: '2.5px',
            fontWeight: '700',
            color: '#F8F2EC',
            opacity: 0.95
          }}>
            TB-{isDiamond ? 'DIA' : isGold ? 'GLD' : 'SLV'}-8829
          </div>

          <div style={{
            fontSize: '9.5px',
            backgroundColor: 'rgba(255,255,255,0.12)',
            padding: '2px 7px',
            borderRadius: '6px',
            color: '#F8F2EC'
          }}>
            {activeTier.validity}
          </div>
        </div>

        {/* Footer info & Upgrade button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255,255,255,0.12)',
          paddingTop: '8px',
          position: 'relative',
          zIndex: 1
        }}>
          <div>
            <div style={{ fontSize: '8.5px', opacity: 0.75 }}>HỘI VIÊN</div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#FFF8F4' }}>Nguyễn Thùy Linh</div>
          </div>

          <button
            onClick={() => setIsVipModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '10.5px',
              fontWeight: '700',
              color: accentColor,
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '4px 10px',
              borderRadius: '999px',
              border: `1px solid ${accentColor}44`
            }}
          >
            <span>Nâng hạng VIP</span>
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

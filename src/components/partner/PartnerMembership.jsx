import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Crown,
  Search,
  Plus,
  Phone,
  Calendar,
  Sparkles,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
  Edit3,
  Check,
  X,
  Gift,
  ShieldCheck,
  Star,
  Settings,
  Filter,
  DollarSign
} from 'lucide-react';

export const PartnerMembership = () => {
  const {
    vipMembers,
    membershipTiers,
    updateVipMember,
    addVipMember,
    updateMembershipTier
  } = useApp();

  const [activeMainTab, setActiveMainTab] = useState('crm'); // 'crm' (Danh sách khách VIP) | 'tiers' (Cấu hình gói)
  const [selectedTierFilter, setSelectedTierFilter] = useState('all'); // 'all' | 'card_diamond' | 'card_gold' | 'card_silver'
  const [searchQuery, setSearchQuery] = useState('');

  // Editing Note State
  const [editingNoteMemberId, setEditingNoteMemberId] = useState(null);
  const [tempNote, setTempNote] = useState('');

  // Add Member Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMemberData, setNewMemberData] = useState({
    fullName: '',
    phone: '',
    tier: 'card_gold',
    note: '',
    favoriteStaff: 'Chuyên viên ngẫu nhiên'
  });

  // Edit Tier Modal State
  const [editingTier, setEditingTier] = useState(null);

  // Filtered VIP Members
  const filteredMembers = vipMembers.filter((m) => {
    const matchesTier = selectedTierFilter === 'all' || m.tier === selectedTierFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      m.fullName.toLowerCase().includes(q) ||
      m.phone.includes(q) ||
      m.cardCode.toLowerCase().includes(q) ||
      (m.note && m.note.toLowerCase().includes(q));
    return matchesTier && matchesSearch;
  });

  // Analytics Metrics
  const totalVipCount = vipMembers.length;
  const diamondCount = vipMembers.filter((m) => m.tier === 'card_diamond').length;
  const goldCount = vipMembers.filter((m) => m.tier === 'card_gold').length;
  const silverCount = vipMembers.filter((m) => m.tier === 'card_silver').length;
  const totalVipRevenue = vipMembers.reduce((sum, m) => sum + (m.totalSpent || 0), 0);

  const handleStartEditNote = (member) => {
    setEditingNoteMemberId(member.id);
    setTempNote(member.note || '');
  };

  const handleSaveNote = (memberId) => {
    updateVipMember(memberId, { note: tempNote });
    setEditingNoteMemberId(null);
  };

  const handleCreateNewMember = (e) => {
    e.preventDefault();
    if (!newMemberData.fullName.trim() || !newMemberData.phone.trim()) {
      alert('Vui lòng nhập họ tên và số điện thoại!');
      return;
    }

    const tierObj = membershipTiers.find((t) => t.id === newMemberData.tier) || membershipTiers[1];
    const prefix = newMemberData.tier === 'card_diamond' ? 'DIA' : newMemberData.tier === 'card_gold' ? 'GLD' : 'SLV';
    const cardCode = `TB-${prefix}-${Math.floor(100 + Math.random() * 900)}`;

    const newMember = {
      id: `vip_${Date.now()}`,
      cardCode,
      tier: newMemberData.tier,
      tierName: tierObj.name,
      fullName: newMemberData.fullName.trim(),
      phone: newMemberData.phone.trim(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      joinDate: new Date().toLocaleDateString('vi-VN'),
      expiryDate: newMemberData.tier === 'card_diamond' ? 'Trọn đời' : '12 tháng',
      totalSpent: tierObj.price,
      visitsCount: 1,
      favoriteStaff: newMemberData.favoriteStaff,
      note: newMemberData.note.trim() || 'Thêm trực tiếp tại quầy Tiệm B',
      status: 'ACTIVE',
      benefitsUsed: 'Mới đăng ký tại quầy'
    };

    addVipMember(newMember);
    setIsAddModalOpen(false);
    setNewMemberData({
      fullName: '',
      phone: '',
      tier: 'card_gold',
      note: '',
      favoriteStaff: 'Chuyên viên ngẫu nhiên'
    });
    alert(`Đã thêm hội viên ${newMember.fullName} (${tierObj.name}) thành công!`);
  };

  const handleSendPromoVoucher = (member) => {
    alert(`Đã gửi voucher quà tặng tri ân giảm 100.000đ qua Zalo/SMS cho khách VIP ${member.fullName} (${member.phone})!`);
  };

  const handleUpgradeTier = (member) => {
    const nextTier =
      member.tier === 'card_silver'
        ? 'card_gold'
        : member.tier === 'card_gold'
          ? 'card_diamond'
          : null;

    if (!nextTier) {
      alert(`Khách hàng ${member.fullName} đã ở hạng cao nhất: Thẻ Kim Cương (Diamond VIP)!`);
      return;
    }

    const tierObj = membershipTiers.find((t) => t.id === nextTier);
    if (window.confirm(`Xác nhận nâng hạng cho ${member.fullName} lên ${tierObj.name}?`)) {
      updateVipMember(member.id, {
        tier: nextTier,
        tierName: tierObj.name,
        cardCode: member.cardCode.replace(/TB-[A-Z]+/, `TB-${nextTier === 'card_diamond' ? 'DIA' : 'GLD'}`)
      });
      alert(`Đã nâng hạng thành công cho ${member.fullName} lên ${tierObj.name}!`);
    }
  };

  return (
    <div style={{ padding: '16px 18px 120px' }} className="animate-fade-up">
      {/* 1. Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Crown size={20} color="#C9A875" />
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#691F31', margin: 0 }}>
              Quản Trị Khách VIP & Hội Viên
            </h2>
          </div>
          <p style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.7)', marginTop: '2px' }}>
            Khai thác dữ liệu khách VIP theo từng gói, ghi chú sở thích và chăm sóc riêng biệt.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            backgroundColor: '#691F31',
            color: '#FFF8F4',
            padding: '8px 12px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: '700',
            boxShadow: '0 4px 12px rgba(105, 31, 49, 0.25)',
            flexShrink: 0
          }}
        >
          <Plus size={14} />
          <span>Thêm Khách VIP</span>
        </button>
      </div>

      {/* 2. Executive Analytics Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px',
        marginBottom: '16px'
      }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '12px 14px',
          border: '1px solid rgba(201, 168, 117, 0.25)',
          boxShadow: '0 2px 8px rgba(105, 31, 49, 0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.7)', fontWeight: '600' }}>Tổng Hội Viên VIP</span>
            <Users size={16} color="#691F31" />
          </div>
          <div style={{ fontSize: '20px', fontWeight: '800', color: '#691F31', marginTop: '4px' }}>
            {totalVipCount} <span style={{ fontSize: '11px', fontWeight: '600', color: '#2E7D32' }}>+4 tháng này</span>
          </div>
          <div style={{ fontSize: '10px', color: 'rgba(105, 31, 49, 0.6)', marginTop: '2px' }}>
            💎 {diamondCount} KC • 🏆 {goldCount} Vàng • 🥈 {silverCount} Bạc
          </div>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '12px 14px',
          border: '1px solid rgba(201, 168, 117, 0.25)',
          boxShadow: '0 2px 8px rgba(105, 31, 49, 0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.7)', fontWeight: '600' }}>Doanh Thu Từ VIP</span>
            <TrendingUp size={16} color="#2E7D32" />
          </div>
          <div style={{ fontSize: '18px', fontWeight: '800', color: '#691F31', marginTop: '4px' }}>
            {(totalVipRevenue / 1000000).toFixed(1)} triệu
          </div>
          <div style={{ fontSize: '10px', color: '#2E7D32', marginTop: '2px', fontWeight: '700' }}>
            ✓ Giữ chân khách: 96.5%
          </div>
        </div>
      </div>

      {/* 3. Main Navigation Toggle: CRM Danh Sách Khách vs Cấu Hình Gói Thẻ */}
      <div style={{
        display: 'flex',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: '14px',
        padding: '3px',
        marginBottom: '14px',
        border: '1px solid rgba(201, 168, 117, 0.25)'
      }}>
        <button
          onClick={() => setActiveMainTab('crm')}
          style={{
            flex: 1,
            padding: '8px 0',
            borderRadius: '11px',
            fontSize: '11.5px',
            fontWeight: activeMainTab === 'crm' ? '800' : '600',
            backgroundColor: activeMainTab === 'crm' ? '#691F31' : 'transparent',
            color: activeMainTab === 'crm' ? '#FFF8F4' : '#691F31',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <Users size={13} />
          <span>Danh Sách Khách VIP ({totalVipCount})</span>
        </button>

        <button
          onClick={() => setActiveMainTab('tiers')}
          style={{
            flex: 1,
            padding: '8px 0',
            borderRadius: '11px',
            fontSize: '11.5px',
            fontWeight: activeMainTab === 'tiers' ? '800' : '600',
            backgroundColor: activeMainTab === 'tiers' ? '#691F31' : 'transparent',
            color: activeMainTab === 'tiers' ? '#FFF8F4' : '#691F31',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <Settings size={13} />
          <span>Cấu Hình 3 Gói Thẻ</span>
        </button>
      </div>

      {activeMainTab === 'crm' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* 4. Tier Filters & Search Bar */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '10px 12px',
            border: '1px solid rgba(201, 168, 117, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {/* Search Input */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#F8F2EC',
              borderRadius: '10px',
              padding: '6px 10px'
            }}>
              <Search size={14} color="#691F31" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo tên, SĐT, mã thẻ, ghi chú sở thích..."
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  fontSize: '11.5px',
                  width: '100%',
                  outline: 'none'
                }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}>
                  <X size={13} color="#691F31" />
                </button>
              )}
            </div>

            {/* Filter Tabs by Tier */}
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }}>
              <button
                onClick={() => setSelectedTierFilter('all')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '999px',
                  fontSize: '10.5px',
                  fontWeight: selectedTierFilter === 'all' ? '800' : '600',
                  backgroundColor: selectedTierFilter === 'all' ? '#691F31' : '#F8F2EC',
                  color: selectedTierFilter === 'all' ? '#FFF8F4' : '#691F31',
                  whiteSpace: 'nowrap'
                }}
              >
                Tất cả ({vipMembers.length})
              </button>

              <button
                onClick={() => setSelectedTierFilter('card_diamond')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '999px',
                  fontSize: '10.5px',
                  fontWeight: selectedTierFilter === 'card_diamond' ? '800' : '600',
                  backgroundColor: selectedTierFilter === 'card_diamond' ? '#1C0B11' : '#F8F2EC',
                  color: selectedTierFilter === 'card_diamond' ? '#D9BD8C' : '#691F31',
                  border: selectedTierFilter === 'card_diamond' ? '1px solid #D9BD8C' : 'none',
                  whiteSpace: 'nowrap'
                }}
              >
                💎 Kim Cương ({diamondCount})
              </button>

              <button
                onClick={() => setSelectedTierFilter('card_gold')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '999px',
                  fontSize: '10.5px',
                  fontWeight: selectedTierFilter === 'card_gold' ? '800' : '600',
                  backgroundColor: selectedTierFilter === 'card_gold' ? '#691F31' : '#F8F2EC',
                  color: selectedTierFilter === 'card_gold' ? '#FFF8F4' : '#691F31',
                  whiteSpace: 'nowrap'
                }}
              >
                🏆 Thẻ Vàng ({goldCount})
              </button>

              <button
                onClick={() => setSelectedTierFilter('card_silver')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '999px',
                  fontSize: '10.5px',
                  fontWeight: selectedTierFilter === 'card_silver' ? '800' : '600',
                  backgroundColor: selectedTierFilter === 'card_silver' ? '#7A7A7A' : '#F8F2EC',
                  color: selectedTierFilter === 'card_silver' ? '#FFF8F4' : '#691F31',
                  whiteSpace: 'nowrap'
                }}
              >
                🥈 Thẻ Bạc ({silverCount})
              </button>
            </div>
          </div>

          {/* 5. Detailed VIP Customers List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredMembers.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '30px 16px',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                color: 'rgba(105, 31, 49, 0.6)',
                fontSize: '12px'
              }}>
                Không tìm thấy khách hàng VIP phù hợp với bộ lọc.
              </div>
            ) : (
              filteredMembers.map((member) => {
                const isDiamond = member.tier === 'card_diamond';
                const isGold = member.tier === 'card_gold';
                const isEditingThisNote = editingNoteMemberId === member.id;

                const tierBadgeBg = isDiamond ? '#1C0B11' : isGold ? '#691F31' : '#555555';
                const tierTextColor = isDiamond ? '#D9BD8C' : '#FFF8F4';

                return (
                  <div
                    key={member.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '20px',
                      padding: '16px',
                      border: isDiamond
                        ? '1.5px solid #C9A875'
                        : isGold
                          ? '1.5px solid rgba(105, 31, 49, 0.25)'
                          : '1px solid rgba(201, 168, 117, 0.2)',
                      boxShadow: '0 4px 16px rgba(105, 31, 49, 0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}
                  >
                    {/* Top Row: Customer Info & Tier Badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                          src={member.avatar}
                          alt={member.fullName}
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '12px',
                            objectFit: 'cover',
                            border: `2px solid ${isDiamond ? '#C9A875' : '#F1D0C9'}`
                          }}
                        />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <h3 style={{ fontSize: '14.5px', fontWeight: '800', color: '#691F31', margin: 0 }}>
                              {member.fullName}
                            </h3>
                            <span style={{
                              fontSize: '9px',
                              fontWeight: '800',
                              padding: '2px 7px',
                              borderRadius: '999px',
                              backgroundColor: tierBadgeBg,
                              color: tierTextColor,
                              border: isDiamond ? '1px solid #D9BD8C' : 'none'
                            }}>
                              {isDiamond ? '💎 KIM CƯƠNG' : isGold ? '🏆 GOLD VIP' : '🥈 THẺ BẠC'}
                            </span>
                          </div>

                          <div style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.7)', marginTop: '2px' }}>
                            Mã: <strong>{member.cardCode}</strong> • {member.phone}
                          </div>
                        </div>
                      </div>

                      {/* Quick Contact & Upgrade */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <a
                          href={`tel:${member.phone.replace(/\s+/g, '')}`}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '10px',
                            backgroundColor: '#F8F2EC',
                            color: '#691F31',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textDecoration: 'none'
                          }}
                          title={`Gọi cho ${member.fullName}`}
                        >
                          <Phone size={14} />
                        </a>

                        <button
                          onClick={() => handleSendPromoVoucher(member)}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '10px',
                            backgroundColor: '#F8F2EC',
                            color: '#691F31',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          title="Tặng voucher ưu đãi tri ân"
                        >
                          <Gift size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Stats Grid: Chi Tiêu, Lượt Ghé, Thợ Ruột, Hạn Dùng */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: '6px',
                      backgroundColor: '#FDFBF9',
                      borderRadius: '12px',
                      padding: '8px 10px',
                      border: '1px solid rgba(201, 168, 117, 0.15)'
                    }}>
                      <div>
                        <div style={{ fontSize: '9px', color: 'rgba(105, 31, 49, 0.6)' }}>Chi tiêu</div>
                        <div style={{ fontSize: '11px', fontWeight: '800', color: '#691F31' }}>
                          {(member.totalSpent / 1000).toLocaleString()}k
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '9px', color: 'rgba(105, 31, 49, 0.6)' }}>Đã ghé</div>
                        <div style={{ fontSize: '11px', fontWeight: '800', color: '#691F31' }}>
                          {member.visitsCount} lần
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '9px', color: 'rgba(105, 31, 49, 0.6)' }}>Thợ ruột</div>
                        <div style={{ fontSize: '11px', fontWeight: '700', color: '#691F31', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {member.favoriteStaff}
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '9px', color: 'rgba(105, 31, 49, 0.6)' }}>Hạn thẻ</div>
                        <div style={{ fontSize: '11px', fontWeight: '700', color: '#2E7D32' }}>
                          {member.expiryDate}
                        </div>
                      </div>
                    </div>

                    {/* Specialized Personal Care Note */}
                    <div style={{
                      backgroundColor: '#FFF7F0',
                      borderRadius: '12px',
                      padding: '10px 12px',
                      border: '1px dashed rgba(201, 168, 117, 0.4)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontSize: '10.5px', fontWeight: '800', color: '#691F31' }}>
                          📝 Ghi chú chăm sóc riêng cho thợ & chủ tiệm:
                        </span>
                        {!isEditingThisNote && (
                          <button
                            onClick={() => handleStartEditNote(member)}
                            style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10px', color: '#691F31', fontWeight: '700' }}
                          >
                            <Edit3 size={11} />
                            <span>Sửa</span>
                          </button>
                        )}
                      </div>

                      {isEditingThisNote ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <textarea
                            rows={2}
                            value={tempNote}
                            onChange={(e) => setTempNote(e.target.value)}
                            style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', fontSize: '11px' }}
                          />
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                            <button
                              onClick={() => setEditingNoteMemberId(null)}
                              style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '10.5px', backgroundColor: '#F8F2EC' }}
                            >
                              Hủy
                            </button>
                            <button
                              onClick={() => handleSaveNote(member.id)}
                              style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '10.5px', backgroundColor: '#691F31', color: '#FFF8F4', fontWeight: '700' }}
                            >
                              Lưu ghi chú
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.85)', lineHeight: '1.4' }}>
                          {member.note || 'Chưa có ghi chú riêng.'}
                        </div>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', borderTop: '1px solid rgba(201, 168, 117, 0.15)', paddingTop: '8px' }}>
                      <button
                        onClick={() => handleUpgradeTier(member)}
                        style={{
                          flex: 1,
                          padding: '7px',
                          borderRadius: '8px',
                          backgroundColor: '#F8F2EC',
                          color: '#691F31',
                          fontSize: '11px',
                          fontWeight: '700',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px'
                        }}
                      >
                        <Crown size={12} color="#C9A875" />
                        <span>Nâng Hạng Thẻ</span>
                      </button>

                      <button
                        onClick={() => alert(`Lịch sử: Khách ${member.fullName} đã đặt lịch 14 lần qua app, đánh giá trung bình 5.0⭐, không bao giờ hủy cọc.`)}
                        style={{
                          flex: 1,
                          padding: '7px',
                          borderRadius: '8px',
                          backgroundColor: '#F8F2EC',
                          color: '#691F31',
                          fontSize: '11px',
                          fontWeight: '700'
                        }}
                      >
                        Xem Lịch Sử Hẹn
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : (
        /* 6. Configure 3 VIP Tiers */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} className="animate-fade-up">
          <div style={{ fontSize: '12px', color: 'rgba(105, 31, 49, 0.75)', lineHeight: '1.4' }}>
            Chủ tiệm có thể trực tiếp tùy chỉnh giá bán, % chiết khấu và quyền lợi của từng gói thành viên để tăng tỷ lệ khách quen quay lại.
          </div>

          {membershipTiers.map((tier) => (
            <div
              key={tier.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '16px',
                border: tier.highlight ? '2px solid #691F31' : '1px solid rgba(201, 168, 117, 0.25)',
                boxShadow: tier.highlight ? '0 8px 24px rgba(105, 31, 49, 0.1)' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <span style={{ fontSize: '10px', color: 'rgba(105, 31, 49, 0.65)', fontWeight: '700' }}>
                    {tier.badge}
                  </span>
                  <h3 style={{ fontSize: '15.5px', fontWeight: '800', color: '#691F31', margin: '2px 0 0' }}>
                    {tier.name}
                  </h3>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: '#691F31' }}>
                    {tier.price.toLocaleString()}đ
                  </div>
                  <div style={{ fontSize: '10px', color: 'rgba(105, 31, 49, 0.6)' }}>
                    Hạn dùng: {tier.validity}
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
                <div style={{ fontSize: '12px', fontWeight: '800', color: '#691F31', marginBottom: '6px' }}>
                  Chiết khấu dịch vụ: Giảm {tier.discount}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {tier.benefits.map((b, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'rgba(105, 31, 49, 0.85)' }}>
                      <Check size={12} color="#691F31" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  const newPrice = prompt(`Nhập giá bán mới cho ${tier.name} (VNĐ):`, tier.price);
                  if (newPrice && !isNaN(Number(newPrice))) {
                    updateMembershipTier(tier.id, { price: Number(newPrice) });
                    alert(`Đã cập nhật giá gói ${tier.name} thành ${Number(newPrice).toLocaleString()}đ!`);
                  }
                }}
                style={{
                  width: '100%',
                  padding: '9px',
                  borderRadius: '999px',
                  fontSize: '11.5px',
                  fontWeight: '700',
                  backgroundColor: tier.highlight ? '#691F31' : '#F8F2EC',
                  color: tier.highlight ? '#FBF7E8' : '#691F31',
                  border: tier.highlight ? 'none' : '1px solid rgba(201, 168, 117, 0.3)'
                }}
              >
                Chỉnh sửa quyền lợi & Giá gói
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 7. Modal Thêm Khách VIP Mới Tại Quầy */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(28, 11, 17, 0.7)',
          backdropFilter: 'blur(6px)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '420px',
            padding: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Crown size={18} color="#C9A875" />
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#691F31', margin: 0 }}>
                  Thêm Khách Hàng VIP Tại Quầy
                </h3>
              </div>
              <button onClick={() => setIsAddModalOpen(false)}>
                <X size={18} color="#691F31" />
              </button>
            </div>

            <form onSubmit={handleCreateNewMember} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#691F31', display: 'block', marginBottom: '3px' }}>
                  Họ và tên khách:
                </label>
                <input
                  type="text"
                  required
                  value={newMemberData.fullName}
                  onChange={(e) => setNewMemberData({ ...newMemberData, fullName: e.target.value })}
                  placeholder="VD: Chị Trương Lan Anh"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', fontSize: '12px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#691F31', display: 'block', marginBottom: '3px' }}>
                  Số điện thoại:
                </label>
                <input
                  type="tel"
                  required
                  value={newMemberData.phone}
                  onChange={(e) => setNewMemberData({ ...newMemberData, phone: e.target.value })}
                  placeholder="09..."
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', fontSize: '12px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#691F31', display: 'block', marginBottom: '3px' }}>
                  Chọn gói thẻ VIP cấp cho khách:
                </label>
                <select
                  value={newMemberData.tier}
                  onChange={(e) => setNewMemberData({ ...newMemberData, tier: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', fontSize: '12px' }}
                >
                  {membershipTiers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} (Giảm {t.discount} - {t.price.toLocaleString()}đ)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#691F31', display: 'block', marginBottom: '3px' }}>
                  KTV / Thợ ruột hay phục vụ:
                </label>
                <input
                  type="text"
                  value={newMemberData.favoriteStaff}
                  onChange={(e) => setNewMemberData({ ...newMemberData, favoriteStaff: e.target.value })}
                  placeholder="VD: Master Minh Trí"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', fontSize: '12px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#691F31', display: 'block', marginBottom: '3px' }}>
                  Ghi chú sở thích của khách:
                </label>
                <textarea
                  rows={2}
                  value={newMemberData.note}
                  onChange={(e) => setNewMemberData({ ...newMemberData, note: e.target.value })}
                  placeholder="VD: Thích không gian yên tĩnh, hay uống trà dưỡng nhan..."
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', fontSize: '12px' }}
                />
              </div>

              <button
                type="submit"
                className="btn-burgundy-cta"
                style={{ width: '100%', marginTop: '6px', height: '44px' }}
              >
                Kích Hoạt Thẻ Cho Khách
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

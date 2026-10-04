import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopDemoBar } from './components/layout/TopDemoBar';
import { MobileFrame } from './components/layout/MobileFrame';
import { BottomNavBar } from './components/layout/BottomNavBar';

// Customer Components for Tiệm B
import { HomeScreen } from './components/customer/HomeScreen';
import { ServicesScreen } from './components/customer/ServicesScreen';
import { MyBookingsScreen } from './components/customer/MyBookingsScreen';
import { NotificationsScreen } from './components/customer/NotificationsScreen';
import { BookingModal } from './components/customer/BookingModal';
import { ReviewModal } from './components/customer/ReviewModal';
import { CustomerChatDrawer } from './components/customer/CustomerChatDrawer';
import { VipRegistrationModal } from './components/customer/VipRegistrationModal';

// Owner Components for Tiệm B
import { PartnerDashboard } from './components/partner/PartnerDashboard';
import { PartnerCalendar } from './components/partner/PartnerCalendar';
import { PartnerServices } from './components/partner/PartnerServices';
import { PartnerMembership } from './components/partner/PartnerMembership';
import { PartnerProfile } from './components/partner/PartnerProfile';

const AppContent = () => {
  const { currentRole, customerTab, ownerTab, isBookingOpen, bookingService } = useApp();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#1E0C12'
    }}>
      {/* Top Demo Bar */}
      <TopDemoBar />

      {/* Main Viewport Container */}
      <MobileFrame>
        {/* Scrollable View Content - The only scrolling area */}
        <div style={{ flex: 1, width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>
          {currentRole === 'customer' ? (
            <>
              {customerTab === 'home' && <HomeScreen />}
              {customerTab === 'menu' && <ServicesScreen />}
              {customerTab === 'bookings' && <MyBookingsScreen />}
              {customerTab === 'notifications' && <NotificationsScreen />}
            </>
          ) : (
            <>
              {ownerTab === 'dashboard' && <PartnerDashboard />}
              {ownerTab === 'calendar' && <PartnerCalendar />}
              {ownerTab === 'services' && <PartnerServices />}
              {ownerTab === 'memberships' && <PartnerMembership />}
              {ownerTab === 'shop_profile' && <PartnerProfile />}
            </>
          )}
        </div>

        {/* Global Modals for Booking, Reviews & VIP */}
        {isBookingOpen && <BookingModal key={bookingService?.id || 'booking-modal'} />}
        <ReviewModal />
        <VipRegistrationModal />

        {/* Live Customer Chat Floating Button & Drawer */}
        {currentRole === 'customer' && <CustomerChatDrawer />}

        {/* Bottom App Navigation */}
        <BottomNavBar />
      </MobileFrame>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

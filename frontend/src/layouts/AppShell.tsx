import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiHome, FiCreditCard, FiList, FiPlusCircle, FiLogOut, FiPieChart, FiSettings, FiSearch } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { useIsFetching } from '@tanstack/react-query';
import { Logo } from '@/components/ui';

function UserAvatar({ name, avatarUrl }: { name: string; avatarUrl?: string | null }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#181818] text-xs font-bold text-[#00d4aa] shadow-inner border border-[#2a2a2a] overflow-hidden">
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
      ) : (
        initials
      )}
    </div>
  );
}

export function AppShell() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const isFetching = useIsFetching();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-32 font-sans antialiased">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 right-0 h-[72px] bg-[#0a0a0a]/80 backdrop-blur-md z-40 border-b border-[#181818]">
        {isFetching > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#00d4aa] via-white to-[#00d4aa] animate-pulse" />
        )}
        <div className="flex justify-between items-center px-4 sm:px-6 max-w-5xl mx-auto h-full w-full">
          <div className="cursor-pointer select-none" onClick={() => navigate('/')}>
            <Logo variant="navbar" className="scale-95 sm:scale-100 origin-left" />
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => navigate('/transactions')}
              className="text-[#666] hover:bg-white/5 hover:text-white transition-colors active:scale-95 duration-200 p-2 rounded-full"
              title="Search transactions"
            >
              <FiSearch size={18} />
            </button>
            
            {user && (
              <div className="flex items-center gap-2 sm:gap-3">
                <UserAvatar name={user.name} avatarUrl={user.avatarUrl} />
                <span className="hidden text-xs font-medium text-[#888] md:inline">{user.name}</span>
                <button
                  onClick={() => void logout()}
                  className="flex items-center gap-1.5 rounded-full bg-[#121212] hover:bg-[#1c1c1c] px-3 py-1.5 text-xs font-medium text-[#888] hover:text-white transition-all active:scale-95 border border-[#222222]"
                  title="Logout"
                >
                  <FiLogOut size={13} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-[104px] px-4 max-w-5xl mx-auto">
        <Outlet />
      </main>

      {/* Floating Bottom Nav Dock */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between sm:justify-center w-[95vw] sm:w-auto sm:gap-2 bg-[#0d0d0d]/90 backdrop-blur-xl rounded-full px-2.5 sm:px-4 py-2 border border-[#1f1f1f] shadow-[0_15px_40px_rgba(0,0,0,0.9)] max-w-[420px] sm:max-w-xl">
        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-full px-3.5 sm:px-4 py-2 transition-all duration-200 active:scale-95 ${
              isActive
                ? 'bg-white text-black font-semibold shadow-md'
                : 'text-[#555] hover:text-white'
            }`
          }
          end
        >
          {({ isActive }) => (
            <>
              <FiHome size={17} />
              {isActive && <span className="text-xs font-semibold hidden min-[360px]:inline">Dashboard</span>}
            </>
          )}
        </NavLink>

        {/* Accounts */}
        <NavLink
          to="/accounts"
          end
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-full px-3.5 sm:px-4 py-2 transition-all duration-200 active:scale-95 ${
              isActive
                ? 'bg-white text-black font-semibold shadow-md'
                : 'text-[#555] hover:text-white'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <FiCreditCard size={17} />
              {isActive && <span className="text-xs font-semibold hidden min-[360px]:inline">Accounts</span>}
            </>
          )}
        </NavLink>

        {/* Floating Action Button (FAB) for Add Transaction */}
        <Link
          to="/transactions/new"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00d4aa] text-black shadow-[0_0_18px_rgba(0,212,170,0.5)] hover:scale-105 active:scale-90 transition-all mx-1"
          title="Add Transaction"
        >
          <FiPlusCircle size={20} />
        </Link>

        {/* Transactions */}
        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-full px-3.5 sm:px-4 py-2 transition-all duration-200 active:scale-95 ${
              (isActive && window.location.pathname === '/transactions')
                ? 'bg-white text-black font-semibold shadow-md'
                : 'text-[#555] hover:text-white'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <FiList size={17} />
              {isActive && <span className="text-xs font-semibold hidden min-[360px]:inline">Transactions</span>}
            </>
          )}
        </NavLink>

        {/* Charts */}
        <NavLink
          to="/charts"
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-full px-3.5 sm:px-4 py-2 transition-all duration-200 active:scale-95 ${
              isActive
                ? 'bg-white text-black font-semibold shadow-md'
                : 'text-[#555] hover:text-white'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <FiPieChart size={17} />
              {isActive && <span className="text-xs font-semibold hidden min-[360px]:inline">Charts</span>}
            </>
          )}
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-full px-3.5 sm:px-4 py-2 transition-all duration-200 active:scale-95 ${
              isActive
                ? 'bg-white text-black font-semibold shadow-md'
                : 'text-[#555] hover:text-white'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <FiSettings size={17} />
              {isActive && <span className="text-xs font-semibold hidden min-[360px]:inline">Settings</span>}
            </>
          )}
        </NavLink>
      </nav>
    </div>
  );
}

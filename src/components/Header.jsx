import LiveClock from './LiveClock';
import ThemeSwitcher from './ThemeSwitcher';

const Header = ({ theme, setTheme }) => {
    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '70px',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid var(--border)',
            background: 'rgba(var(--bg-secondary-rgb), 0.8)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
        }} className="glass">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <div className="logo" style={{ fontSize: '1.25rem', fontWeight: '800', trackingColor: '-0.02em' }}>
                    AECHLAENM<span style={{ color: 'var(--accent)' }}>.</span>
                </div>

                <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <LiveClock />
                    <ThemeSwitcher currentTheme={theme} setTheme={setTheme} />
                </nav>
            </div>
        </header>
    );
};

export default Header;

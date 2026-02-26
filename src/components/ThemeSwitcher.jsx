import { Sun, Moon } from 'lucide-react';

const ThemeSwitcher = ({ currentTheme, setTheme }) => {
    const themes = [
        { id: 'dark', icon: <Moon size={18} />, label: 'Dark' },
        { id: 'light', icon: <Sun size={18} />, label: 'Light' }
    ];

    return (
        <div className="theme-switcher" style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-hover)', padding: '0.25rem', borderRadius: '8px' }}>
            {themes.map((theme) => (
                <button
                    key={theme.id}
                    onClick={() => setTheme(theme.id)}
                    title={theme.label}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        background: currentTheme === theme.id ? 'var(--bg-secondary)' : 'transparent',
                        color: currentTheme === theme.id ? 'var(--accent)' : 'var(--text-secondary)',
                        transition: 'all 0.2s ease',
                        boxShadow: currentTheme === theme.id ? '0 2px 4px var(--shadow)' : 'none'
                    }}
                >
                    {theme.icon}
                </button>
            ))}
        </div>
    );
};

export default ThemeSwitcher;

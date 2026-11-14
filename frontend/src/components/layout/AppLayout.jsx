import { NavLink, Outlet } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/compare', label: 'Compare' },
  { to: '/flammability', label: 'Flammability' },
  { to: '/chat', label: 'Ask Heimdall' },
  { to: '/habitat', label: 'Habitat 3D' },
];

export default function AppLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink to="/" className="brand">Heimdall</NavLink>
        <nav>
          {links.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}

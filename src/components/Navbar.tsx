import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, hrefFor, type Route } from '../routes';

export default function Navbar({ route }: { route: Route }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [route]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="relative z-20 w-full md:w-auto self-start">
      <nav
        aria-label="Main"
        className="bg-white/60 backdrop-blur-md rounded-2xl shadow-sm pl-3 sm:pl-4 pr-2 py-2 w-full md:w-auto flex items-center gap-3 md:gap-6"
      >
        <a href={hrefFor('home')} aria-label="Idzam, home" className="flex items-center shrink-0">
          <svg width="32" height="32" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" fill="#000000" />
          </svg>
        </a>

        <div className="hidden md:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => {
            const active = route === item.route;
            return (
              <a
                key={item.route}
                href={hrefFor(item.route)}
                aria-current={active ? 'page' : undefined}
                className={`text-gray-800 text-sm font-medium px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                  active ? 'bg-white/80 shadow-sm' : 'hover:opacity-60'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="ml-auto md:ml-0 flex items-center gap-2">
          <a
            href={hrefFor('contact')}
            className="bg-black text-white text-sm font-medium px-4 sm:px-5 py-2 rounded-xl hover:bg-gray-800 transition-colors whitespace-nowrap"
          >
            Start a project
          </a>
          <button
            type="button"
            className="md:hidden w-9 h-9 rounded-xl bg-white/70 text-gray-900 flex items-center justify-center hover:bg-white transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="md:hidden absolute left-0 right-0 top-full mt-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-2 flex flex-col"
        >
          {[{ route: 'home' as Route, label: 'Home' }, ...NAV_ITEMS].map((item) => {
            const active = route === item.route;
            return (
              <a
                key={item.route}
                href={hrefFor(item.route)}
                aria-current={active ? 'page' : undefined}
                className={`text-gray-900 text-sm font-medium px-4 py-3 rounded-xl transition-colors ${
                  active ? 'bg-black/5' : 'hover:bg-black/5'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}

import { useEffect, useState } from 'react';

export type Route = 'home' | 'story' | 'expertise' | 'work' | 'tools' | 'contact';

export const NAV_ITEMS: { route: Route; label: string }[] = [
  { route: 'story', label: 'Our story' },
  { route: 'expertise', label: 'Expertise' },
  { route: 'work', label: 'Our work' },
  { route: 'tools', label: 'Tools' },
];

export const PAGE_TITLES: Record<Route, string> = {
  home: 'Idzam — Bold ideas, shipped as products',
  story: 'Our story — Idzam',
  expertise: 'Expertise — Idzam',
  work: 'Our work — Idzam',
  tools: 'Tools — Idzam',
  contact: 'Say hello — Idzam',
};

export function hrefFor(route: Route): string {
  return route === 'home' ? '#/' : `#/${route}`;
}

const KNOWN: Exclude<Route, 'home'>[] = ['story', 'expertise', 'work', 'tools', 'contact'];

function routeFromHash(hash: string): Route {
  const key = hash.replace(/^#\/?/, '').split(/[?/]/)[0];
  return KNOWN.find((r) => r === key) ?? 'home';
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => routeFromHash(window.location.hash));

  useEffect(() => {
    const onChange = () => setRoute(routeFromHash(window.location.hash));
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}

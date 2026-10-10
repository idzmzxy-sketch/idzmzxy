import { useEffect, useRef, type ComponentType } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Story from './pages/Story';
import Expertise from './pages/Expertise';
import Work from './pages/Work';
import Tools from './pages/Tools';
import Contact from './pages/Contact';
import { VIDEO_URL } from './constants';
import { PAGE_TITLES, useRoute, type Route } from './routes';

const PAGES: Record<Route, ComponentType> = {
  home: Home,
  story: Story,
  expertise: Expertise,
  work: Work,
  tools: Tools,
  contact: Contact,
};

const HEIGHTS =
  'min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] md:min-h-[calc(100vh-48px)]';

export default function App() {
  const route = useRoute();
  const mainRef = useRef<HTMLElement>(null);
  const Page = PAGES[route];

  useEffect(() => {
    document.title = PAGE_TITLES[route];
    mainRef.current?.scrollTo({ top: 0 });
    window.scrollTo({ top: 0 });
  }, [route]);

  return (
    <div className="min-h-screen bg-white p-3 sm:p-4 md:p-6">
      <div className={`relative rounded-2xl sm:rounded-3xl overflow-hidden ${HEIGHTS} lg:h-[calc(100vh-48px)]`}>
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />

        <div className={`relative z-10 flex flex-col ${HEIGHTS} lg:h-full p-4 sm:p-6 md:p-8 gap-6`}>
          <Navbar route={route} />
          <main ref={mainRef} className="flex-1 min-h-0 flex flex-col lg:overflow-y-auto">
            <Page />
          </main>
        </div>
      </div>
    </div>
  );
}

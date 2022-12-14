import {createRef, useEffect, useState} from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

function scrollTo(ref: React.RefObject<HTMLDivElement>, offset: number) {
  if (!ref.current) return;
  window.scrollTo({
    top: ref.current.offsetTop - offset,
    behavior: 'smooth',
  });
}

function getBottom(ref: React.RefObject<HTMLDivElement>) {
  if (!ref.current) return 0;
  return ref.current.offsetTop + ref.current.offsetHeight;
}

type Props = {
  sections: {
    ref: React.RefObject<HTMLDivElement>;
    name: string;
    id: string;
  }[],
  actionButton?: JSX.Element;
}

function Navbar({sections, actionButton} : Props) {

  const navRef = createRef<HTMLDivElement>();
  const [navHeight, setNavHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | undefined>();

  useEffect(() => {
    if (!navRef.current) return;
    setNavHeight(navRef.current.offsetHeight);
  }, [navRef]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + navHeight;
      for (const section of sections) {
        if (scrollPosition < getBottom(section.ref)) {
          setCurrentSection(section.id);
          break;
        }
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navHeight, sections]);

  return (
    <>
      <nav className="sticky top-0 z-20" ref={navRef}>
        <div className="bg-alice-blue h-16 flex flex-row items-center sm:justify-center">
          <div className="flex flex-row justify-between w-full px-4 sm:hidden">
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-big-red hover:bg-pink hover:text-fire-opal focus:outline-none focus:ring-2 focus:ring-inset focus:ring-big-red"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
            {actionButton}
          </div>
          <div className='hidden sm:flex flex-row justify-center gap-6'>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  scrollTo(section.ref, navHeight);
                }}
                className={currentSection === section.id ? 'border-b-4 border-big-red text-big-red' : 'hover:text-fire-opal'}
              >
                {section.name}
              </button>
            ))}
            {actionButton}
          </div>
        </div>
        {isOpen && (
          <div className="sm:hidden w-full">
            <div className="flex flex-col bg-alice-blue gap-4 pb-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    scrollTo(section.ref, navHeight);
                    setIsOpen(false);
                  }}
                  className={currentSection === section.id ? 'border-fire-opal border-x-6 bg-pink mx-16' : ''}
                >
                  {section.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar
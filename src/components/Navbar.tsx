import {createRef, useEffect, useState} from 'react';

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
  }[]
}

function Navbar({sections} : Props) {

  const navRef = createRef<HTMLDivElement>();
  const [navHeight, setNavHeight] = useState(0);
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
      <nav className="sticky top-0" ref={navRef}>
        <div className="bg-white h-16 flex flex-row justify-center items-center gap-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                scrollTo(section.ref, navHeight);
              }}
              className={currentSection === section.id ? 'bg-red-500' : ''}
            >
              {section.name}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}

export default Navbar
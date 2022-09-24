import React, { useRef, useEffect, useState } from "react";
import { HomeIcon } from '@heroicons/react/24/outline'

const selectedClasses = "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
const notSelectedClasses = "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"

const getDimensions = (ele: HTMLElement) => {
  const { height } = ele.getBoundingClientRect();
  const offsetTop = ele.offsetTop;
  const offsetBottom = offsetTop + height;

  return {
    height,
    offsetTop,
    offsetBottom,
  };
};

const scrollTo = (ele: HTMLElement) => {
  ele.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

function App() {
  const [visibleSection, setVisibleSection] = useState<string | undefined>();

  const topRef = useRef(null);
  const headerRef = useRef(null);
  const leadershipRef = useRef(null);
  const providerRef = useRef(null);
  const operationsRef = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sectionRefs = [
    { section: "Leadership", ref: leadershipRef },
    { section: "Providers", ref: providerRef },
    { section: "Operations", ref: operationsRef },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) {
        return
      }
      const { height: headerHeight } = getDimensions(headerRef.current);
      const scrollPosition = window.scrollY + headerHeight;

      const selected = sectionRefs.find(({ ref }) => {
        const ele = ref.current;
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele);
          return scrollPosition > offsetTop && scrollPosition < offsetBottom;
        }
      });

      if (selected && selected.section !== visibleSection) {
        setVisibleSection(selected.section);
      } else if (!selected && visibleSection) {
        setVisibleSection(undefined);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionRefs, visibleSection]);

  return (
    <div className="App">
      <div ref={topRef} className="h-96">
        <h2 className="text-4xl font-bold text-center">Scroll to see sticky header</h2>
      </div>

      <div className="content">
        <div className="sticky top-0">
          <div className="flex justify-center bg-white" ref={headerRef}>
            <button
              type="button"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              onClick={() => {
                if (topRef.current) {
                  scrollTo(topRef.current);
                }
              }}
            >
              <HomeIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`${visibleSection === "Leadership" ? selectedClasses : notSelectedClasses}`}
              onClick={() => {
                if (leadershipRef.current) {
                  scrollTo(leadershipRef.current);
                }
              }}
            >
              Leadership
            </button>
            <button
              type="button"
              className={`${visibleSection === "Providers" ? selectedClasses : notSelectedClasses}`}
              onClick={() => {
                if (providerRef.current) {
                  scrollTo(providerRef.current);
                }
              }}
            >
              Providers
            </button>
            <button
              type="button"
              className={`${visibleSection === "Operations" ? selectedClasses : notSelectedClasses}`}
              onClick={() => {
                if (operationsRef.current) {
                  scrollTo(operationsRef.current);
                }
              }}
            >
              Operations
            </button>
          </div>
        </div>
        <div className="h-40 bg-slate-300" id="Leadership" ref={leadershipRef} />
        <div className="h-60 bg-blue-300" id="Providers" ref={providerRef} />
        <div className="h-80 bg-red-300" id="Operations" ref={operationsRef} />
        <div className="h-screen" />
      </div>

    </div>
  );
}

export default App;

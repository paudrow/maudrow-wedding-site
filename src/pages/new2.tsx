import React, { useRef, useEffect, useState } from "react";
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { HomeIcon, EnvelopeIcon } from '@heroicons/react/24/solid'
import confetti from 'canvas-confetti'
import mainImage from '../../public/imgs/broken-spoke.png'
import Image from 'next/image'
import * as config from "../../config";
import CountdownTimer from "../components/Countdown";

const desktopSelectedClasses = "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
const desktopNotSelectedClasses = "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
const mobileSelectedClasses = "block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
const mobileNotSelectedClasses = "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"

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

function confettiFireworks() {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults: confetti.Options = {
    startVelocity: 20, spread: 360, ticks: 60, zIndex: 50,
    colors: ['#c61626', '#feda01', '#e15b54', '#f3f8fb'],
  };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: NodeJS.Timer = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 300 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
}

function App() {
  const [visibleSection, setVisibleSection] = useState<string | undefined>();

  const navRef = useRef(null);
  const homeRef = useRef(null);
  const locationRef = useRef(null);
  const scheduleRef = useRef(null);
  const detailsRef = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sectionRefs = [
    { section: "Home", ref: homeRef },
    { section: "Location", ref: locationRef },
    { section: "Schedule", ref: scheduleRef },
    { section: "Details", ref: detailsRef },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) {
        return
      }
      const { height: headerHeight } = getDimensions(navRef.current);
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


  function Navbar() {
    return (
      <Disclosure as="nav" className="bg-white shadow sticky top-0 z-20">
      {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 justify-center">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                {/* Top bar on bigger displays */}
                <div className="flex flex-1 items-center justify-center sm:items-stretch" ref={navRef}>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <button
                      type="button"
                      className={`${visibleSection === "Home" ? desktopSelectedClasses : desktopNotSelectedClasses}`}
                      onClick={() => {
                        if (homeRef.current) {
                          scrollTo(homeRef.current);
                        }
                      }}
                    >
                      <HomeIcon className="h-5 w-5 mr-1 text-red-600" aria-hidden="true" /> Home
                    </button>
                    <button
                      type="button"
                      className={`${visibleSection === "Location" ? desktopSelectedClasses : desktopNotSelectedClasses}`}
                      onClick={() => {
                        if (locationRef.current) {
                          scrollTo(locationRef.current);
                        }
                      }}
                    >
                      Location
                    </button>
                    <button
                      type="button"
                      className={`${visibleSection === "Schedule" ? desktopSelectedClasses : desktopNotSelectedClasses}`}
                      onClick={() => {
                        if (scheduleRef.current) {
                          scrollTo(scheduleRef.current);
                        }
                      }}
                    >
                      Schedule
                    </button>
                    <button
                      type="button"
                      className={`${visibleSection === "Details" ? desktopSelectedClasses : desktopNotSelectedClasses}`}
                      onClick={() => {
                        if (detailsRef.current) {
                          scrollTo(detailsRef.current);
                        }
                      }}
                    >
                      Details
                    </button>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <button
                      type="button"
                      className="inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={confettiFireworks}
                    >
                      <EnvelopeIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                      RSVP
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pt-2 pb-4">
                <Disclosure.Button
                  as="a"
                  href="#Home"
                  className={visibleSection === "Home" ? mobileSelectedClasses : mobileNotSelectedClasses}
                >
                  Home
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#Location"
                  className={visibleSection === "Location" ? mobileSelectedClasses : mobileNotSelectedClasses}
                >
                  Location
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#Schedule"
                  className={visibleSection === "Schedule" ? mobileSelectedClasses : mobileNotSelectedClasses}
                >
                  Schedule
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#Details"
                  className={visibleSection === "Details" ? mobileSelectedClasses : mobileNotSelectedClasses}
                >
                  Details
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    )
  }

  return (
    <div>
      {/* <Navbar /> */}
      <Navbar />
      {/* Home */}
      <div className="bg-red-200 flex flex-col py-10 items-center" id="Home" ref={homeRef}>
        <h1 className="text-center text-5xl font-bold text-red-600 sm:pt-10">We{"'"}re Getting Married!</h1>
        <div className="w-full lg:w-1/2 my-10 shadow rounded">
          <Image priority src={mainImage} alt="Audrow and Michelley" layout="responsive" width={mainImage.width} height={mainImage.height} />
        </div>
        <button
          className="inline-flex items-center text-4xl font-bold text-red-600 bg-yellow-300 hover:bg-yellow-400 rounded-xl shadow border-4 border-yellow-500 p-4"
          onClick={confettiFireworks}
        >
          11/11/22 in San Antonio, Tx</button>
        <div className="my-6">
          <CountdownTimer targetDate={config.weddingDetails.ceremony.start} showSeconds={true} />
        </div>

      </div>
      {/* Location */}
      <div className="h-60 bg-blue-300" id="Location" ref={locationRef}>
      </div>
      <div className="h-80 bg-red-300" id="Schedule" ref={scheduleRef}>
      </div>
      <div className="h-80 bg-green-300" id="Details" ref={detailsRef}>
      </div>
      <div className="h-screen text-center flex flex-col justify-center">
        Website made with love by Audrow and Michelley
      </div>
    </div>
  );
}

export default App;

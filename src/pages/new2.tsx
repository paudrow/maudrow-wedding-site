import React, { useRef, useEffect, useState } from "react";
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, MapPinIcon, BriefcaseIcon } from '@heroicons/react/24/outline'
import { HomeIcon, EnvelopeIcon } from '@heroicons/react/24/solid'
import confetti from 'canvas-confetti'
import mainImage from '../../public/imgs/broken-spoke.png'
import parkImage from '../../public/imgs/dressy.png'
import Image from 'next/image'
import * as config from "../../config";
import CountdownTimer from "../components/Countdown";

const desktopSelectedClasses = "inline-flex items-center border-b-2 border-big-red px-1 pt-1 text-sm font-medium text-big-red"
const desktopNotSelectedClasses = "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-fire-opal hover:text-gray-800"
const mobileSelectedClasses = "block border-l-4 border-indigo-500 bg-big-red py-2 pl-3 pr-4 text-base font-medium text-big-red"
const mobileNotSelectedClasses = "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-fire-opal hover:bg-gray-50 hover:text-gray-800"

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
      <Disclosure as="nav" className="bg-alice-blue shadow sticky top-0 z-20">
      {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 justify-center">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-fire-opal hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-big-red">
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
                      <HomeIcon className="h-5 w-5 mr-1 text-big-red" aria-hidden="true" /> Home
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
                      className="inline-flex items-center bg-big-red hover:bg-harvest-gold text-white font-bold py-2 px-4 rounded"
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
      <div className="bg-pink flex flex-col py-10 items-center" id="Home" ref={homeRef}>
        <h1 className="text-center font-bangers text-5xl font-bold text-big-red sm:pt-10">We{"'"}re Getting Married!</h1>
        <div className="w-full lg:w-2/3 sm:w-3/4 my-10 shadow rounded">
          <Image priority src={mainImage} alt="Audrow and Michelley" layout="responsive" width={mainImage.width} height={mainImage.height} />
        </div>
        <button
          className="inline-flex items-center text-4xl font-bangers text-big-red bg-sizzling-sunrise hover:bg-amber-400 rounded-xl shadow border-4 border-harvest-gold py-4 px-10"
          onClick={confettiFireworks}
        >
          11/11/22 &nbsp;in &nbsp;San Antonio, Tx</button>
        <div className="py-10">
          <CountdownTimer targetDate={config.weddingDetails.ceremony.start} showSeconds={true} />
        </div>
      </div>
      {/* Location */}
      <div className="bg-ltyellowbg" id="Location" ref={locationRef}>
        <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-3 sm:gap-6 sm:mx-6">
          <div className="col-span-1 hidden sm:flex flex-col justify-center">
            <div className="border-4 border-red-600 rounded-3xl overflow-hidden">
              <Image src={parkImage} alt="Audrow and Michelley in the park" layout="responsive" width={parkImage.width} height={parkImage.height} />
            </div>
          </div>
          <div className="col-span-1 text-center my-10">
            <div className="flex justify-center">
              <MapPinIcon className="block h-12 w-12" aria-hidden="true" />
            </div>
            <h2 className="text-xl">Venue</h2>
            <div>
              <p>
                Phil Hardberger park is a 300+ acre nature park near us, it{'’'}s where we go for our weekly Sunday hike and where we got engaged!
              </p>
              <br />
              <p>
                The ceremony will be held in the picnic areas by the Urban Ecology Center, designed by Lake Flato.
              </p>
            </div>
            <button
              className="mt-6 px-4 py-2 bg-white border-red-600 border-4 rounded-xl text-red-600"
            >
              <a href="https://goo.gl/maps/xYZbHhp1sPpjzv8t6">
                See on map
              </a>
            </button>
          </div>
          <div className="col-span-1 text-center my-10">
            <div className="flex justify-center">
              <BriefcaseIcon className="block h-12 w-12" aria-hidden="true" />
            </div>
            <h2 className="text-xl">Hotel</h2>
            <div>
              <p>
                There are plenty of hotel options near the airport and downtown, feel free to choose whatever works for you.
              </p>
              <br />
              <p>
                We stayed at the Estancia del Norte when we first moved here, and had a great experience. It’s 7 mins from the airport, and about 8 mins from our house and Phil Hardberger park.
              </p>
            </div>
            <button
              className="mt-6 px-4 py-2 bg-white border-red-600 border-4 rounded-xl text-red-600"
            >
              <a href="https://goo.gl/maps/NAMGszvCseSQZ3Qi7">
                See on map
              </a>
            </button>
          </div>
          {/* <div className="col-span-2 align-middle">
            <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2">
              <div className="col-span-1">
                2
              </div>
              <div className="col-span-1">
                3
              </div>
            </div>
          </div> */}
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-5 grid-flow-row gap-6">
          <div className="col-1 hidden sm:block sm:row-span-full">
            <Image src={parkImage} alt="Audrow and Michelley in the park" layout="responsive" width={parkImage.width} height={parkImage.height} />
          </div>
          <div className="col-2 row-start-2 row-end-4 text-center">
            <h2 className="text-xl">Venue</h2>
            <p>
              Phil Hardberger park is a 300+ acre nature park near us, it{'’'}s where we go for our weekly Sunday hike and where we got engaged!
              <br />
              The ceremony will be held in the picnic areas by the Urban Ecology Center, designed by Lake Flato.
            </p>
          </div>
          <div className="col-3 row-start-2 row-end-4 text-center">
            <h2 className="text-xl">Hotel</h2>
            <p>
              There are plenty of hotel options near the airport and downtown, feel free to choose whatever works for you.
              <br />
              We stayed at the Estancia del Norte when we first moved here, and had a great experience. It’s 7 mins from the airport, and about 8 mins from our house and Phil Hardberger park.
            </p>
          </div>
        </div> */}
        {/* <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4">
          <div className="row-span-all">
            <div className="hidden md:block shadow rounded border-4 border-red-600">
              <Image src={parkImage} alt="Audrow and Michelley in the park" layout="responsive" width={parkImage.width} height={parkImage.height} />
            </div>
          </div>
        </div> */}
      </div>
      {/* <div className="bg-yellow-200 flex flex-col md:flex-row justify-evenly align-middle" id="Location" ref={locationRef}>
        <div className="w-full md:w-1/4 md:my-10 shadow rounded border-4 border-red-600">
          <Image src={parkImage} alt="Audrow and Michelley in the park" layout="responsive" width={parkImage.width} height={parkImage.height} />
        </div>
        <div className="md:w-1/4 flex flex-col mt-6 md:mt-0 md:justify-center">
          <h2 className="text-xl text-center">Venue</h2>
          <p className="text-center">
            Phil Hardberger park is a 300+ acre nature park near us, it{'’'}s where we go for our weekly Sunday hike and where we got engaged! 
            <br />
            The ceremony will be held in the picnic areas by the Urban Ecology Center, designed by Lake Flato.
          </p>
        </div>
        <div className="md:w-1/4 flex flex-col mt-6 md:mt-0 md:justify-center">
          <h2 className="text-xl text-center">Hotel</h2>
          <p className="text-center">
          There are plenty of hotel options near the airport and downtown, feel free to choose whatever works for you. 
          <br/>
          We stayed at the Estancia del Norte when we first moved here, and had a great experience. It’s 7 mins from the airport, and about 8 mins from our house and Phil Hardberger park.
          </p>
      </div>
        </div> */}
      <div className="h-80 bg-alice-blue" id="Schedule" ref={scheduleRef}>
      </div>
      <div className="h-80 bg-pink" id="Details" ref={detailsRef}>
      </div>
      <div className="h-screen text-center flex flex-col justify-center">
        Website made with love by Audrow and Michelley
      </div>
    </div>
  );
}

export default App;

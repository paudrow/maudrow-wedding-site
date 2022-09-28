import {createRef} from 'react';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import confettiFireworks from '../utils/fireworks';
import CountdownTimer from '../components/Countdown';
import * as config from "../../config";

import mainImage from '../../public/imgs/broken-spoke.png'
import parkImage from '../../public/imgs/dressy.png'

function Main() {

  const homeRef = createRef<HTMLDivElement>();
  const locationRef = createRef<HTMLDivElement>();
  const scheduleRef = createRef<HTMLDivElement>();
  const detailsRef = createRef<HTMLDivElement>();

  const Home = () => (
    <div className="bg-pink flex flex-col items-center" id="Home" ref={homeRef}>
      {/*lanterns*/}
      <div className="flex items-start lg:gap-20 gap-5 md:gap-10">
        <object data="/svg/lantern1.svg" className="h-20 flex-shrink md:h-full animate-swing origin-top hidden sm:block"></object>
        <object data="/svg/lantern2.svg" className="h-20 flex-shrink md:h-full animate-swing origin-top"></object>
        <object data="/svg/lantern3.svg" className="h-20 flex-shrink md:h-full animate-swing origin-top" ></object>
        <object data="/svg/lantern4.svg" className="h-20 flex-shrink md:h-full animate-swing origin-top"></object>
        <object data="/svg/lantern5.svg" className="h-20 flex-shrink md:h-full animate-swing origin-top"></object>
        <object data="/svg/lantern6.svg" className="h-20 flex-shrink md:h-full animate-swing origin-top"></object>
      </div>
      <h1 className="text-center font-bangers text-3xl md:text-6xl font-bold text-big-red mt-5">We{"'"}re Getting Married!</h1>
      <div className="w-full lg:w-2/3 sm:w-3/4 my-10 shadow rounded">
        <Image priority src={mainImage} alt="Audrow and Michelley" layout="responsive" width={mainImage.width} height={mainImage.height} />
      </div>
      <button
        className="inline-flex items-center text-3xl md:text-5xl font-bangers text-big-red bg-sizzling-sunrise hover:bg-amber-400 rounded-xl shadow border-4 border-harvest-gold py-4 px-4 sm:px-8 md:px-14 lg:px-18"
        onClick={confettiFireworks}
      >
        11/11/22 &nbsp;in &nbsp;San Antonio, Tx</button>
      <div className="py-10">
        <CountdownTimer targetDate={config.weddingDetails.ceremony.start} showSeconds={false} />
      </div>
    </div>
  )

  const Location = () => (
    <div className="bg-ltyellowbg" id="Location" ref={locationRef}>
      <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-3 sm:gap-6 sm:mx-6">
        <div className="col-span-1 hidden sm:flex flex-col justify-center">
          <div className="border-4 border-red-600 rounded-3xl overflow-hidden">
            <Image src={parkImage} alt="Audrow and Michelley in the park" layout="responsive" width={parkImage.width} height={parkImage.height} />
          </div>
        </div>
        <div className="col-span-1 text-center my-10 mx-4 md:mx-2 lg:mx-10">
          <div className="flex justify-center">
            <object data="/svg/venue.svg"></object>
          </div>
          <h2 className="text-xl font-bold">VENUE</h2>
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
            className="mt-6 px-4 py-2 bg-white border-red-600 border-2 rounded-xl text-red-600"
          >
            <a href="https://goo.gl/maps/xYZbHhp1sPpjzv8t6">
              See on map
            </a>
          </button>
        </div>
        <div className="col-span-1 text-center my-10 mx-4 md:mx-2 lg:mx-10">
          <div className="flex justify-center">
            <object data="/svg/hotel.svg"></object>
          </div>
          <h2 className="text-xl font-bold">HOTEL</h2>
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
            className="mt-6 px-4 py-2 bg-white border-red-600 border-2 rounded-xl text-red-600"
          >
            <a href="https://goo.gl/maps/NAMGszvCseSQZ3Qi7">
              See on map
            </a>
          </button>
        </div>
      </div>
    </div>
  )

  const Schedule = () => (
    <div className="bg-alice-blue" id="Schedule" ref={scheduleRef}>
      <div className="grid grid-cols-2 gap-10 text-center py-8 md:px-10">
        <div className="font-bold uppercase">
          Thursday
        </div>
        <div className="font-bold">
          Friday
        </div>
        <div> {/*thursday*/}
          6:00 pm
          <br />
          Welcome dinner at our favourite Texas BBQ, The Smoke Shack
          <div className="text-big-red">3714 Broadway</div>
        </div>
        <div> {/*friday*/}
          4:00 pm
          <br />
          Come to the park for photos & enjoy the views
        </div>
        <div>{/*blank thursday*/}</div>
        <div> {/*friday*/}
          4:30 pm
          <br />
          The wedding ceremony! & more photos during Golden Hour
        </div>
        <div>{/*blank thursday*/}</div>
        <div> {/*friday*/}
          6:00 pm
          <br />
          Hot pot dinner at Sichuan Garden
          <div className="text-big-red">2347 NW Military Hwy</div>
        </div>
      </div>
    </div>
  )

  const Details = () => (
    <div className="bg-green-400 h-screen" ref={detailsRef}>
      <h1 className="text-4xl text-center">Details</h1>
    </div>
  )

  return (
    <>
      <Navbar sections={[
        {ref: homeRef, name: 'Home', id: 'home'},
        {ref: locationRef, name: 'Location', id: 'location'},
        {ref: scheduleRef, name: 'Schedule', id: 'schedule'},
        {ref: detailsRef, name: 'Details', id: 'details'},
      ]} />
      <Home />
      <Location />
      <Schedule />
      <Details />
    </>
  );
}

export default Main
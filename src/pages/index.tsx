import { createRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import confettiFireworks from "../utils/fireworks";
import Place from "../components/Place";
import Event from "../components/Event";
import { plans } from "../../events";
import dayjs from "dayjs";

import mainImage from "../../public/imgs/main-getting-married.jpg";
import parkImage from "../../public/imgs/park-engaged.jpg";
import usAndCatoImage from "../../public/imgs/us-and-cato.jpg";

const CounterCard = (props: { value: number; label: string }) => (
  <div className="flex flex-col gap-1 items-center justify-center">
    <div className="bg-alice-blue flex items-center justify-center border-big-red border-2 md:border-3 rounded-xl w-12 md:w-16 h-16 md:h-20 text-center text-2xl md:text-3xl text-big-red">
      {props.value}
    </div>
    <div className="text-big-red">{props.label}</div>
  </div>
);

function secondsToTimeSince(date: Date) {
  const dayjsDate = dayjs(date);
  const now = dayjs();

  const years = now.diff(dayjsDate, "year");
  const nowMinusYears = now.subtract(years, "year");

  const months = nowMinusYears.diff(dayjsDate, "month");
  const nowMinusMonths = nowMinusYears.subtract(months, "month");

  const days = nowMinusMonths.diff(dayjsDate, "day");
  const nowMinusDays = nowMinusMonths.subtract(days, "day");

  const hours = nowMinusDays.diff(dayjsDate, "hour");
  const nowMinusHours = nowMinusDays.subtract(hours, "hour");

  const minutes = nowMinusHours.diff(dayjsDate, "minute");
  const nowMinusMinutes = nowMinusHours.subtract(minutes, "minute");

  const seconds = nowMinusMinutes.diff(dayjsDate, "second");

  return {
    years: years > 0 ? years : undefined,
    months,
    days,
    hours,
    minutes,
    seconds,
  };
}

type TimeSince = ReturnType<typeof secondsToTimeSince>;

function TimeSinceCounter(props: { date: Date }) {
  const [timeSince, setTimeSince] = useState<TimeSince>(
    secondsToTimeSince(props.date)
  );
  // update every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSince(secondsToTimeSince(props.date));
    }, 1000);
    return () => clearInterval(timer);
  });

  return (
    <div className="flex flex-col items-center">
      {/* show the time sense */}
      <div className="flex flex-row gap-2 md:gap-3 items-center justify-center">
        {!!timeSince.years && (
          <CounterCard value={timeSince.years} label="years" />
        )}
        <CounterCard value={timeSince.months} label="months" />
        <CounterCard value={timeSince.days} label="days" />
        <CounterCard value={timeSince.hours} label="hours" />
        <CounterCard value={timeSince.minutes} label="minutes" />
        <CounterCard value={timeSince.seconds} label="seconds" />
      </div>
    </div>
  );
}

function Main() {
  const homeRef = createRef<HTMLDivElement>();
  const locationRef = createRef<HTMLDivElement>();
  const scheduleRef = createRef<HTMLDivElement>();
  const detailsRef = createRef<HTMLDivElement>();
  const photosRef = createRef<HTMLDivElement>();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }, []);

  const Home = () => (
    <div className="bg-pink flex flex-col items-center" id="Home" ref={homeRef}>
      {/*lanterns*/}
      <div className="flex items-start lg:gap-20 gap-5 md:gap-10">
        <object
          data="/svg/lantern1.svg"
          className="h-20 flex-shrink md:h-full animate-swing origin-top hidden sm:block"
        ></object>
        <object
          data="/svg/lantern2.svg"
          className="h-20 flex-shrink md:h-full animate-swing origin-top"
        ></object>
        <object
          data="/svg/lantern3.svg"
          className="h-20 flex-shrink md:h-full animate-swing origin-top"
        ></object>
        <object
          data="/svg/lantern4.svg"
          className="h-20 flex-shrink md:h-full animate-swing origin-top"
        ></object>
        <object
          data="/svg/lantern5.svg"
          className="h-20 flex-shrink md:h-full animate-swing origin-top"
        ></object>
        <object
          data="/svg/lantern6.svg"
          className="h-20 flex-shrink md:h-full animate-swing origin-top"
        ></object>
      </div>
      <h1 className="text-center font-bangers text-3xl md:text-6xl font-bold text-big-red mt-10 tracking-wider">
        We got Married!
      </h1>
      <div className="py-4"/>
      <div className="flex flex-col items-center justify-center gap-6 py-3">
        <TimeSinceCounter date={plans.friday.start} />
        <button
          className="inline-flex animate-grow items-center text-2xl md:text-3xl font-bangers text-big-red bg-sizzling-sunrise hover:bg-amber-400 rounded-xl drop-shadow border-3 md:border-4 border-harvest-gold py-2 px-6 tracking-wider"
          onClick={confettiFireworks}
        >
          High score!
        </button>
      </div>
      <div className="w-5/6 lg:w-2/3 max-w-6xl my-10 drop-shadow-lg rounded-3xl border-4 md:border-6 border-big-red overflow-hidden">
        <Image
          priority
          src={mainImage}
          alt="Audrow and Michelley"
          layout="responsive"
          width={mainImage.width}
          height={mainImage.height}
        />
      </div>
      <button
        className="inline-flex animate-grow items-center text-2xl md:text-5xl font-bangers text-big-red bg-sizzling-sunrise hover:bg-amber-400 rounded-xl drop-shadow border-3 md:border-4 border-harvest-gold py-4 px-6 sm:px-6 md:px-14 lg:px-18 tracking-wider"
        onClick={confettiFireworks}
      >
        11/11/22 &nbsp;in &nbsp;San Antonio, Tx
      </button>
      <div className="py-10" />
    </div>
  );

  const Location = () => (
    <div className="bg-ltyellowbg " id="Location" ref={locationRef}>
      <div className="w-full flex flex-row justify-center">
        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 md:gap-3 md:mx-6">
          <div className="hidden md:flex flex-col justify-center items-center py-4 px-6">
            <img
              src={parkImage.src}
              alt="Audrow and Michelley in the park"
              className="w-full max-w-sm border-4 border-fire-opal drop-shadow-md rounded-3xl overflow-hidden"
            />
          </div>
          <Place
            title="Venue"
            svgPath="/svg/venue.svg"
            url="https://goo.gl/maps/xYZbHhp1sPpjzv8t6"
          >
            <p>
              Phil Hardberger park is a 300+ acre nature park near us, it{"’"}s
              where we go for our weekly Sunday hike and where we got engaged!
            </p>
            <br />
            <p>
              The ceremony will be held in the picnic area by the Urban Ecology
              Center, designed by Lake Flato, a well-known local architecture
              firm.
            </p>
          </Place>
          <Place
            title="Hotel"
            svgPath="/svg/hotel.svg"
            url="https://goo.gl/maps/NAMGszvCseSQZ3Qi7"
          >
            <p>
              There are plenty of hotel options near the airport and downtown,
              feel free to choose whatever works for you.
            </p>
            <br />
            <p>
              We stayed at the Estancia del Norte when we first moved here, and
              had a great experience. It’s 7 mins from the airport, and about 8
              mins from our house and Phil Hardberger park.
            </p>
          </Place>
        </div>
      </div>
    </div>
  );

  const Schedule = () => (
    <div className="bg-alice-blue py-10" id="Schedule" ref={scheduleRef}>
      <div className="w-full flex flex-row justify-center">
        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 text-center gap-y-6 md:gap-x-10 md:gap-y-10">
          <Event title="Thursday" calendarOptions={plans.thursday}>
            <div>
              <div className="font-semibold">6:00 pm</div>
              Welcome dinner at our favourite Texas BBQ, The Smoke Shack
              <div className="text-big-red">3714 Broadway</div>
            </div>
          </Event>
          <Event title="Friday" calendarOptions={plans.friday}>
            <div>
              <div className="font-semibold"> 4:00 pm </div>
              Come to the park for First Look, <br /> photos & enjoy the views
            </div>
            <div>
              <div className="font-semibold pt-3">4:30 pm</div>
              The wedding ceremony! <br /> & more photos during Golden Hour
            </div>
            <div>
              <div className="font-semibold pt-3">6:30 pm</div>
              Post ceremony dinner at <br /> Best Quality Daughter
              <div className="text-big-red">602 Avenue A</div>
            </div>
          </Event>
          <Event title="Saturday" calendarOptions={plans.saturday}>
            <div>
              <div className="font-semibold">10:00 am</div>
              Brunch at Box St. All Day
              <div className="text-big-red">623 Hemisfair Blvd</div>
            </div>
          </Event>
          <Event title="Sunday" calendarOptions={plans.sunday}>
            <div>
              <div className="font-semibold">11:00 am</div>
              Come over for lemony sourdough pancakes!
              <div className="text-big-red">Our Home</div>
            </div>
          </Event>
        </div>
      </div>
    </div>
  );

  const Details = () => (
    <div className="bg-pink" id="Details" ref={detailsRef}>
      <div className="flex justify-center py-10 md:py-16">
        <div className="text-center w-3/4 lg:max-w-3xl">
          <div>
            <object
              data="/svg/attire.svg"
              className="inline-flex justify-center -p-1"
            ></object>
            <div className="font-bold">ATTIRE</div>
            <div className="font-semibold">Semi-formal, no colors</div>
            <p>
              Following Chinese wedding traditions, Michelle and Audrow will be
              wearing red. During the ceremony please wear something in
              greyscale {"("}black, white, or grey{")"}. Semi-formal means suit
              jacket {"("}tie optional{")"}, cocktail dress, jumpsuit, etc.
              <br />
              For the rest of the events, please wear whatever you{"'"}re
              comfortable with.
            </p>
          </div>
          <div className="pt-10">
            <object
              data="/svg/weather.svg"
              className="inline-flex justify-center"
            ></object>
            <div className="font-bold p-2">WEATHER</div>
            <p>
              While we don{"'"}t have personal experience with Novembers in San
              Antonio, yet, historic weather data shows that the temperatures in
              mid-November have a high of 74 degrees, low of 55 degrees, about
              55% humidity, windspeed of 4mph - 14mph, and a 19% chance of
              percipitation.
            </p>
          </div>
          <div className="pt-10">
            <object
              data="/svg/registry.svg"
              className="inline-flex justify-center"
            ></object>
            <div className="font-bold p-2">REGISTRY</div>
            <p>
              We are more than grateful for those we love travel to our wedding,
              celebrating the happy occasion with us! We have most things we
              need for our house, however we are getting a puppy soon (!!!), so
              if you really would like to get us something for the puppy, here
              are some suggestions. Or find a cute Christmas ornament you’d like
              us to have.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const Photos = () => (
    <div className="bg-ltyellowbg flex flex-col items-center py-8" ref={photosRef}>
      <div className="font-bangers text-big-red text-center py-2 text-3xl md:text-5xl">
        Thank you for coming!
      </div>
      <div className="py-2" />
      <button className="bg-big-red rounded-xl text-white px-4 py-2 hover:bg-fire-opal">
        <a
          className="uppercase"
          href="https://freshcapsulephotography.pixieset.com/michelleandaudrowswedding/"
          target="_blank"
          rel="noreferrer"
        >
          See photos
        </a>
      </button>
      <div className="py-3" />
      <p className="text-center italic max-w-sm">
        The guest password is 02jbeEGO9Z and the download code is 1180
      </p>
    </div>
  );
  return (
    <>
      <Navbar
        sections={[
          { ref: homeRef, name: "Home", id: "home" },
          { ref: locationRef, name: "Location", id: "location" },
          { ref: scheduleRef, name: "Schedule", id: "schedule" },
          { ref: detailsRef, name: "Details", id: "details" },
          { ref: photosRef, name: "Photos", id: "photos" },
        ]}
      />
      <Home />
      <Location />
      <Schedule />
      <Details />
      <Photos />
      <footer className="bg-alice-blue py-16 md:py-0 md:h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="w-5/6 lg:w-2/3 max-w-6xl drop-shadow-lg rounded-3xl overflow-hidden">
          <Image
            priority
            src={usAndCatoImage}
            alt="Audrow, Michelley, and Cato"
            layout="responsive"
            width={usAndCatoImage.width}
            height={usAndCatoImage.height}
          />
        </div>
        <div className="py-3"/>
        <p>
          This website was made with love by Michelley and Audrow (and Cato)
        </p>
      </footer>
    </>
  );
}

export default Main;

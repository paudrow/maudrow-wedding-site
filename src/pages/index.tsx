import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { CalendarOptions } from "datebook";
import { Carousel, Navbar } from "flowbite-react";
import type { StaticImageData } from "next/image";

import alamo from "/public/imgs/alamo.png";
import benj from "/public/imgs/benj.png";
import couple from "/public/imgs/couple.png";
import brokenSpoke from "/public/imgs/broken-spoke.png";
import dressy from "/public/imgs/dressy.png";
import engagement from "/public/imgs/engagement.png";

import * as config from "../../config";
import Calendar from "../components/Calendar";

const ceremony = config.weddingDetails.ceremony;

const calendarOptions: CalendarOptions = {
  title: ceremony.title,
  location: ceremony.location,
  description: ceremony.description,
  start: ceremony.start,
  end: ceremony.end,
}

const Home: NextPage = () => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  // const countdown = trpc.useQuery(["example.countdown", { date: new Date().toLocaleString() }]);

  const carouselImages: StaticImageData[] = [alamo, benj, brokenSpoke, couple, dressy, engagement];
  const carouselClassNames = "h-56 sm:h-64 xl:h-80 2xl:h-96 bg-blue-200"
  const carouselSlideInterval = 5000
  return (
    <>
      <Head>
        <title>Michelley and Audrow{"'"}s Wedding</title>
        <meta name="description" content="Details about Michelley and Audrow's wedding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        fluid={true}
        rounded={true}
      >
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link
            href="/navbars"
            active={true}
          >
            Home
          </Navbar.Link>
          <Navbar.Link href="/navbars">
            Locations
          </Navbar.Link>
          <Navbar.Link href="/navbars">
            Schedule
          </Navbar.Link>
          <Navbar.Link href="/navbars">
            Attire
          </Navbar.Link>
          <Navbar.Link href="/rsvp">
            RSVP
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      <main>
        <div className={carouselClassNames}>
          <Carousel slideInterval={carouselSlideInterval}>
            {
              carouselImages.map((image, index) => (
                <div className="flex justify-center" key={index}>
                  <img src={image.src} alt={`carosel image ${index}`} className={carouselClassNames} />
                </div>
              ))
            }
          </Carousel>
        </div>

        <div className="flex justify-center">
          <div className="w-64">
            <Image
              src={couple}
              height={couple.height}
              width={couple.width}
              layout="intrinsic"
              alt="Michelley and Audrow"
            />
          </div>
        </div>
        <p>
          Welcome!
        </p>
        <Calendar calendarOptions={calendarOptions} />
      </main>
    </>
  );
};

export default Home;

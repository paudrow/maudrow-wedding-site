import type { NextPage } from "next";
import Head from "next/head";

import Navbar from "../components/Navbar";
import type { Section } from "../components/Navbar";

const Home: NextPage = () => {

  const home = {
    id: "home",
    title: "Home",
  }
  const location = {
    id: "location",
    title: "Location",
  }
  const schedule = {
    id: "schedule",
    title: "Schedule",
  }
  const attire = {
    id: "attire",
    title: "Attire",
  }

  const sections: Section[] = [home, location, schedule, attire]

  return (
    <>
      <Head>
        <title>Michelley and Audrow{"'"}s Wedding</title>
        <meta name="description" content="Details about Michelley and Audrow's wedding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar sections={sections} selectedId={'home'}/>

      <main>
        <div id={home.id} className={`h-96 flex flex-col justify-center bg-red-300`}>
          <h2 className="text-2xl font-bold text-center mt-10 mb-5">{home.title}</h2>
        </div>
        <div id={location.id} className={`h-96 flex flex-col justify-center bg-green-300`}>
          <h2 className="text-2xl font-bold text-center mt-10 mb-5">{location.title}</h2>
        </div>
        <div id={schedule.id} className={`h-96 flex flex-col justify-center bg-blue-300`}>
          <h2 className="text-2xl font-bold text-center mt-10 mb-5">{schedule.title}</h2>
        </div>
        <div id={attire.id} className={`h-96 flex flex-col justify-center bg-orange-300`}>
          <h2 className="text-2xl font-bold text-center mt-10 mb-5">{attire.title}</h2>
        </div>
      </main>
      <footer className="h-96 bg-red-300 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center mt-10 mb-5">footer</h2>
      </footer>
    </>
  );
};

export default Home;

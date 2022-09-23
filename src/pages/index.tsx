import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { CalendarOptions } from "datebook";

import couple from "/public/imgs/couple.png";

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

  return (
    <>
      <Head>
        <title>Michelley and Audrow's Wedding</title>
        <meta name="description" content="Details about Michelley and Audrow's wedding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="w-64">
          <Image
            src={couple}
            height={couple.height}
            width={couple.width}
            layout="intrinsic"
            alt="Michelley and Audrow"
          />
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

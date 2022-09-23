import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { ICalendar, CalendarOptions, GoogleCalendar, YahooCalendar, OutlookCalendar } from "datebook";

import * as config from "../../config";

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
        <p>
          Welcome!
        </p>
        <div className="grid grid-flow-col">
          <button onClick={() => new ICalendar(calendarOptions).download()}>
            Apple
          </button>
          <button>
            <a target="_blank" href={new GoogleCalendar(calendarOptions).render()} rel="noopener noreferrer">
              Google
            </a>
          </button>
          <button>
            <a target="_blank" href={new YahooCalendar(calendarOptions).render()} rel="noopener noreferrer">
              Yahoo
            </a>
          </button>
          <button>
            <a target="_blank" href={new OutlookCalendar(calendarOptions).render()} rel="noopener noreferrer">
              Outlook
            </a>
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;

import type { NextPage } from "next";
import Head from "next/head";
import { Navbar } from "flowbite-react";

import * as config from "../../config";
import Calendar from "../components/Calendar";

const Rsvp: NextPage = () => {

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
          <Navbar.Link href="/">
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
          <Navbar.Link
            href="/rsvp"
            active={true}
          >
            RSVP
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeNDYUu9d-qOQABY4HE0bjqvOOVySCT4naOBrR_xvDTmHppog/viewform?embedded=true" width="640" height="382" frameBorder="0">Loading…</iframe>
    </>
  );
};

export default Rsvp;

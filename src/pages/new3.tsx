import {createRef, useEffect, useState} from 'react';
import Navbar from '../components/Navbar';

function scrollTo(ref: React.RefObject<HTMLDivElement>, offset: number) {
  if (!ref.current) return;
  window.scrollTo({
    top: ref.current.offsetTop - offset,
    behavior: 'smooth',
  });
}

function getBottom(ref: React.RefObject<HTMLDivElement>) {
  if (!ref.current) return 0;
  return ref.current.offsetTop + ref.current.offsetHeight;
}

function Main() {

  const homeRef = createRef<HTMLDivElement>();
  const locationRef = createRef<HTMLDivElement>();
  const scheduleRef = createRef<HTMLDivElement>();
  const detailsRef = createRef<HTMLDivElement>();

  return (
    <>
      <Navbar sections={[
        {ref: homeRef, name: 'Home', id: 'home'},
        {ref: locationRef, name: 'Location', id: 'location'},
        {ref: scheduleRef, name: 'Schedule', id: 'schedule'},
        {ref: detailsRef, name: 'Details', id: 'details'},
      ]} />
      <div className="bg-blue-400 h-screen" ref={homeRef}>
        <h1 className="text-4xl text-center">Home</h1>
      </div>
      <div className="bg-orange-400 h-screen" ref={locationRef}>
        <h1 className="text-4xl text-center">Location</h1>
      </div>
      <div className="bg-purple-400 h-screen" ref={scheduleRef}>
        <h1 className="text-4xl text-center">Schedule</h1>
      </div>
      <div className="bg-green-400 h-screen" ref={detailsRef}>
        <h1 className="text-4xl text-center">Details</h1>
      </div>
    </>
  );
}

export default Main
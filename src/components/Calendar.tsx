import { ICalendar, CalendarOptions, GoogleCalendar, YahooCalendar, OutlookCalendar } from "datebook";

export default function Calendar({ calendarOptions }: { calendarOptions: CalendarOptions }) {
  return (
    <>
    <div className="py-3">
      <p>Add to calendar</p>
      <div className="flex flex-row justify-evenly gap-3 py-3">
        <button onClick={() => new ICalendar(calendarOptions).download()}>
          <object data="/svg/apple.svg"/>
        </button>
        <button>
          <a target="_blank" href={new GoogleCalendar(calendarOptions).render()} rel="noopener noreferrer">
          <object data="/svg/google.svg"/>
          </a>
        </button>
        <button>
          <a target="_blank" href={new YahooCalendar(calendarOptions).render()} rel="noopener noreferrer">
          <object data="/svg/yahoo.svg"/>
          </a>
        </button>
        <button>
          <a target="_blank" href={new OutlookCalendar(calendarOptions).render()} rel="noopener noreferrer">
          <object data="/svg/ms.svg"/>
          </a>
        </button>
      </div>
      </div>
    </>
  )
}


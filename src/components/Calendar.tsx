import { ICalendar, CalendarOptions, GoogleCalendar, YahooCalendar, OutlookCalendar } from "datebook";

export default function Calendar({ calendarOptions }: { calendarOptions: CalendarOptions }) {
  return (
    <>
      <h1>
        {calendarOptions.title}
      </h1>
      <p>Add to calendar</p>
      <div className="grid grid-flow-row">
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
    </>
  )
}


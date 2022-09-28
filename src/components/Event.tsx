import Calendar from "./Calendar"
import type { CalendarOptions } from "datebook"

const Event = ({title, calendarOptions, children}: {title: string, calendarOptions: CalendarOptions, children: JSX.Element | JSX.Element[] }) => (
  <div className='h-full flex flex-col justify-between'>
    <div>
      <h1 className='text-xl uppercase'>
        {title}
      </h1>
      <div>
        {children}
      </div>
    </div>
    <div>
      <Calendar calendarOptions={calendarOptions} />
    </div>
  </div>
)

export default Event
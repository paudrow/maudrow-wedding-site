import Calendar from "./Calendar"
import type { CalendarOptions } from "datebook"

const Event = ({title, calendarOptions, children}: {title: string, calendarOptions: CalendarOptions, children: JSX.Element | JSX.Element[] }) => (
  <div className='h-full flex flex-col justify-between items-center'>
    <div>
      <h1 className='text-xl uppercase font-bold py-3'>
        {title}
      </h1>
      <div className="max-w-sm px-6">
        {children}
      </div>
    </div>
    <div className="py-3">
      <Calendar calendarOptions={calendarOptions} />
    </div>
  </div>
)

export default Event
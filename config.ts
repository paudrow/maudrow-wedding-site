import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import endent from "endent"
dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.tz.setDefault("America/Chicago")

const ceremonyDayJs = dayjs.tz('2022-11-11T16:30', 'America/Chicago')
const ceremonyDurationMinutes = 60

export const weddingDetails = {
  ceremony: {
    title: "Michelley & Audrow\'s Wedding Ceremony",
    start: ceremonyDayJs.toDate(),
    end: ceremonyDayJs.add(ceremonyDurationMinutes, 'minutes').toDate(),
    location: "Phil Hardberger Park, 8400 NW Military Hwy, San Antonio, TX 78231, USA",
    description: endent`
      We'll meet in the park at ${ceremonyDayJs.format('h:mm A')} for a quick ceremony. Afterwards we'll go to dinner.
    `
  }
}

console.log(weddingDetails.ceremony)
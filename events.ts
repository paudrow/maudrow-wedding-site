import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import endent from "endent"
import type { CalendarOptions } from 'datebook';
dayjs.extend(utc)
dayjs.extend(timezone)

const thursday: CalendarOptions = {
  title: "Welcome Dinner at The Smoke Shack!",
  location: "3714 Broadway, San Antonio, TX",
  description: endent`
    Come join us for some Texas BBQ! This is our favorite place in Texas so far.
  `,
  start: dayjs.tz('2022-11-10T18:00', 'America/Chicago').toDate(),
  end:   dayjs.tz('2022-11-10T20:00', 'America/Chicago').toDate(),
}

const friday: CalendarOptions = {
  title: "Michelley & Audrow\'s Wedding Ceremony + Dinner",
  location: "Phil Hardberger Park, 8400 NW Military Hwy, San Antonio, TX 78231, USA",
  description: endent`
    We'll meet in the park for a quick ceremony and then go to dinner.
  `,
  start: dayjs.tz('2022-11-11T16:00', 'America/Chicago').toDate(),
  end:   dayjs.tz('2022-11-11T21:00', 'America/Chicago').toDate(),
}

const saturday: CalendarOptions = {
  title: "Brunch + Farmers Market",
  location: "303 Pearl Pkwy, San Antonio, TX 78215",
  description: endent`
    We'll meet at the Pearl for brunch and then walk around the farmers market.
  `,
  start: dayjs.tz('2022-11-12T10:30', 'America/Chicago').toDate(),
  end:   dayjs.tz('2022-11-12T14:00', 'America/Chicago').toDate(),
}

const sunday: CalendarOptions = {
  title: "Michelley Makes Pancakes!",
  location: "11210 Cedar Elm Drive, San Antonio, TX 78230, USA",
  description: endent`
    For those still around, Michelley will be making pancakes!
  `,
  start: dayjs.tz('2022-11-13T11:00', 'America/Chicago').toDate(),
  end:   dayjs.tz('2022-11-13T14:00', 'America/Chicago').toDate(),
}

export const plans = {thursday, friday, saturday, sunday}

export const weddingDate = friday.start
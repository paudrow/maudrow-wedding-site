/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from 'react';

type TimeRemaining = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const CountdownTimer = ({targetDate, showSeconds=true}: { targetDate: Date, showSeconds?: boolean }) => {

  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | undefined>()
  const [loading, setLoading] = useState(true)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    const targetTime = targetDate.getTime()
    setInterval(() => {
      const countDown = targetTime - new Date().getTime()
      const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

      setTimeRemaining({
        days, hours, minutes, seconds
      })
      setFinished(days + hours + minutes + seconds < 0)
      if (loading) {
        setLoading(false)
      }
    }, 1000)
  })
  if (loading) {
    return (
      <div>Loading timer</div>
    )
  } else if (finished) {
    return (
      <div>They should be married by now!</div>
    )
  } else {
    return (
      <div className='flex flex-row gap-6'>
        <TimeCard value={timeRemaining!.days} units={'Days'} />
        <TimeCard value={timeRemaining!.hours} units={'Hours'} />
        <TimeCard value={timeRemaining!.minutes} units={'Minutes'} />
        {showSeconds && <TimeCard value={timeRemaining!.seconds} units={'Seconds'} />
        }
      </div>
    )
  }
};

function TimeCard({value, units}: {value: number, units: string}) {
  return (
      <div className='flex flex-col gap-2 items-center'>
        <div className='bg-alice-blue py-5 px-3 border-big-red border-2 rounded-xl w-16 h-20 text-center text-3xl text-big-red'>
          {value}
        </div>
        <div className='text-big-red'>
          {units}
        </div>
      </div>
  )
}

export default CountdownTimer;

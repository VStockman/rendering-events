import { extractTime } from './extractTime';

const TOTAL_MINUTES_IN_WORK_DAY = 12 * 60;

/**
 * This method calculates the event top percentage relative to the working hours
 * @param {{id: string; start: string; duration: number}} event The event
 * @return {number}
 */
export const getTop = event => {
  const { hours, minutes } = extractTime(event.start);
  const minutesSince9am = (hours - 9) * 60 + minutes;

  return (minutesSince9am / TOTAL_MINUTES_IN_WORK_DAY) * 100;
};

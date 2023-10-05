import { extractTime } from './extractTime';

/**
 * This method calculates the end of the event with start and duration fields
 * @param {{id: string; start: string; duration: number}} event The event
 * @returns {string}
 */
export const getEndTime = event => {
  const { hours, minutes } = extractTime(event.start);

  const startDate = new Date();
  startDate.setHours(hours, minutes, 0, 0);

  const endDate = new Date(startDate.getTime() + event.duration * 60000);
  return endDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

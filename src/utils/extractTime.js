/**
 * This method returns the hours and minutes of the time as a two numbers.
 * @param {string} time The time we want to convert into two numbers.
 * @returns {{hours: number; minutes: number}}
 */
export const extractTime = time => {
  const startTimeParts = time.split(':');
  const hours = parseInt(startTimeParts[0], 10);
  const minutes = parseInt(startTimeParts[1], 10);

  return { hours, minutes };
};

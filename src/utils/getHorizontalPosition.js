import { isOverlapping } from './getOverlaps';

/**
 * This method calculates and returns the left and width percentage for an event
 * @param {{id: string; start: string; duration: number; end: string; overlaps: Array<string>; groups: Array<string>}} event The event
 * @param {Array<{id: string; start: string; duration: number; end: string; overlaps: Array<string>; groups: Array<string>}>} events The events list, used to compare information with the current event
 * @param {Array<{id: string; start: string; duration: number; end: string; overlaps: Array<string>; groups: Array<string>; left: number}>} acc The accumulator of the array.reduce parent, used to check left's values inside event's group

 * @returns {{left: number; width: number}}
 */
export function getHorizontalPosition(event, events, acc) {
  // We set the width as 100 and left as 0
  let width = 100;
  let left = 0;

  if (event.overlaps.length) {
    const overlaps = events.filter(item => item.overlaps.includes(event.id));
    const sortedGroups = events
      .filter(item => event.groups.includes(item.id))
      .sort((a, b) => b.duration - a.duration);

    if (
      event.overlaps?.length === event.groups?.length - 1 &&
      overlaps.every(slot => slot.overlaps.length === event.overlaps.length)
    ) {
      // If all events in groups overlaps each others, set the width as max divided by number of events overlapping current event and left by sorting order
      width = 100 / event.groups.length;

      left = sortedGroups.findIndex(e => e.id === event.id);
    } else {
      // We set the width of the event as 100 divided by the highest overlaps value of the group
      const highestOverlaps = Math.max(
        ...sortedGroups.map(e => e.overlaps.length)
      );
      width = 100 / highestOverlaps;

      // The array.reduce accumulator is used to check for the existing events that have a left value in the group, and add 1 each time the event is overlapped by a group's event and has the same left value
      acc.forEach(e => {
        if (e.left === left && isOverlapping(event, e)) {
          left = left + 1;
        }
      });
    }
  }
  return { left, width };
}

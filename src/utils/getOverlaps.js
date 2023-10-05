/**
 * This method returns a boolean value, indicating whether two events overlap
 * @param {{id: string; start: string; duration: number; end: string}} a The first event
 * @param  {{id: string; start: string; duration: number; end: string}} b The second event
 * @returns {boolean}
 */
export const isOverlapping = (a, b) => {
  return a.start < b.end && a.end > b.start;
};

/**
 * This method adds a 'groups' field to each event, containing the IDs of each event in the overlapping group
 * @param  {Array<{id: string; start: string; duration: number; end: string; top: number; overlaps: Array<string>;}>} events The events list
 * @returns {Array<{id: string; start: string; duration: number; end: string; top: number; overlaps: Array<string>; groups: Array<string>}>}
 */
export const getOverlapsGroups = events => {
  return events.map(event => {
    const groups = [];
    event.overlaps.forEach(o => {
      const event = events.find(e => e.id === o);
      event.overlaps.forEach(f => groups.push(f));
      groups.push(event.id);
    });
    return {
      ...event,
      groups: [...new Set(groups)],
    };
  });
};

/**
 * This method adds an 'overlaps' field to each event, containing the IDs of the overlapping events
 * @param  {Array<{id: string; start: string; duration: number; end: string; top: number}>} events The events list
 * @returns {Array<{id: string; start: string; duration: number; end: string; top: number; overlaps: Array<string>}>}
 */
export const getOverlappedEvents = events => {
  return events.map(a => {
    const overlaps = [];

    events.forEach(b => {
      if (isOverlapping(a, b) && a.id !== b.id) {
        overlaps.push(b.id);
      }
    });

    return {
      ...a,
      overlaps,
    };
  });
};

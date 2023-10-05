import './EventsList.css';
import input from '../../data/input.json';
import Event from '../Event/Event';
import { getTop } from '../../utils/getTop';
import {
  getOverlapsGroups,
  getOverlappedEvents,
} from '../../utils/getOverlaps';
import { getHorizontalPosition } from '../../utils/getHorizontalPosition';
import { getEndTime } from '../../utils/getEndTime';
import { useEffect, useState } from 'react';

export default function EventsList() {
  const [windowHeight, setWindowHeight] = useState(window?.innerHeight);

  const onWindowResize = e => {
    setWindowHeight(e.target.innerHeight);
  };

  const sortedEvents = input
    .sort((a, b) => a.start.localeCompare(b.start))
    .map(e => ({
      ...e,
      end: getEndTime(e),
      top: getTop(e),
    }));

  const eventsWithOverlaps = getOverlappedEvents(sortedEvents);
  const eventsWithGroups = getOverlapsGroups(eventsWithOverlaps);

  const events = eventsWithGroups.reduce((acc, event) => {
    const { left, width } = getHorizontalPosition(event, eventsWithGroups, acc);
    return acc.concat({ ...event, left, width });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return (
    <div className='Events'>
      {events.map(e => (
        <Event key={e.id} event={e} windowHeight={windowHeight} />
      ))}
    </div>
  );
}

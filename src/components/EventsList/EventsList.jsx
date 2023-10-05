import './EventsList.css';
import input from '../../data/input.json';
import Event from '../Event/Event';

import { getEndTime } from '../../utils/getEndTime';
import { useEffect, useState } from 'react';
import { getTop } from '../../utils/getTop';

export default function EventsList() {
  const [windowHeight, setWindowHeight] = useState(window?.innerHeight);

  const onWindowResize = e => {
    setWindowHeight(e.target.innerHeight);
  };

  const events = input
    .sort((a, b) => a.start.localeCompare(b.start))
    .map(e => ({
      ...e,
      end: getEndTime(e),
      top: getTop(e),
    }));

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

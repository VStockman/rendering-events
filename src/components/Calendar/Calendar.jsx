import './Calendar.css';
import EventsList from '../EventsList/EventsList';
import HourColumn from '../HourColumn/HourColumn';

export default function Calendar() {
  return (
    <div className='Calendar'>
      <HourColumn />
      <EventsList />
    </div>
  );
}

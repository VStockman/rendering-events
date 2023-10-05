import './Event.css';

export default function Event({ event, windowHeight }) {
  const height = (windowHeight / 12) * (event.duration / 60);

  return (
    <div
      className='Event'
      style={{
        width: `${event.width}%`,
        height: height,
        top: `${event.top}%`,
        left: `${event.left * event.width}%`,
      }}>
      ID: {event.id} - Start: {event.start} - End: {event.end}
    </div>
  );
}

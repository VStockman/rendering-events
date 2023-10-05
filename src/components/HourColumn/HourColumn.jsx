import './HourColumn.css';

export default function HourColumn() {
  const hours = Array.from({ length: 12 }, (_, index) => index + 9 + ':00');
  return (
    <div className='hours'>
      {hours.map(h => (
        <div className='hour' key={h}>
          {h}
        </div>
      ))}
    </div>
  );
}

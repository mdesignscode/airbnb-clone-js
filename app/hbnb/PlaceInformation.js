import styles from './places.module.css';

export default function PlaceInfo ({ place }) {
  return (
    <div className={styles.information}>
      <div className={styles.max_guest}><span>
        {place.maxGuest} {place.maxGuest < 2 ? 'Guest' : 'Guests'}
      </span></div>
      <div className={styles.number_rooms}><span>
        {place.numberRooms} {place.numberRooms < 2 ? 'Room' : 'Rooms'}
      </span></div>
      <div className={styles.number_bathrooms}><span>
        {place.numberBathrooms} {place.numberBathrooms < 2 ? 'Bathroom' : 'Bathrooms'}
      </span></div>
    </div>
  );
}

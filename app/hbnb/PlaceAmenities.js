import styles from './places.module.css';

export default function PlaceAmenities ({ amenities }) {
  return (
    <div className={styles.amenities}>
      <h2>Amenities</h2>
      <ul>
        {
          amenities.map(({ name, id }) => {
            const styleName = name.split(' ')[[0]];
            return (
              <li
                className={`${styles[styleName]} ${styleName}`}
              >
                <span className={styles.name} key={id}>{name}</span>
              </li>
            );
          })
        }
      </ul>

    </div>
  );
}

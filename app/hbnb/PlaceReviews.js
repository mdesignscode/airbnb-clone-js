import { useEffect, useState } from 'react';
import styles from './places.module.css';

export default function PlaceReviews ({ reviews }) {
  const [users, setUsers] = useState([]);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    async function fetchUsers () {
      const promises = reviews.map(async ({ userId }) => {
        const userReq = await fetch(`https://airbnb-clone-js-api.onrender.com/api/v1/users/${userId}`);
        const user = await userReq.json();
        return user;
      });

      const users = await Promise.all(promises);
      setUsers(users);
    }

    if (showReviews) {
      fetchUsers();
    } else {
      setUsers([]);
    }
  }, [reviews, showReviews]);

  function handleShowReviews () {
    setShowReviews(!showReviews);
  }

  function handleHideReviews () {
    setShowReviews(false);
    setUsers([]);
  }

  return (
    <div className={styles.reviews}>
      <h2>
        Reviews
        <span onClick={showReviews ? handleHideReviews : handleShowReviews}>
          {showReviews ? 'hide' : 'show'}
        </span>
      </h2>
      {showReviews && (
        <ul>
          {
            reviews.map((review, index) => {
              const newDate = new Date(review.createdAt);
              const reviewDate = getFormattedDate(newDate);
              return users[index] ? (
                <li key={review.id}>
                  <h3>From {users[index].firstName} {users[index].lastName} on {reviewDate}</h3>
                  <p>{review.text}</p>
                </li>
              ) : '';
            })
          }
        </ul>
      )}
    </div>
  );
}

function getFormattedDate (date) {
  const day = date.getDate();
  const suffix = getOrdinalSuffix(day);
  const monthName = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  return `${day}${suffix} ${monthName} ${year}`;
}

function getOrdinalSuffix (day) {
  if (day >= 11 && day <= 13) {
    return 'th';
  } else if (day % 10 === 1) {
    return 'st';
  } else if (day % 10 === 2) {
    return 'nd';
  } else if (day % 10 === 3) {
    return 'rd';
  } else {
    return 'th';
  }
}

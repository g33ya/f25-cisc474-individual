"use client";
import styles from "./page.module.css";

interface Notification {
  id: number;
  type: "announcement" | "grade";
  title: string;
  course: string;
  content: string;
  postedAt: string;
}

// Hardcoded for now, will need to make dynamic when we have backend connected
const notifications: Notification[] = [
  {
    id: 1,
    type: "announcement",
    title: "Announcement Title",
    course: "CISC474: Advanced Web Technologies",
    content: "Welcome to the first week of CISC474! Make sure...",
    postedAt: "September 10th, 4:00pm",
  },
  {
    id: 2,
    type: "grade",
    title: "Graded: CISC474 Class 1 Quiz",
    course: "CISC474: Advanced Web Technologies",
    content: "",
    postedAt: "September 9th, 3:00pm",
  },
];

export default function NotificationsTab() {
  return (
    <div className={styles.main}>
      <div className={styles.notificationsHeader}>
        <h1>Notifications</h1>
      </div>
      <hr/>

      <div className={styles.notificationsList}>
        {notifications.map((n) => (
          <div key={n.id} className={styles.notificationCard}>
            <div className={styles.notificationHeader}>
              <h3>{n.title}</h3>
              <span className={styles.date}>{n.postedAt}</span>
            </div>
            <p className={styles.course}>{n.course}</p>
            {n.content && <p className={styles.content}>{n.content}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}


import styles from "../page.module.css";
import Link from 'next/link';

export default function CoursesTab() {
  return (
    <div>
        <h2>Your Courses</h2>
        <Link href="/course-page">
            <button className={styles.button}>CISC474</button>
        </Link>
    </div>
  );
}

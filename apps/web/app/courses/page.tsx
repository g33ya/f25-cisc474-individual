"use client";
import styles from "./page.module.css";
import Link from "next/link";

interface Course {
  id: number;
  code: string;
  name: string;
  announcement: string;
  meetsIn: string;
  link: string;
}

const courses: Course[] = [
  {
    id: 1,
    code: "CISC474",
    name: "Advanced Web Technologies",
    announcement: "Welcome to the first week of…",
    meetsIn: "2 hours",
    link: "/course-page",
  },
  {
    id: 2,
    code: "CISC361",
    name: "Operating Systems",
    announcement: "No recent announcements",
    meetsIn: "1 day",
    link: "/course-page",
  },
];

export default function CoursesTab() {
  return (
    <div className={styles.main}>
      <h2 className={styles.header}>Courses</h2>
      <hr />

      <div className={styles.grid}>
        {courses.map((course) => (
          <Link key={course.id} href={`/courses/${course.code.toLowerCase()}/course-info`} className={styles.card}>
            <div className={styles.cardHeader}>
              <strong>
                {course.code}: {course.name}
              </strong>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.announcement}>
                📢 {course.announcement}
              </p>
              <p className={styles.meets}>Meets in: {course.meetsIn}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

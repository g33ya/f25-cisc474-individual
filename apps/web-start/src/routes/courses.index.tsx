import styles from "../styles/courses.module.css"
import { Link, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/courses/")({
  component: CoursesTab,
})

const courses = [
  { id: 1, code: "CISC474", name: "Advanced Web Technologies", announcement: "Welcome to the first week of…", meetsIn: "2 hours" },
  { id: 2, code: "CISC361", name: "Operating Systems", announcement: "No recent announcements", meetsIn: "1 day" },
]

function CoursesTab() {
  return (
    <div className={styles.main}>
      <h2 className={styles.header}>Courses</h2>
      <hr />
      <div className={styles.grid}>
        {courses.map((course) => (
          <Link
            key={course.id}
            to="/courses/$courseId"
            params={{ courseId: course.code.toLowerCase() }}
            className={styles.card}
          >
            <div className={styles.cardHeader}>
              <strong>{course.code}: {course.name}</strong>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.announcement}>📢 {course.announcement}</p>
              <p className={styles.meets}>Meets in: {course.meetsIn}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

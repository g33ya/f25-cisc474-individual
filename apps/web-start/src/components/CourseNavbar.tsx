"use client"
import { Link, useParams } from "@tanstack/react-router"
import styles from "../styles/course-navbar.module.css"

export default function CourseNavbar() {
  const { courseId } = useParams({ from: "/courses/$courseId" })

  return (
    <nav className={styles.coursenavbar}>
      <Link
        to="/courses/$courseId/course-info"
        params={{ courseId }}
        className={styles["course-nav-link"]}
        activeProps={{ className: styles.active }}
      >
        Course Information
      </Link>
      <Link
        to="/courses/$courseId/assignments"
        params={{ courseId }}
        className={styles["course-nav-link"]}
        activeProps={{ className: styles.active }}
      >
        Assignments
      </Link>
    </nav>
  )
}

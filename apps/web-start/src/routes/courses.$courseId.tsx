import { createFileRoute, Outlet, useParams } from "@tanstack/react-router"
import CourseNavbar from "../components/CourseNavbar"
import styles from "../styles/course.module.css"

export const Route = createFileRoute("/courses/$courseId")({
  component: CourseLayout,
})

function CourseLayout() {
  const { courseId } = useParams({ from: "/courses/$courseId" })

  return (
    <div className={styles.main}>
      <CourseNavbar courseId={courseId} />
      <Outlet />
    </div>
  )
}

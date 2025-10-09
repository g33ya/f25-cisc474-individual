import { createFileRoute, useParams } from "@tanstack/react-router"
import styles from "../styles/course.module.css"

export const Route = createFileRoute("/courses/$courseId/course-info")({
  component: CourseInfoPage,
})

function CourseInfoPage() {
  const { courseId } = useParams({ from: "/courses/$courseId/course-info" })

  const courseInformation: Record<string, { title: string; description: string }> = {
    cisc474: {
      title: "CISC474: Course Information",
      description: "This is where CISC474 course information will go!",
    },
    cisc361: {
      title: "CISC361: Course Information",
      description: "This is where CISC361 course information will go!",
    },
  }

  const course = courseInformation[courseId]

  if (!course) {
    return <h2>Course information not found</h2>
  }

  return (
    <div className={styles.main}>
      <h2 className={styles.header}>{course.title}</h2>
      <hr />
      <p>{course.description}</p>
    </div>
  )
}

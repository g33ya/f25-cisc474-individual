import { createFileRoute, useParams } from "@tanstack/react-router"
import styles from "../styles/course.module.css"

export const Route = createFileRoute("/courses/$courseId/assignments")({
  component: AssignmentsPage,
})

function AssignmentsPage() {
  const { courseId } = useParams({ from: "/courses/$courseId/assignments" })

  return (
    <div className={styles.main}>
      <h2 className={styles.header}>{courseId.toUpperCase()} Assignments</h2>
      <hr />
      <p>This is where assignments will go.</p>
    </div>
  )
}

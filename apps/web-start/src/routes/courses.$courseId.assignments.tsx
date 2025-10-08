import styles from "./page.module.css";
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/courses/$courseId/assignments')({
  component: AssignmentsPage,
})

// Hardcoded for now, will need to make dynamic when we have backend connected
const courseAssignments: Record<string, { title: string; description: string }> = {
  cisc474: {
    title: "CISC474: Assignments",
    description: "This is where CISC474 assignments will go!",
  },
  cisc361: {
    title: "CISC361: Assignments",
    description: "This is where CISC361 assignments will go!",
  },
};

export default async function AssignmentsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;
  const course = courseAssignments[slug];

  if (!course) {
    return <h2>Course assignments not found</h2>;
  }

  return (
    <div className={styles.main}>
      <h2 className={styles.header}>{course.title}</h2>
      <hr />
      <p>{course.description}</p>
    </div>
  );
}
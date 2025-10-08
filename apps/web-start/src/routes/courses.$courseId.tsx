import styles from "./styles/course.module.css";
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/courses/$courseId')({
  component: CoursePage,
})

// Hardcoded for now, will need to make dynamic when we have backend connected
const courseDetails: Record<string, { title: string; description: string }> = {
  cisc474: {
    title: "CISC474: Advanced Web Technologies",
    description: "This is where class info will go!.",
  },
  cisc361: {
    title: "CISC361: Operating Systems",
    description: "This is where class info will go!.",
  },
};

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;
  const course = courseDetails[slug];

  if (!course) {
    return <h2>Course not found</h2>;
  }

  return (
    <div className={styles.main}>
      <h2 className={styles.header}>{course.title}</h2>
      <hr/>

      <p>{course.description}</p>
    </div>
  );
}


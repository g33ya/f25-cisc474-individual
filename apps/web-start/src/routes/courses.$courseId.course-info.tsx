import styles from "../../page.module.css";
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/courses/$courseId/course-info')({
  component: CourseInfoPage,
})

// Hardcoded for now, will need to make dynamic when we have backend connected
const courseInformation: Record<string, { title: string; description: string }> = {
  cisc474: {
    title: "CISC474: Course Information",
    description: "This is where CISC474 course information will go!",
  },
  cisc361: {
    title: "CISC361: Course Information",
    description: "This is where CISC361 course information will go!",
  },
};

export default async function CourseInfoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  
  const { slug } = await params;
  const course = courseInformation[slug];

  if (!course) {
    return <h2>Course information not found</h2>;
  }

  return (
    <div className={styles.main}>
      <h2 className={styles.header}>{course.title}</h2>
      <hr/>

      <p>{course.description}</p>
    </div>
  );
}

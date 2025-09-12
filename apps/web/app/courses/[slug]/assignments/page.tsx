import styles from "./page.module.css";

interface CoursePageProps {
  params: { slug: string };
}

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

export default function CoursePage({ params }: CoursePageProps) {
  const course = courseAssignments[params.slug];

  if (!course) {
    return <h2>Course assignments not found</h2>;
  }

  return (
    <div className={styles.main}>
      <h2 className={styles.header}>{course.title}</h2>
      <hr/>

      <p>{course.description}</p>
    </div>
  );
}

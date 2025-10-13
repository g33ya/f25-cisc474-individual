import { createServerFn } from "@tanstack/react-start";
import styles from "../styles/courses.module.css";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { backendFetcher } from "../integrations/fetcher";

type Course = { // Matches database table columns
  id: number;
  course_code: string;
  course_title: string;
  description?: string;
  start_date?: string;
  end_date?: string;
};

const mockCourses = [ // Will need to map backend data rather than using mock courses
  {
    id: 1,
    code: "CISC474",
    name: "Advanced Web Technologies",
    announcement: "Welcome to the first week of…",
    meetsIn: "2 hours",
  },
  {
    id: 2,
    code: "CISC361",
    name: "Operating Systems",
    announcement: "No recent announcements",
    meetsIn: "1 day",
  },
];

const loaderFn = createServerFn().handler(async () => { // Loader to fetch data from backend
  const fetchCourses = backendFetcher<Course[]>("/courses");
  const data = await fetchCourses();
  return data;
});

export const Route = createFileRoute("/courses/")({
  loader: async () => {
    const data = await loaderFn();
    return { data };
  },
  component: CoursesTab,
});

function CoursesTab() {
  const { data } = Route.useLoaderData() as { data: Course[] };

  return (
    <div className={styles.main}>
      <h2 className={styles.header}>Courses</h2>
      <hr />

      <div className={styles.grid}>
        {mockCourses.map((course) => (
          <Link
            key={course.id}
            to="/courses/$courseId"
            params={{ courseId: course.code.toLowerCase() }}
            className={styles.card}
          >
            <div className={styles.cardHeader}>
              <strong>
                {course.code}: {course.name}
              </strong>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.announcement}>📢 {course.announcement}</p>
              <p className={styles.meets}>Meets in: {course.meetsIn}</p>
            </div>
          </Link>
        ))}
      </div>

      <Suspense fallback={<div>Loading course data...</div>}>
        <div style={{ marginTop: "2rem" }}>
          <h2>Course Data Fetch</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </Suspense>
    </div>
  );
}

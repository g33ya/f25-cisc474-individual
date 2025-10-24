import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { useApiQuery } from "../integrations/api";
import { LoginButton } from "../components/LoginButton";
import { LogoutButton } from "../components/LogoutButton";
import styles from "../styles/courses.module.css";

type Course = {
  id: number;
  course_code: string;
  course_title: string;
  description?: string;
  start_date?: string;
  end_date?: string;
};

export const Route = createFileRoute("/courses/")({
  component: CoursesTab,
});

function CoursesTab() {
  const { isAuthenticated, isLoading } = useAuth0();

  const { data, showLoading, error } = useApiQuery<Course[]>(["courses"], "/courses");

  if (isLoading) {
    return <div className={styles.main}>Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.main}>
        <h2>Please log in to continue</h2>
        <LoginButton />
      </div>
    );
  }

  if (showLoading) return <div className={styles.main}>Loading courses...</div>;
  if (error) return <div className={styles.main}>Error: {error.message}</div>;

  return (
    <div className={styles.main}>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
        <LogoutButton />
      </div>

      <h2 className={styles.header}>Courses</h2>
      <hr />

      <div className={styles.grid}>
        {data?.map((course) => (
          <Link
            key={course.id}
            to="/courses/$courseId"
            params={{ courseId: course.course_code.toLowerCase() }}
            className={styles.card}
          >
            <div className={styles.cardHeader}>
              <strong>
                {course.course_code}: {course.course_title}
              </strong>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.announcement}>
                📢 {course.description || "No recent announcements"}
              </p>
              <p className={styles.meets}>
                Starts:{" "}
                {course.start_date
                  ? new Date(course.start_date).toLocaleDateString()
                  : "TBA"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

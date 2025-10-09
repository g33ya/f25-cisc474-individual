import styles from "../styles/assignments-tab.module.css";
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/assignments')({
  component: AssignmentsTab,
});

interface Assignment {
  id: number;
  title: string;
  due: string;
  completed: boolean;
}

interface CourseGroup {
  course: string;
  courseColor: string;
  assignments: Assignment[];
}

interface AssignmentGroup {
  date: string;
  isToday?: boolean;
  courses: CourseGroup[];
}

// Hardcoded for now, will need to make dynamic when we have backend connected
const data: AssignmentGroup[] = [
  {
    date: "September 10th",
    isToday: true,
    courses: [
      {
        course: "CISC474: Advanced Web Technologies",
        courseColor: "#b83b78",
        assignments: [
          { id: 1, title: "Class Quiz 2", due: "11:59pm", completed: true },
        ],
      },
      {
        course: "CISC361: Operating Systems",
        courseColor: "#73aca8ff",
        assignments: [
          { id: 2, title: "Homework 1", due: "4:00pm", completed: false },
        ],
      },
    ],
  },
  {
    date: "September 11th",
    courses: [
      {
        course: "CISC474: Advanced Web Technologies",
        courseColor: "#b83b78",
        assignments: [
          { id: 3, title: "Homework 2", due: "11:59pm", completed: false },
          { id: 4, title: "Project Interest Survey", due: "11:59pm", completed: false },
        ],
      },
    ],
  },
];

export default function AssignmentsTab() {
  return (
    <div className={styles.main}>

      <h2 className={styles.header}>Upcoming Assignments</h2>

      <hr/>

      {data.map((group) => (
        <div key={group.date} className={styles.group}>
          <p className={styles.date}>
            {group.isToday ? <strong>Today, {group.date}</strong> : group.date}
          </p>

          {group.courses.map((course) => (
            <div key={course.course} className={styles.assignmentBox}>
              <div
                className={styles.courseHeader}
                style={{ backgroundColor: course.courseColor }}
              >
                {course.course}
              </div>

              {course.assignments.map((a, i) => (
                <div key={a.id}>
                  <div className={styles.assignmentBody}>
                    <label className={styles.checkboxRow}>
                      <input type="checkbox" defaultChecked={a.completed} />
                      <span>{a.title}</span>
                    </label>
                    <span className={styles.due}>Due {a.due}</span>
                  </div>
                  {i < course.assignments.length - 1 && <hr className={styles.divider} />}
                </div>
              ))}

            </div>
          ))}

        </div>
      ))}
      
    </div>
  );
}

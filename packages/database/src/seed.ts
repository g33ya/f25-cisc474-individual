import { prisma } from "./client";

async function main() {
  // ---------------- USERS ----------------
  await prisma.user.createMany({
    data: [
      { id: 1, email: "alice@student.edu", first_name: "Alice", last_name: "Johnson" },
      { id: 2, email: "bob@student.edu",   first_name: "Bob",   last_name: "Smith" },
      { id: 3, email: "dr.miller@uni.edu", first_name: "Evelyn",last_name: "Miller" }, // Instructor
      { id: 4, email: "admin@uni.edu",     first_name: "Sam",   last_name: "Lee" },    // Admin
      { id: 5, email: "carol@student.edu", first_name: "Carol", last_name: "Nguyen" },
      { id: 6, email: "dan@student.edu",   first_name: "Dan",   last_name: "Patel" },
      { id: 7, email: "dr.taylor@uni.edu", first_name: "Marcus",last_name: "Taylor" }, // Instructor
      { id: 8, email: "emily@student.edu", first_name: "Emily", last_name: "Garcia" },
      { id: 9, email: "frank@student.edu", first_name: "Frank", last_name: "Kim" }
    ],
    skipDuplicates: true,
  });

  // ---------------- COURSES ----------------
  await prisma.course.createMany({
    data: [
      { id: 101, course_code: "CISC474", course_title: "Web Development", instructor_id: 3, description: "Modern full-stack development", start_date: new Date("2025-01-15"), end_date: new Date("2025-05-15") },
      { id: 102, course_code: "MATH242", course_title: "Calculus II", instructor_id: 7, description: "Integral calculus and series", start_date: new Date("2025-01-15"), end_date: new Date("2025-05-15") },
      { id: 103, course_code: "UNIV101", course_title: "First Year Seminar", instructor_id: 3, description: "Intro seminar for freshmen", start_date: new Date("2025-01-15"), end_date: new Date("2025-05-15") },
      { id: 104, course_code: "CISC220", course_title: "Data Structures", instructor_id: 7, description: "Fundamentals of algorithms", start_date: new Date("2025-01-15"), end_date: new Date("2025-05-15") },
      { id: 105, course_code: "ENGL110", course_title: "Critical Reading and Writing", instructor_id: 3, description: "College-level writing", start_date: new Date("2025-01-15"), end_date: new Date("2025-05-15") }
    ],
    skipDuplicates: true,
  });

  // ---------------- ENROLLMENTS ----------------
  await prisma.enrollment.createMany({
    data: [
      // Alice
      { user_id: 1, course_id: 101, role: "LEARNER" },
      { user_id: 1, course_id: 102, role: "LEARNER" },
      { user_id: 1, course_id: 105, role: "LEARNER" },

      // Bob
      { user_id: 2, course_id: 101, role: "LEARNER" },
      { user_id: 2, course_id: 104, role: "LEARNER" },

      // Carol
      { user_id: 5, course_id: 101, role: "LEARNER" },
      { user_id: 5, course_id: 105, role: "LEARNER" },

      // Dan
      { user_id: 6, course_id: 102, role: "LEARNER" },
      { user_id: 6, course_id: 104, role: "LEARNER" },

      // Emily
      { user_id: 8, course_id: 101, role: "LEARNER" },
      { user_id: 8, course_id: 105, role: "LEARNER" },

      // Frank
      { user_id: 9, course_id: 104, role: "LEARNER" },

      // Instructors
      { user_id: 3, course_id: 101, role: "INSTRUCTOR" },
      { user_id: 3, course_id: 103, role: "INSTRUCTOR" },
      { user_id: 3, course_id: 105, role: "INSTRUCTOR" },
      { user_id: 7, course_id: 102, role: "INSTRUCTOR" },
      { user_id: 7, course_id: 104, role: "INSTRUCTOR" }
    ],
    skipDuplicates: true,
  });

  // ---------------- ASSIGNMENTS ----------------
  await prisma.assignment.createMany({
    data: [
      { id: 201, course_id: 101, title: "Personal Website", submission_type: "FILE", points: 100, description: "Build a simple portfolio", open_date: new Date("2025-01-20"), due_date: new Date("2025-02-05") },
      { id: 202, course_id: 101, title: "Accessibility Reflection", submission_type: "TEXT", points: 50, description: "Short essay", open_date: new Date("2025-02-10"), due_date: new Date("2025-02-20") },
      { id: 207, course_id: 101, title: "JavaScript Quiz", submission_type: "URL", points: 25, description: "Quiz link", open_date: new Date("2025-03-01"), due_date: new Date("2025-03-05") },
      { id: 210, course_id: 101, title: "Final Project", submission_type: "FILE", points: 200, description: "Capstone project", open_date: new Date("2025-04-01"), due_date: new Date("2025-05-10") },
      { id: 203, course_id: 102, title: "Integration Practice", submission_type: "URL", points: 75, description: "Solve integrals", open_date: new Date("2025-01-25"), due_date: new Date("2025-02-15") },
      { id: 208, course_id: 102, title: "Series Worksheet", submission_type: "FILE", points: 50, description: "Power series problems", open_date: new Date("2025-03-10"), due_date: new Date("2025-03-20") },
      { id: 211, course_id: 102, title: "Final Exam", submission_type: "TEXT", points: 150, description: "Comprehensive exam", open_date: new Date("2025-05-01"), due_date: new Date("2025-05-12") },
      { id: 204, course_id: 104, title: "BST Implementation", submission_type: "FILE", points: 100, description: "Binary Search Tree code", open_date: new Date("2025-02-01"), due_date: new Date("2025-02-25") },
      { id: 205, course_id: 104, title: "Sorting Report", submission_type: "TEXT", points: 50, description: "Compare algorithms", open_date: new Date("2025-03-05"), due_date: new Date("2025-03-25") },
      { id: 212, course_id: 104, title: "Final Exam", submission_type: "TEXT", points: 150, description: "Comprehensive exam", open_date: new Date("2025-05-02"), due_date: new Date("2025-05-14") },
      { id: 206, course_id: 105, title: "Rhetorical Analysis", submission_type: "TEXT", points: 100, description: "Essay on rhetoric", open_date: new Date("2025-02-15"), due_date: new Date("2025-03-05") },
      { id: 209, course_id: 105, title: "Peer Review", submission_type: "TEXT", points: 25, description: "Review classmates", open_date: new Date("2025-03-06"), due_date: new Date("2025-03-10") },
      { id: 213, course_id: 105, title: "Final Paper", submission_type: "FILE", points: 200, description: "Capstone writing project", open_date: new Date("2025-04-05"), due_date: new Date("2025-05-08") }
    ],
    skipDuplicates: true,
  });

  // ---------------- SUBMISSIONS ----------------
  await prisma.submission.createMany({
    data: [
      { id: 301, assignment_id: 201, user_id: 1, attempt_number: 1, status: "SUBMITTED", submitted_at: new Date("2025-02-04"), submission_file: "alice-website.zip" },
      { id: 302, assignment_id: 202, user_id: 1, attempt_number: 1, status: "LATE", submitted_at: new Date("2025-02-21"), submission_text: "Accessibility matters..." },
      { id: 303, assignment_id: 201, user_id: 2, attempt_number: 1, status: "SUBMITTED", submitted_at: new Date("2025-02-05"), submission_file: "bob-website-v1.zip" },
      { id: 313, assignment_id: 201, user_id: 2, attempt_number: 2, status: "SUBMITTED", submitted_at: new Date("2025-02-06"), submission_file: "bob-website-v2.zip" },
      { id: 310, assignment_id: 207, user_id: 5, attempt_number: 1, status: "SUBMITTED", submitted_at: new Date("2025-03-05T23:50:00"), submission_url: "https://forms.com/quiz1" },
      { id: 311, assignment_id: 208, user_id: 6, attempt_number: 1, status: "NOT_SUBMITTED" },
      { id: 305, assignment_id: 204, user_id: 2, attempt_number: 1, status: "SUBMITTED", submitted_at: new Date("2025-02-20"), submission_file: "bob-bst.zip" },
      { id: 312, assignment_id: 205, user_id: 6, attempt_number: 1, status: "SUBMITTED", submitted_at: new Date("2025-03-22"), submission_text: "Sorting algorithms are..." },
      { id: 306, assignment_id: 206, user_id: 1, attempt_number: 1, status: "SUBMITTED", submitted_at: new Date("2025-02-16"), submission_text: "Analyzing rhetorical strategies..." },
      { id: 307, assignment_id: 206, user_id: 5, attempt_number: 1, status: "SUBMITTED", submitted_at: new Date("2025-02-20"), submission_text: "Carol’s essay content..." },
      { id: 308, assignment_id: 209, user_id: 1, attempt_number: 1, status: "SUBMITTED", submitted_at: new Date("2025-03-08"), submission_text: "Peer review of Carol’s essay" },
      { id: 309, assignment_id: 209, user_id: 5, attempt_number: 1, status: "SUBMITTED", submitted_at: new Date("2025-03-09"), submission_text: "Peer review of Alice’s essay" }
    ],
    skipDuplicates: true,
  });

  // ---------------- GRADES ----------------
  await prisma.grade.createMany({
    data: [
      { id: 401, assignment_id: 201, submission_id: 301, student_id: 1, grader_id: 3, grade_value: 95, feedback: "Excellent work", graded_at: new Date("2025-02-07") },
      { id: 402, assignment_id: 202, submission_id: 302, student_id: 1, grader_id: 3, grade_value: 0, feedback: "Late submission", graded_at: new Date("2025-02-23") },
      { id: 403, assignment_id: 203, submission_id: 310, student_id: 5, grader_id: 7, grade_value: 88, feedback: "Good effort, minor mistakes", graded_at: new Date("2025-03-06") },
      { id: 404, assignment_id: 201, submission_id: 313, student_id: 2, grader_id: 3, grade_value: 82, feedback: "Better on v2", graded_at: new Date("2025-02-08") },
      { id: 405, assignment_id: 204, submission_id: 305, student_id: 2, grader_id: 7, grade_value: 85, feedback: "BST works, lacks comments", graded_at: new Date("2025-02-22") },
      { id: 406, assignment_id: 206, submission_id: 306, student_id: 1, grader_id: 3, grade_value: 92, feedback: "Well-structured essay", graded_at: new Date("2025-02-25") },
      { id: 407, assignment_id: 206, submission_id: 307, student_id: 5, grader_id: 3, grade_value: 88, feedback: "Great clarity, minor grammar", graded_at: new Date("2025-02-26") },
      { id: 408, assignment_id: 205, submission_id: 312, student_id: 6, grader_id: 7, grade_value: 90, feedback: "Solid explanations", graded_at: new Date("2025-03-26") }
    ],
    skipDuplicates: true,
  });

  // ---------------- NOTIFICATIONS ----------------
  await prisma.notification.createMany({
    data: [
      // Rolling weekly announcements
      { id: 501, type: "COURSE_NOTIFICATION", title: "Welcome to Web Dev", content: "Class starts next week!", course_id: 101, created_by_id: 3, created_at: new Date("2025-01-10") },
      { id: 502, type: "COURSE_NOTIFICATION", title: "Week 1 Reminder", content: "Don’t forget to install VS Code.", course_id: 101, created_by_id: 3, created_at: new Date("2025-01-18") },
      { id: 503, type: "COURSE_NOTIFICATION", title: "Assignment 1 Posted", content: "Personal Website is live.", course_id: 101, created_by_id: 3, created_at: new Date("2025-01-20") },
      { id: 504, type: "COURSE_NOTIFICATION", title: "Midterm Exam", content: "Web Dev midterm on March 15th.", course_id: 101, created_by_id: 3, created_at: new Date("2025-03-01") },
      { id: 505, type: "COURSE_NOTIFICATION", title: "Final Project Reminder", content: "Final project due May 10th.", course_id: 101, created_by_id: 3, created_at: new Date("2025-04-25") },

      { id: 506, type: "COURSE_NOTIFICATION", title: "Homework Reminder", content: "Calculus II homework due Friday.", course_id: 102, created_by_id: 7, created_at: new Date("2025-02-13") },
      { id: 507, type: "COURSE_NOTIFICATION", title: "Exam Announcement", content: "Final Exam May 12th.", course_id: 102, created_by_id: 7, created_at: new Date("2025-04-28") },

      { id: 508, type: "COURSE_NOTIFICATION", title: "Seminar Cancelled", content: "First Year Seminar cancelled next week.", course_id: 103, created_by_id: 3, created_at: new Date("2025-02-05") },

      { id: 509, type: "COURSE_NOTIFICATION", title: "Final Exam Reminder", content: "Data Structures exam May 14th.", course_id: 104, created_by_id: 7, created_at: new Date("2025-04-30") },

      { id: 510, type: "COURSE_NOTIFICATION", title: "Paper Guidelines", content: "Final paper instructions uploaded.", course_id: 105, created_by_id: 3, created_at: new Date("2025-04-01") },

      // Personal notifications
      { id: 511, type: "USER_NOTIFICATION", title: "Assignment Graded", content: "Your Website Project: 95/100", user_id: 1, created_by_id: 3, course_id: 101, created_at: new Date("2025-02-07") },
      { id: 512, type: "USER_NOTIFICATION", title: "Assignment Graded", content: "Your BST Implementation: 85/100", user_id: 2, created_by_id: 7, course_id: 104, created_at: new Date("2025-02-22") },
      { id: 513, type: "USER_NOTIFICATION", title: "Essay Graded", content: "Your Rhetorical Analysis: 88/100", user_id: 5, created_by_id: 3, course_id: 105, created_at: new Date("2025-02-26") }
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

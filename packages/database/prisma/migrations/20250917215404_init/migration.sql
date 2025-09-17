-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('LEARNER', 'INSTRUCTOR', 'ADMINISTRATOR');

-- CreateEnum
CREATE TYPE "public"."SubmissionStatus" AS ENUM ('SUBMITTED', 'LATE', 'NOT_SUBMITTED', 'GRADED');

-- CreateEnum
CREATE TYPE "public"."SubmissionType" AS ENUM ('TEXT', 'FILE', 'URL');

-- CreateEnum
CREATE TYPE "public"."NotificationType" AS ENUM ('COURSE_NOTIFICATION', 'USER_NOTIFICATION');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "preferred_name" TEXT,
    "pronouns" TEXT,
    "profile_picture" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Enrollment" (
    "id" SERIAL NOT NULL,
    "role" "public"."Role" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Course" (
    "id" SERIAL NOT NULL,
    "course_code" VARCHAR(7) NOT NULL,
    "course_title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "instructor_id" INTEGER NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Assignment" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "submission_type" "public"."SubmissionType" NOT NULL,
    "points" INTEGER NOT NULL,
    "open_date" TIMESTAMP(3) NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Submission" (
    "id" SERIAL NOT NULL,
    "submitted_at" TIMESTAMP(3),
    "submission_text" TEXT,
    "submission_file" TEXT,
    "submission_url" TEXT,
    "status" "public"."SubmissionStatus" NOT NULL,
    "attempt_number" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "assignment_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Grade" (
    "id" SERIAL NOT NULL,
    "grade_value" DECIMAL(65,30) NOT NULL,
    "feedback" TEXT,
    "graded_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "student_id" INTEGER NOT NULL,
    "assignment_id" INTEGER NOT NULL,
    "submission_id" INTEGER NOT NULL,
    "grader_id" INTEGER NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Notification" (
    "id" SERIAL NOT NULL,
    "type" "public"."NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "course_id" INTEGER,
    "user_id" INTEGER,
    "created_by_id" INTEGER NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Enrollment" ADD CONSTRAINT "Enrollment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Enrollment" ADD CONSTRAINT "Enrollment_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Course" ADD CONSTRAINT "Course_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Assignment" ADD CONSTRAINT "Assignment_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Submission" ADD CONSTRAINT "Submission_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "public"."Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Submission" ADD CONSTRAINT "Submission_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Grade" ADD CONSTRAINT "Grade_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Grade" ADD CONSTRAINT "Grade_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "public"."Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Grade" ADD CONSTRAINT "Grade_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "public"."Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Grade" ADD CONSTRAINT "Grade_grader_id_fkey" FOREIGN KEY ("grader_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/courses/$courseId/")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/courses/$courseId/course-info",
      params: { courseId: params.courseId },
    })
  },
})

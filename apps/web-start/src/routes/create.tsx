import { createFileRoute } from '@tanstack/react-router';
import { backendFetcher, mutateBackend } from '../integrations/fetcher';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CourseCreateIn, CourseOut } from '@repo/api/courses';
import { useState } from 'react';

export const Route = createFileRoute('/create')({
  component: RouteComponent,
});

function RouteComponent() {
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newInstructorId, setNewInstructorId] = useState(
    1,
  );

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newCourse: CourseCreateIn) => {
      return mutateBackend<CourseCreateIn, CourseOut>(
        '/courses',
        'POST',
        newCourse,
      );
    },
    onSuccess: (data: CourseOut) => {
      queryClient.setQueryData(['courses', data.id], data);
    },
  });

  return (
    <div>
      <header>
        <h1>Create a New Course</h1>
      </header>
      {mutation.isPending ? (
        <div>Creating course...</div>
      ) : (
        <>
          {mutation.isError ? (
            <div>Error creating course: {mutation.error.message}</div>
          ) : null}
          {mutation.isSuccess ? (
            <div>Course created successfully! ID: {mutation.data.id}</div>
          ) : null}
          <hr></hr>
          <div>
            <input
              type="text"
              placeholder="Course Name"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Course Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Instructor ID"
              value={newInstructorId}
              onChange={(e) => setNewInstructorId(Number(e.target.value))}
            />
          </div>
          <div></div>
          <div>
            <button
              onClick={() => {
                mutation.mutate({
                  code: 'COURSE123', // Replace with appropriate logic or value
                  title: newTitle,
                  description: newDescription,
                  instructorId: newInstructorId,
                  startDate: new Date().toISOString(), // Replace with appropriate logic or value
                  endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(), // Replace with appropriate logic or value
                });
              }}
            >
              Create Course
            </button>
          </div>
          <hr></hr>
          <div>
            <a href="/courses">Back to Courses</a>
          </div>
        </>
      )}
    </div>
  );
}
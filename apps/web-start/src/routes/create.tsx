import { createFileRoute } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { mutateBackend } from '../integrations/fetcher';
import { CourseCreateIn, CourseUpdateIn, CourseOut } from '@repo/api/courses';
import { useState } from 'react';

export const Route = createFileRoute('/create')({
  component: RouteComponent,
});

function RouteComponent() {
  /* ---------- CREATE STATES ---------- */
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newInstructorId, setNewInstructorId] = useState(1);

  /* ---------- UPDATE STATES ---------- */
  const [updateId, setUpdateId] = useState<number | ''>('');
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');

  /* ---------- DELETE STATES ---------- */
  const [deleteId, setDeleteId] = useState<number | ''>('');

  const queryClient = useQueryClient();

  /* ---------- CREATE MUTATION ---------- */
  const createMutation = useMutation({
    mutationFn: (newCourse: CourseCreateIn) =>
      mutateBackend<CourseCreateIn, CourseOut>('/courses', 'POST', newCourse),
    onSuccess: (data: CourseOut) => {
      queryClient.setQueryData(['courses', data.id], data);
      setNewTitle('');
      setNewDescription('');
      setNewInstructorId(1);
    },
  });

  /* ---------- UPDATE MUTATION ---------- */
  const updateMutation = useMutation({
    mutationFn: ({ id, ...patch }: { id: number } & CourseUpdateIn) =>
      mutateBackend<CourseUpdateIn, CourseOut>(
        `/courses/${Number(id)}`, // ✅ force numeric ID in URL
        'PATCH',
        patch,
      ),
    onSuccess: (data: CourseOut) => {
      queryClient.invalidateQueries(['courses']);
      setUpdateId('');
      setUpdateTitle('');
      setUpdateDescription('');
    },
  });

  /* ---------- DELETE MUTATION ---------- */
  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      mutateBackend<undefined, { message: string }>(
        `/courses/${Number(id)}`, // ✅ force numeric ID in URL
        'DELETE',
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(['courses']);
      setDeleteId('');
    },
  });

  /* ---------- UI ---------- */
  return (
    <div style={{ padding: '2rem' }}>
      <header>
        <h1>Manage Courses</h1>
      </header>

      {/* CREATE SECTION */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Create a New Course</h2>

        {createMutation.isError && (
          <div style={{ color: 'red' }}>
            Error creating course: {createMutation.error.message}
          </div>
        )}
        {createMutation.isSuccess && (
          <div style={{ color: 'green' }}>
            Course created successfully! ID: {createMutation.data.id}
          </div>
        )}

        <div>
          <input
            type="text"
            placeholder="Course Title"
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
        <div>
          <button
            onClick={() => {
              createMutation.mutate({
                course_code: 'CISC123',
                course_title: newTitle,
                description: newDescription,
                instructor_id: newInstructorId,
                start_date: new Date().toISOString(),
                end_date: new Date(
                  new Date().setMonth(new Date().getMonth() + 1),
                ).toISOString(),
              });
            }}
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? 'Creating...' : 'Create Course'}
          </button>
        </div>
      </section>

      {/* UPDATE SECTION */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Update an Existing Course</h2>

        {updateMutation.isError && (
          <div style={{ color: 'red' }}>
            Error updating course: {updateMutation.error.message}
          </div>
        )}
        {updateMutation.isSuccess && (
          <div style={{ color: 'green' }}>
            Course updated successfully! ID: {updateMutation.data.id}
          </div>
        )}

        <div>
          <input
            type="number"
            placeholder="Course ID"
            value={updateId}
            onChange={(e) =>
              setUpdateId(e.target.value ? Number(e.target.value) : '')
            }
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="New Title (optional)"
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="New Description (optional)"
            value={updateDescription}
            onChange={(e) => setUpdateDescription(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={() => {
              if (!updateId) return;
              updateMutation.mutate({
                id: Number(updateId), // ✅ force number before sending
                course_title: updateTitle || undefined,
                description: updateDescription || undefined,
              });
            }}
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? 'Updating...' : 'Update Course'}
          </button>
        </div>
      </section>

      {/* DELETE SECTION */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Delete a Course</h2>

        {deleteMutation.isError && (
          <div style={{ color: 'red' }}>
            Error deleting course: {deleteMutation.error.message}
          </div>
        )}
        {deleteMutation.isSuccess && (
          <div style={{ color: 'green' }}>Course deleted successfully!</div>
        )}

        <div>
          <input
            type="number"
            placeholder="Course ID"
            value={deleteId}
            onChange={(e) =>
              setDeleteId(e.target.value ? Number(e.target.value) : '')
            }
          />
        </div>
        <div>
          <button
            onClick={() => {
              if (!deleteId) return;
              deleteMutation.mutate(Number(deleteId)); // ✅ always number
            }}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete Course'}
          </button>
        </div>
      </section>

      <hr />
      <div>
        <a href="/courses">Back to Courses</a>
      </div>
    </div>
  );
}

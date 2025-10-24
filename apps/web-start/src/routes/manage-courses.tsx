import { createFileRoute } from '@tanstack/react-router';
import { useState, Suspense } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { useApiQuery, useApiMutation } from '../integrations/api';
import { LoginButton } from '../components/LoginButton';
import { LogoutButton } from '../components/LogoutButton';
import styles from '../styles/courses.module.css';
import { CourseCreateIn, CourseUpdateIn, CourseOut } from '@repo/api/courses';

type Course = {
  id: number;
  course_code: string;
  course_title: string;
  description?: string;
  start_date?: string;
  end_date?: string;
};

export const Route = createFileRoute('/manage-courses')({
  component: RouteComponent,
});

function RouteComponent() {
  //const queryClient = useQueryClient();
  const { isAuthenticated, isLoading } = useAuth0();

  const { data, showLoading, error } = useApiQuery<Course[]>(['courses'], '/courses');

  // --- Form state ---
  const [newCourseCode, setNewCourseCode] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newInstructorId, setNewInstructorId] = useState<number>();

  const [updateId, setUpdateId] = useState<number | ''>('');
  const [updateCourseCode, setUpdateCourseCode] = useState('');
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [updateInstructorId, setUpdateInstructorId] = useState<number>();

  const [deleteId, setDeleteId] = useState<number | ''>('');

  // --- Mutations using Auth0-aware API client ---
  const createMutation = useApiMutation<CourseCreateIn, CourseOut>({
    endpoint: (variables) => ({
      path: '/courses',
      method: 'POST',
    }),
    invalidateKeys: [['courses']],
  });


  const updateMutation = useApiMutation<
    CourseUpdateIn & { id: number },
    CourseOut
  >({
    endpoint: (v) => ({
      path: `/courses/${v.id}`,
      method: 'PATCH',
    }),
    invalidateKeys: [['courses']],
  });

  const deleteMutation = useApiMutation<{ id: number }, void>({
    endpoint: (variables) => ({
      path: `/courses/${variables.id}`,
      method: "DELETE",
    }),
    invalidateKeys: [["courses"]],
  })

  // --- Auth Guard ---
  if (isLoading) {
    return <div className={styles.main}>Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.main}>
        <h2>Please log in to continue</h2>
        <LoginButton redirectTo="/manage-courses" />
      </div>
    );
  }

  if (showLoading) return <div className={styles.main}>Loading course management page...</div>;
  if (error) return <div className={styles.main}>Error: {error.message}</div>;

  // --- UI ---
  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <LogoutButton />
      </div>

      <header>
        <h1>Manage Courses</h1>
      </header>
      <p>
        Use the forms below to create, update, or delete courses. Ensure you fill out all fields not denoted optional.
        A Course Data JSON is displayed underneath the forms — <strong>refresh the page</strong> to see your changes.
      </p>

      {/* ---------------- CREATE COURSE ---------------- */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Create a New Course</h2>

        {createMutation.isError && (
          <div style={{ color: 'red' }}>Error creating course: {createMutation.error?.message}</div>
        )}
        {createMutation.isSuccess && (
          <div style={{ color: 'green' }}>Course created successfully! ID: {createMutation.data.id}</div>
        )}

        <div>
          <input
            type="text"
            placeholder="Course Code (e.g. CISC361)"
            value={newCourseCode}
            onChange={(e) => setNewCourseCode(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Course Title (e.g. Operating Systems)"
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
            value={newInstructorId ?? ''}
            onChange={(e) => setNewInstructorId(Number(e.target.value))}
          />
        </div>

        <div>
          <button
            onClick={() =>
              createMutation.mutate({
                course_code: newCourseCode,
                course_title: newTitle,
                description: newDescription,
                instructor_id: newInstructorId ?? 1,
                start_date: new Date().toISOString(),
                end_date: new Date(
                  new Date().setMonth(new Date().getMonth() + 1)
                ).toISOString(),
              })
            }
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? 'Creating...' : 'Create Course'}
          </button>
        </div>

        <ul>
          <li><strong>Note:</strong> <em>course_code</em> can be max. 7 characters long.</li>
          <li><strong>Note:</strong> Ensure <em>instructor_id</em> corresponds with an existing instructor (e.g. 1, 3, 7).</li>
        </ul>
      </section>

      {/* ---------------- UPDATE COURSE ---------------- */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Update an Existing Course</h2>

        {updateMutation.isError && (
          <div style={{ color: 'red' }}>Error updating course: {updateMutation.error?.message}</div>
        )}
        {updateMutation.isSuccess && (
          <div style={{ color: 'green' }}>Course updated successfully!</div>
        )}

        <div>
          <input
            type="number"
            placeholder="Course ID"
            value={updateId}
            onChange={(e) => setUpdateId(e.target.value ? Number(e.target.value) : '')}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="New Course Code (optional)"
            value={updateCourseCode}
            onChange={(e) => setUpdateCourseCode(e.target.value)}
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
          <input
            type="number"
            placeholder="New Instructor ID (optional)"
            value={updateInstructorId ?? ''}
            onChange={(e) => setUpdateInstructorId(Number(e.target.value))}
          />
        </div>
        <div>
          <button
            onClick={() => {
              if (!updateId) return;
              updateMutation.mutate({
                id: Number(updateId),
                course_code: updateCourseCode || undefined,
                course_title: updateTitle || undefined,
                description: updateDescription || undefined,
                instructor_id: updateInstructorId || undefined,
              });
            }}
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? 'Updating...' : 'Update Course'}
          </button>
        </div>

        <ul>
          <li><strong>Note:</strong> <em>course_code</em> can be max. 7 characters long.</li>
          <li><strong>Note:</strong> Ensure <em>instructor_id</em> corresponds with an existing instructor (e.g. 1, 3, 7).</li>
        </ul>
      </section>

      {/* ---------------- DELETE COURSE ---------------- */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Delete a Course</h2>

        {deleteMutation.isError && (
          <div style={{ color: 'red' }}>Error deleting course: {deleteMutation.error?.message}</div>
        )}
        {deleteMutation.isSuccess && (
          <div style={{ color: 'green' }}>Course deleted successfully!</div>
        )}

        <div>
          <input
            type="number"
            placeholder="Course ID"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value ? Number(e.target.value) : '')}
          />
        </div>
        <div>
          <button
            onClick={() => {
              if (!deleteId) return;
              deleteMutation.mutate({ id: Number(deleteId) });
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

      <Suspense fallback={<div>Loading course data...</div>}>
        <div style={{ marginTop: '2rem' }}>
          <h2>Course Data Fetch</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </Suspense>
    </div>
  );
}

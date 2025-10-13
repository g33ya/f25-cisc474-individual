import { Button } from "@repo/ui/button";
import styles from "../styles/profile-settings.module.css";
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from "@tanstack/react-start";
import { backendFetcher } from "../integrations/fetcher";
import { Suspense } from "react";

type User = { // Matches database table columns
  id: number;
  email: string;
  last_name: string;
  first_name: string;
  preferred_name?: string;
  pronouns?: string;
  profile_picture?: string;
};

const loaderFn = createServerFn().handler(async () => { // Loader to fetch data from backend
  const fetchUsers = backendFetcher<User[]>("/users");
  const data = await fetchUsers();
  return data;
});

export const Route = createFileRoute('/profile-settings')({
  loader: async () => {
    const data = await loaderFn();
    return { data };
  },
  component: ProfileSettings,
})

export default function ProfileSettings() {
  const { data } = Route.useLoaderData() as { data: User[] };

  return (
    <div className={styles.main}>
        <div className={styles.profileSettingsHeader}>
          <h1>Profile Settings</h1>
        </div>

        <hr />

        <div className={styles.profileSettingsContent}>

          <div className={styles.profileSettingsImage}>
            <div className={styles.profileSettingsCircle}>
                <img
                src="/profile-placeholder.jpg"
                alt="Profile"
                width={200}
                height={200}
                className={styles.profileSettingsImg}
                />
            </div>
          </div>

          <div className={styles.profileSettingsInfo}>

            <p><strong>Name:</strong> Jane Doe</p>
            <p><strong>Pronouns:</strong> She/hers</p>
            <p><strong>Roles:</strong> Learner</p>
            <Button appName="profile-settings" className={styles.profileSettingsEditButton}>Edit</Button>

            
          </div>  
          
        </div>
        <Suspense fallback={<div>Loading user data...</div>}>
                  <div style={{ marginTop: "2rem" }}>
                    <h2>User Data Fetch</h2>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                  </div>
                </Suspense>
    </div>
  );
}

    
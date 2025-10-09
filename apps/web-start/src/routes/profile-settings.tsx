import { Button } from "@repo/ui/button";
import styles from "../styles/profile-settings.module.css";
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile-settings')({
  component: ProfileSettings,
})

export default function ProfileSettings() {
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
    </div>
  );
}

    
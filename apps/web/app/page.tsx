import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import Link from 'next/link';

export default function Home() {
    return (
        <div className={styles.main}>
                <h1>Courses</h1>
                <hr />

                 <Link href="/course-page">
                    <button className={styles.button}>CISC474</button>
                </Link>

                <Link href="/profile-settings">
                    <button className={styles.button}>Profile Settings</button>
                </Link>
                
        </div>
    );
}

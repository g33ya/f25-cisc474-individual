"use client";

import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import { useState } from "react";
import styles from "./page.module.css";
import Link from 'next/link';
import CoursesTab from "./(components)/CoursesTab";
import AssignmentsTab from "./(components)/AssignmentsTab";
import NotificationsTab from "./(components)/NotificationsTab";


export default function Home() {
    type Tab = "courses" | "assignments" | "notifications";
    const [activeTab, setActiveTab] = useState<Tab>("courses");

    const renderTabContent = () => {
        switch (activeTab) {
            case "courses":
                return <CoursesTab />;
            case "assignments":
                return <AssignmentsTab />;
            case "notifications":
                return <NotificationsTab />;
        }
    };

    return (
        <div className={styles.main}>
            <h1>Courses</h1>

            <main>
                <div>
                    <button onClick={() => setActiveTab("courses")}>Courses</button>
                    <button onClick={() => setActiveTab("assignments")}>Upcoming Assignments</button>
                    <button onClick={() => setActiveTab("notifications")}>Notifications</button>
                    <Link href="/profile-settings">
                        <button className={styles.button}>Profile Settings</button>
                    </Link>
                </div>

                <hr />

                <div className="border p-4 rounded">{renderTabContent()}</div>

            </main>
        </div>  
    );
}

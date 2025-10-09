"use client"

import { Link } from "@tanstack/react-router"
import styles from "../styles/site-navbar.module.css"

interface NavLink {
  to: string
  label: string
}

export default function SiteNavbar() {
  const links: NavLink[] = [
    { to: "/", label: "Courses" },
    { to: "/assignments", label: "Assignments" },
    { to: "/notifications", label: "Notifications" },
    { to: "/profile-settings", label: "Profile Settings" },
  ]

  return (
    <nav className={styles.navbar}>
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={styles["nav-link"]}
          activeProps={{ className: `${styles["nav-link"]} ${styles.active}` }}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

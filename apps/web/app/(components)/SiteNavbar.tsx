"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../page.module.css";

interface NavLink {
  href: string;
  label: string;
}

export default function Navbar(){
  const pathname = usePathname();

  const links: NavLink[] = [
    { href: "/", label: "Courses" },
    { href: "/assignments", label: "Assignments" },
    { href: "/notifications", label: "Notifications" },
    { href: "/profile-settings", label: "Profile Settings" },
  ];

  return (
    <nav className={styles.navbar}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`${styles["nav-link"]} ${pathname === link.href ? styles.active : ""}`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
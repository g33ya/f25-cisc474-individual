"use client";
// NOT YET IMPLEMENTED.
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../page.module.css";

interface NavLink {
  href: string;
  label: string;
}

export default function CourseNavbar(){
  const pathname = usePathname();

  const links: NavLink[] = [
    { href: "/", label: "Course Information" },
    { href: "/", label: "Assignments" },
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
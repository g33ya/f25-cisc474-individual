"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../page.module.css";

interface Props {
  slug: string;
}

export default function CourseNavbar({ slug }: Props) {
  const pathname = usePathname(); // current URL user is on

  const links = [
    { href: `/courses/${slug}/course-info`, label: "Course Information" },
    { href: `/courses/${slug}/assignments`, label: "Assignments" },
  ];

  return (
    <nav className={styles.coursenavbar}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`${styles["course-nav-link"]} ${pathname === link.href ? styles.active : ""}`} // style based on active page
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

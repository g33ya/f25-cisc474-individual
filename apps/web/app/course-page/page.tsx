import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "../page.module.css";
import Link from 'next/link';


export default function Home() {
    return (
        <div className={styles.main}>
                <h1>CISC474 Course Page</h1>
                <br />
                <hr />

        </div>
    );
}

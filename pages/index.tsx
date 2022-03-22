/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";


export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
     <div className={styles.links}>
        <div><Link href={`/csr`}>Client side rendering</Link></div>
        <div><Link href={`/ssr`}>Server side rendering</Link></div> 
        <div><Link href={`/ssg`}>Static site generation</Link></div> 
     </div>
            
    </div>
  );
}
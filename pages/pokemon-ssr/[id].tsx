/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Details.module.css";
import {useRouter} from 'next/router'
type Ipoke = {
  name: string,
  type:string[],
  stats: {
    name: string,
    value: number
  }[],
  image: string
}

export async function getServerSideProps(context:{params:any}){
    const resp = await fetch(
        `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${context.params.id}.json`
      );

      return {
          props:{
              pokemon: await resp.json()
          }
      }
}

export default function Details(props:{pokemon:Ipoke}) {

  const {pokemon} = props
  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type.join(", ")}</div>
          <div>
              {pokemon.stats.map(({ name, value },index) => (
                    <div className="col" key={index}>{name} - {value}</div>
              ))}
          </div>
        </div>
      </div>
      <div>
        <Link href="/ssr">
          <a>Back to Home</a>
        </Link>
      </div>
    </div>
  );
}
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Details.module.css";
import {useRouter} from 'next/router'

type poke = {
    id: number,
    name: String,
    image: String,
}

type Ipoke = {
  name: string,
  type:string[],
  stats: {
    name: string,
    value: number
  }[],
  image: string
}

export async function getStaticPaths() {
  const resp = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );
  const pokemon = await resp.json();

  return {
    paths: pokemon.map((pokemon:poke) => ({
      params: { id: pokemon.id.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context:{ params:any }) {
  const resp = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${context.params.id}.json`
  );

  return {
    props: {
      pokemon: await resp.json(),
    },
    // revalidate: 30,
  };
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
        <Link href="/ssg">
          <a>Back to Home</a>
        </Link>
      </div>
    </div>
  );
}
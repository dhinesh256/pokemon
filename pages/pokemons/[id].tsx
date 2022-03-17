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

// export async function getStaticPaths() {
//   const resp = await fetch(
//     "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
//   );
//   const pokemon = await resp.json();

//   return {
//     paths: pokemon.map((pokemon) => ({
//       params: { id: pokemon.id.toString() },
//     })),
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const resp = await fetch(
//     `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
//   );

//   return {
//     props: {
//       pokemon: await resp.json(),
//     },
//     // revalidate: 30,
//   };
// }

export default function Details() {

  const router = useRouter()

  const id = router.query.id

  const [pokemon, setpokemon] = useState<Ipoke>()

  useEffect(()=>{
    async function getPokemon() {
        const resp = await fetch(
          `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
        );
        setpokemon(await resp.json())
    }
    if(id){
      getPokemon()
    }
  },[id])


  if(!pokemon){
    return null;
  }
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
              {pokemon.stats.map(({ name, value }) => (
                <div className="row">
                    <div className="col">{name} - {value}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div>
        <Link href="/csr">
          <a>Back to Home</a>
        </Link>
      </div>
    </div>
  );
}
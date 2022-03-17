/* eslint-disable @next/next/no-img-element */
import React ,{ useState, useEffect} from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

// export async function getStaticProps() {
//   const resp = await fetch(
//     "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
//   );

//   return {
//     props: {
//       pokemon: await resp.json(),
//     },
//   };
// }
type poke = {
    id: number,
    name: String,
    image: String
  
}
export default function Home() {

  const [pokemon, setpokemon] = useState<poke[]>([])

  useEffect(()=>{
    async function getPokemon() {
        const resp = await fetch(
          "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
        );
        setpokemon(await resp.json())
    }
    getPokemon()
  },[])
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <h2>Pokemon List</h2>
      <div className={styles.grid}>
        {pokemon.map((pokemon:poke) => (
          <div className={styles.card} key={pokemon.id}>
            <Link href={`/pokemons/${pokemon.id}`}>
              <a>
                <img
                  src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                  // alt={pokemon.name}
                  style={{width:100,height:100}}
                />
                <h3>{pokemon.name}</h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
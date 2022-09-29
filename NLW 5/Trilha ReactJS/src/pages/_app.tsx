import React from "react";

import '../styles/global.scss'

import { Header } from "../components/Header/index";
import { Player } from "../components/Player/index";
import { PlayerContextProvider } from "../contexts/PlayerContext";

import styles from '../styles/app.module.scss'

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
    </PlayerContextProvider>
  )
}

export default MyApp

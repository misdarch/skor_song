import css from '../styles/Home.module.css'
import Head from "next/head"
import { useState } from "react"
import { create } from "zustand"

const useStore = create((set) => ({
    p1: {inputScore: 0, currentScore: 0},
    p2: {inputScore: 0, currentScore: 0},
    p3: {inputScore: 0, currentScore: 0},
    p4: {inputScore: 0, currentScore: 0},
    p5: {inputScore: 0, currentScore: 0},
}))
export default function Home() {
  return (
<>
    <Head>
        <link rel="manifest" href="/manifest.json" />
    </Head>
    <PlayerBoard player="p1" />
    <PlayerBoard player="p2" />
    <PlayerBoard player="p3" />
    <PlayerBoard player="p4" />
    <PlayerBoard player="p5" />
</>
  )
}

function PlayerBoard(param) {
  const player = param.player
  const inScore = useStore((state) => state[player].inputScore)
  const crScore = useStore((state) => state[player].currentScore)
  return (
<>
    <div className={css.playerBoard}>
        <input type="text" className={css.playerName}/>
        <div className={css.playerInput}>
            <input 
             type="button" 
             className={css.addScore} 
             value="–"
             onClick={() => {
                useStore.setState({
                    [player]: {
                        inputScore: inScore,
                        currentScore: parseInt(crScore) - parseInt(inScore)
                    }
                })
             }}
            />
            <input 
             type="number" 
             className={css.inputScore}
             value={inScore}
             onChange={e => {
                useStore.setState({
                    [player]: {
                        inputScore: e.target.value || 0,
                        currentScore: crScore
                    }
                })
             }}
            /> 
            <input 
             type="button" 
             className={css.addScore} 
             value="+"
             onClick={() => {
                useStore.setState({
                    [player]: {
                        inputScore: inScore,
                        currentScore: parseInt(crScore) + parseInt(inScore)
                    }
                })
             }}
            />
        </div>
        <input type="number" className={css.currentScore} value={crScore} disabled/>
    </div>
</>
  )
}
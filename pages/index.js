import css from '../styles/Home.module.css'
import { create } from "zustand"
import { useState } from "react"

const useStore = create((set) => ({
    p1: {inputScore: 0, currentScore: 0, name: "p1"},
    p2: {inputScore: 0, currentScore: 0, name: "p2"},
    p3: {inputScore: 0, currentScore: 0, name: "p3"},
    p4: {inputScore: 0, currentScore: 0, name: "p4"},
    p5: {inputScore: 0, currentScore: 0, name: "p5"},
}))
const useLogs = create((set) => ({
    p1: { name: "p1", scores: [0] },
    p2: { name: "p2", scores: [0] },
    p3: { name: "p3", scores: [0] },
    p4: { name: "p4", scores: [0] },
    p5: { name: "p5", scores: [0] },
}))

export default function Home() {
  return (
<>
    <div className={css.scoreBoard}>
        <PlayerBoard player="p1" />
        <PlayerBoard player="p2" />
        <PlayerBoard player="p3" />
        <PlayerBoard player="p4" />
        <PlayerBoard player="p5" />
    </div>
    <div className={css.logs}>
        <PlayerLog player="p1" />
        <PlayerLog player="p2" />
        <PlayerLog player="p3" />
        <PlayerLog player="p4" />
        <PlayerLog player="p5" />
    </div>
</>
  )
}

function PlayerLog(param) {
    const player = param.player
    const crName = useStore((state) => state[player].name)
    const crPScores = useLogs((state) => state[player].scores)
    return (
<div className={css.playerLog}>
    <h4><u>{crName || player}</u></h4>
    { crPScores.map(el => <p key="gibberish">{el}</p>) }
</div>
    )
}

function PlayerBoard(param) {
  const player = param.player
  const inScore = useStore((state) => state[player].inputScore)
  const crScore = useStore((state) => state[player].currentScore)
  const [inName, setInName] = useState("")
  const crName = useStore((state) => state[player].name)
  const crPScores = useLogs((state) => state[player].scores)
  return (
<>
    <div className={css.playerBoard}>
        <input 
         type="text" 
         className={css.playerName}
         placeholder={player}
         value={inName}
         onChange={e => setInName(e.target.value)}
         onKeyPress={() => {
             useStore.setState({
                 [player]: {
                     ...useStore.getState()[player],
                     name: inName || ""
                 }
             })
             
             useLogs.setState({
                 [player]: {
                     name: inName,
                     scores: crPScores
                 }
             })
         }}
        />
        <div className={css.playerInput}>
            <input 
             type="button" 
             className={css.addScore} 
             value="–"
             onClick={() => {
                useStore.setState({
                    [player]: {
                        ...useStore.getState()[player],
                        currentScore: parseInt(crScore) - parseInt(inScore)
                    }
                })
                let dollSet = []
                dollSet.push(parseInt(crScore) - parseInt(inScore))
                useLogs.setState({
                    [player]: {
                        name: crName,
                        scores: [...crPScores, ...dollSet]
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
                        currentScore: crScore,
                        name: crName
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
                        ...useStore.getState()[player],
                        currentScore: parseInt(crScore) + parseInt(inScore)
                    }
                })
                let dollSet = []
                dollSet.push(parseInt(inScore) + parseInt(crScore))
                useLogs.setState({
                    [player]: {
                        name: crName,
                        scores: [...crPScores, ...dollSet]
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
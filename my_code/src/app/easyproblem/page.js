"use client"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import axios from "axios"
export default function Knonledge() {
    const params = useSearchParams();
    const currentRef = useRef(null)
    const router = useRouter()
    const [restartdone, setrestartdone] = useState(false)
    const [quizData, setQuizdata] = useState([])
    const [bordercolor, setBordercolor] = useState(null)
    const [knowledgeId, setKnowledgeId] = useState(0)
    const [correctAnswer, setCorrectAnswer] = useState()
    const [allpoint, setAllpoint] = useState(0)
    const [yourpoint, setYourpoint] = useState(0)
    const [index, setIndex] = useState()
    const fetchalldata = async () => {
        const url = "http://localhost:3002/quiz"
        const fetchdata = await fetch(url).then((data) => data.json());
        //shuffle
        let currentIndex = fetchdata.quizData.length, randomIndex;
        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [fetchdata.quizData[currentIndex], fetchdata.quizData[randomIndex]] = [
                fetchdata.quizData[randomIndex], fetchdata.quizData[currentIndex]];
        }
        setQuizdata(fetchdata.quizData)
        console.log("users", fetchdata)
    }
    const restart = () => {
        setrestartdone(!restartdone)
    }
    const backtohome = () => {
        router.push(`/home?id=${userId}`)
    }
    function back(ref) {
        if (ref.current && !ref.current.contains(event.target)) {
            setrestartdone(false)
        }
    }
    const clickme = (index) => {
        setBordercolor(bordercolor === index ? null : index)
        setCorrectAnswer(index)
    }
    const nextproblem = () => {
        if (quizData[knowledgeId]?.correctAnswer == correctAnswer) {

            setYourpoint(yourpoint + 1)
            setKnowledgeId(knowledgeId + 1)
        } else {

            setKnowledgeId(knowledgeId + 1)
        }
        setAllpoint(allpoint + 1)
        index == 1
        setBordercolor(11)
    }
    useEffect(() => {
        fetchalldata();
    }, [])
    return (
        <div onClick={() => back(currentRef)} className="h-screen w-screen bg-gradient-to-r from-blue-600 to-blue-600">
            <div className="flex flex-row-reverse  px-5">
                {restartdone ? (<div ref={currentRef} onClickœ className="absolute bg-gradient-to-r from-green-500 text-2xl rounded-xl px-5 py-5">
                    <h1 onClick={() => backtohome()}> -Буцах</h1>
                    <h1>-Дахин эхлэх</h1>
                </div>) : (<button className="absolute px-3 py-1 rounded-2xl bg-gradient-to-r from-green-500 to-yellow-500" >
                    <Image src="bars.svg" height={16} width={16} onClick={() => restart()} />
                </button>)}
            </div>
            <div className="w-full flex justify-center">
                <h1 className="text-3xl">Оноо:{yourpoint}/{allpoint}</h1>
            </div>
            <div className="h-4/6 w-full flex justify-center items-center" >
                <div className="h-5/6 w-4/6 bg-white rounded-3xl bg-gradient-to-r from-blue-500 to-blue-400">
                    <div className="text-[40px] w-full flex justify-center">Бодлого?</div>
                    {
                        // quizData.map((e) => (
                        <div className="text-3xl flex justify-center px-3">
                            {quizData[knowledgeId]?.question}
                        </div>
                        // ))
                    }
                </div>
            </div>
            <div className="h-2/6 w-full">
                <div className="h-2/6 flex justify-around text-2xl">
                    <div onClick={() => clickme(0)} className={`w-2/5 h-2/6 ${bordercolor === 0 ? 'border-[red]' : 'border-black'}  border-[3px] bg-white rounded-3xl px-4 flex items-center`}>A.{quizData[knowledgeId]?.a_answer}</div>
                    <div onClick={() => clickme(1)} className={`w-2/5 h-2/6 ${bordercolor === 1 ? 'border-[red]' : 'border-black'}  border-[3px] bg-white rounded-3xl px-4 flex items-center`}>B.{quizData[knowledgeId]?.b_answer}</div>
                </div>
                <div className="h-2/6 flex justify-around text-2xl">
                    <div onClick={() => clickme(2)} className={`w-2/5 h-2/6 ${bordercolor === 2 ? 'border-[red]' : 'border-black'}  border-[3px] bg-white rounded-3xl px-4 flex items-center`}>C.{quizData[knowledgeId]?.c_answer}</div>
                    <div onClick={() => clickme(3)} className={`w-2/5 h-2/6 ${bordercolor === 3 ? 'border-[red]' : 'border-black'}  border-[3px] bg-white rounded-3xl px-4 flex items-center`}>D.{quizData[knowledgeId]?.d_answer}</div>
                </div>
                <div className="h-2/6 flex justify-center ">
                    <button onClick={() => nextproblem()} className="flex items-center  bg-gradient-to-r from-green-500 to-yellow-500 px-5 text-2xl rounded-3xl h-2/6">Дараах
                        <Image className="mt-1 ml-2" src="arrow.svg" height={16} width={16} /></button>
                </div>
            </div>
        </div>
    )
}
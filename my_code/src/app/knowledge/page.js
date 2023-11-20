"use client"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
export default function Knonledge() {
    const currentRef = useRef(null)
    const router = useRouter()
    const [restartdone, setrestartdone] = useState(false)
    const [quizData, setQuizdata] = useState([])
    const [bordercolor, setBordercolor] = useState(null)

    const fetchalldata = async () => {
        const url = "http://localhost:8080/quiz"
        const fetchdata = await fetch(url).then((data) => data.json());
        setQuizdata(fetchdata.quizData)
        console.log("users", fetchdata)
    }
    const restart = () => {
        setrestartdone(!restartdone)
    }
    const backtohome = () => {
        router.push("/home")
    }
    function back(ref) {
        if (ref.current && !ref.current.contains(event.target)) {
            setrestartdone(false)
        }

    }
    const clickme = (index) => {
        setBordercolor(bordercolor === index ? null : index)
    }
    useEffect(() => {
        fetchalldata();
    }, [])
    return (
        <div onClick={() => back(currentRef)} className="h-screen w-screen bg-gradient-to-r from-violet-500 to-fuchsia-500">
            <div className="flex flex-row-reverse  px-5">
                {restartdone ? (<div ref={currentRef} onClickœ className="absolute bg-gradient-to-r from-green-500 text-2xl rounded-xl px-5 py-5">
                    <h1 onClick={() => backtohome()}> -Буцах</h1>
                    <h1>-Дахин эхлэх</h1>
                </div>) : (<button className="absolute px-3 py-1 rounded-2xl bg-gradient-to-r from-green-500 to-yellow-500" >
                    <Image src="bars.svg" height={16} width={16} onClick={() => restart()} />
                </button>)}
            </div>
            <div className="h-4/6 w-full flex justify-center items-center" >
                <div className="h-5/6 w-4/6 bg-white rounded-3xl bg-gradient-to-r from-green-500 to-yellow-500">
                    <div className="text-[40px] w-full flex justify-center">Асуулт?</div>
                    {
                        // quizData.map((e) => (
                        <div className="text-3xl flex justify-center px-3">
                            {quizData[3]?.question}
                        </div>
                        // ))
                    }
                </div>
            </div>
            <div className="h-2/6 w-full">
                <div className="h-2/6 flex justify-around text-2xl">
                    <div onClick={() => clickme(0)} className={`w-2/5 h-2/6 ${bordercolor === 0 ? 'border-[blue]' : 'border-black'}  border-[3px] bg-white rounded-3xl px-4 flex items-center`}>A.{quizData[3]?.a_answer}</div>
                    <div onClick={() => clickme(1)} className={`w-2/5 h-2/6 ${bordercolor === 1 ? 'border-[blue]' : 'border-black'}  border-[3px] bg-white rounded-3xl px-4 flex items-center`}>B.{quizData[3]?.b_answer}</div>
                </div>
                <div className="h-2/6 flex justify-around text-2xl">
                    <div onClick={() => clickme(2)} className={`w-2/5 h-2/6 ${bordercolor === 2 ? 'border-[blue]' : 'border-black'}  border-[3px] bg-white rounded-3xl px-4 flex items-center`}>C.{quizData[3]?.c_answer}</div>
                    <div onClick={() => clickme(3)} className={`w-2/5 h-2/6 ${bordercolor === 3 ? 'border-[blue]' : 'border-black'}  border-[3px] bg-white rounded-3xl px-4 flex items-center`}>D.{quizData[3]?.d_answer}</div>
                </div>
                <div className="h-2/6 flex justify-center ">
                    <button className="flex items-center  bg-gradient-to-r from-green-500 to-yellow-500 px-5 text-2xl rounded-3xl h-2/6">Дараах
                        <Image className="mt-1 ml-2" src="arrow.svg" height={16} width={16} /></button>
                </div>
            </div>
        </div>
    )
}
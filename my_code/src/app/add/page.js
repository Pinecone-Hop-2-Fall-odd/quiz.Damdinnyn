"use client"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import axios from "axios"
export default function Home() {
    const [questionvalue, setQuestionvalue] = useState("")
    const [a_answer, setA_answer] = useState("")
    const [b_answer, setB_answer] = useState("")
    const [c_answer, setC_answer] = useState("")
    const [d_answer, setD_answer] = useState("")
    const router = useRouter()
    const [restartdone, setrestartdone] = useState(false)
    const currentRef = useRef(null)
    const finished = async () => {
        await axios.post("http://localhost:8080/quiz", {
            question: questionvalue,
            a_answer: a_answer,
            b_answer: b_answer,
            c_answer: c_answer,
            d_answer: d_answer
        })
        setQuestionvalue("")
        setA_answer("")
        setB_answer("")
        setC_answer("")
        setD_answer("")
    }
    const restart = () => {
        setrestartdone(!restartdone)
    }
    const backtohome = () => {
        router.push("/home")
    }
    const startAgain = () => {
        router.push("/add")
    }
    function back(ref) {
        if (ref.current && !ref.current.contains(event.target)) {
            setrestartdone(false)
        }

    }

    useEffect(() => {
        //fetchalldata()
    }, [])
    return (
        <div onClick={() => back(currentRef)} className="bg-gradient-to-r from-cyan-500 to-blue-500 w-screen h-screen">
            <div className="text-[90px] flex justify-center h-1/6"> Quiz +</div>
            {restartdone ? (<div ref={currentRef} onClickœ className="absolute bg-gradient-to-r from-green-500 text-2xl rounded-xl px-5 py-5 mt-[-170px] ml-3">
                <h1 onClick={() => backtohome()}> -Буцах</h1>
                <h1 onClick={() => startAgain()}>-Дахин эхлэх</h1>
            </div>) : (<button className="absolute px-3 py-1 rounded-2xl bg-gradient-to-r from-green-500 to-yellow-500 mt-[-170px] ml-3" >
                <Image src="bars.svg" height={16} width={16} onClick={() => restart()} />
            </button>)}
            <div className="h-3/6 w-full flex justify-center items-center" >
                <div className="h-5/6 w-4/6 rounded-3xl bg-gradient-to-r from-green-500 to-yellow-0 flex flex-col ">
                    <div className="text-[40px] w-full flex justify-center">Таны асуулт?</div>
                    <input onChange={(e) => setQuestionvalue(e.target.value)} value={questionvalue} className="border-black border-[3px] text-2xl rounded-2xl flex flex-wrap" />
                </div>

            </div>
            {/* <div className="absolute w-full   bg-gradient-to-r from-green-500 to-yellow-500"></div> */}
            <div className="h-2/6 w-full">
                <div className="h-2/6 flex justify-around text-2xl">
                    <div className="w-2/5 h-2/6 px-4 flex items-center ">A.
                        <input onChange={(e) => setA_answer(e.target.value)} value={a_answer} className="rounded-xl border-black border-2 w-full px-2" />
                    </div>
                    <div className="w-2/5 h-2/6 px-4 flex items-center">B.
                        <input onChange={(e) => setB_answer(e.target.value)} value={b_answer} className="rounded-xl border-black border-2 w-full px-2" />
                    </div>
                </div>
                <div className="h-2/6 flex justify-around text-2xl">
                    <div className=" w-2/5 h-2/6  px-4 flex items-center">C.
                        <input onChange={(e) => setC_answer(e.target.value)} value={c_answer} className="rounded-xl border-black border-2 w-full px-2" />
                    </div>
                    <div className="w-2/5  h-2/6  px-4 flex items-center">D.
                        <input onChange={(e) => setD_answer(e.target.value)} value={d_answer} className="rounded-xl border-black border-2 w-full px-2" />
                    </div>
                </div>

                <div className="h-2/6 flex justify-center ">
                    <button onClick={() => finished()} className="flex items-center  bg-gradient-to-r from-green-500 to-yellow-500 px-5 text-2xl rounded-3xl h-2/6">Дууссан
                    </button>
                </div>
            </div>


        </div>
    )
}
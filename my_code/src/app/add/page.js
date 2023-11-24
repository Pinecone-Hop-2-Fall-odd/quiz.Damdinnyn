"use client"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import axios from "axios"
export default function Home() {
    const params = useSearchParams();
    const userId = params.get('id')
    const [questionvalue, setQuestionvalue] = useState("")
    const [a_answer, setA_answer] = useState("")
    const [b_answer, setB_answer] = useState("")
    const [c_answer, setC_answer] = useState("")
    const [d_answer, setD_answer] = useState("")
    const router = useRouter()
    const [restartdone, setrestartdone] = useState(false)
    const [bordercolor, setBordercolor] = useState("")
    const [correctAnswer, setCorrectAnswer] = useState()
    console.log(bordercolor)
    const currentRef = useRef(null)
    const finished = async () => {
        await axios.post("http://localhost:8080/quiz", {
            question: questionvalue,
            a_answer: a_answer,
            b_answer: b_answer,
            c_answer: c_answer,
            d_answer: d_answer,
            correctAnswer: correctAnswer,
            whoIsDone: userId,
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
    const clickme = (index) => {
        setBordercolor(bordercolor === index ? null : index)
        console.log("sss", index)
        setCorrectAnswer(index)
        console.log(userId)
    }
    useEffect(() => {
        //fetchalldata()
    }, [])
    return (
        <div onClick={() => back(currentRef)} className="bg-gradient-to-r from-blue-500 to-green-500 w-screen h-screen">
            <div className="text-[90px] flex justify-center h-1/6"> Quiz +</div>
            {restartdone ? (<div ref={currentRef} onClickœ className="absolute bg-gradient-to-r from-green-500 text-2xl rounded-xl px-5 py-5 mt-[-170px] ml-3">
                <h1 onClick={() => backtohome()}> -Буцах</h1>
                <h1 onClick={() => startAgain()}>-Дахин эхлэх</h1>
            </div>) : (<button className="absolute px-3 py-1 rounded-2xl bg-gradient-to-r from-green-500 to-yellow-500 mt-[-170px] ml-3" >
                <Image src="bars.svg" height={16} width={16} onClick={() => restart()} />
            </button>)}
            <div className="h-3/6 w-full flex justify-center items-center" >
                <div className="h-5/6 w-4/6 rounded-3xl bg-gradient-to-r from-green-500 to-blue-500 flex flex-col ">
                    <div className="text-[40px] w-full flex justify-center">Таны оруулах бодлого?</div>
                    <input onChange={(e) => setQuestionvalue(e.target.value)} value={questionvalue} className="border-black border-[3px] text-2xl rounded-2xl flex flex-wrap" />
                </div>

            </div>
            {/* <div className="absolute w-full   bg-gradient-to-r from-green-500 to-yellow-500"></div> */}
            <div className="h-2/6 w-full">
                <div className="h-2/6 flex justify-around text-2xl">
                    <div className="w-2/5 h-2/6 px-4 flex items-center "> <h1 onClick={() => clickme(0)}>A.</h1>
                        <input onChange={(e) => setA_answer(e.target.value)} value={a_answer} className={`${bordercolor === 0 ? 'border-[red]' : 'border-black'} rounded-xl border-[4px] w-full px-2`} />
                    </div>
                    <div className="w-2/5 h-2/6 px-4 flex items-center"><h1 onClick={() => clickme(1)}>B.</h1>
                        <input onChange={(e) => setB_answer(e.target.value)} value={b_answer} className={`${bordercolor === 1 ? 'border-[red]' : 'border-black'} rounded-xl  border-[4px] w-full px-2`} />
                    </div>
                </div>
                <div className="h-2/6 flex justify-around text-2xl">
                    <div className=" w-2/5 h-2/6  px-4 flex items-center"><h1 onClick={() => clickme(2)}>C.</h1>
                        <input onChange={(e) => setC_answer(e.target.value)} value={c_answer} className={`${bordercolor === 2 ? 'border-[red]' : 'border-black'} rounded-xl border-[4px] w-full px-2`} />
                    </div>
                    <div className="w-2/5  h-2/6  px-4 flex items-center"><h1 onClick={() => clickme(3)}>D.</h1>
                        <input onChange={(e) => setD_answer(e.target.value)} value={d_answer} className={`${bordercolor === 3 ? 'border-[red]' : 'border-black'} rounded-xl  border-[4px] w-full px-2`} />
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
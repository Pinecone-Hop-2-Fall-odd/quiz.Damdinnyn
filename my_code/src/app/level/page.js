"use client"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react";
import { useRef } from "react";
import Image from "next/image";
import axios from "axios";
// color codes
// red green blue
// hex, rgb
// rgb(255, 255, 255)
// rgba(255, 255, 255, 0.6)
// #ffffff
export default function Home() {
    const currentRef = useRef(null)
    const router = useRouter();
    const params = useSearchParams();
    const [restartdone, setrestartdone] = useState(false)
    const [passedLevels, setPassedLevels] = useState([])
    const userId = params.get("id");

    const fetchUserData = async () => {
        const res = await axios.get(`http://localhost:3002/userdata/${userId}`)

        setPassedLevels(res.data.data)
    }
    console.log(passedLevels)


    const playRank = (id) => {
        if (passedLevels.includes(id)) {
            console.log(id)
            router.push(`hardproblem?id=${userId}&quizId=${id}`)
            console.log("sss")
        }
    }
    const restart = () => {
        setrestartdone(!restartdone)
        console.log("sss")
    }
    const backtohome = () => {
        router.push(`/home?id=${userId}`)
    }
    const back = (ref) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setrestartdone(false)
        }
    }
    const levelArray = [{ level: "1", id: "1" }, { level: "2", id: "2" }, { level: "3", id: "3" }, { level: "4", id: "4" }, { level: "5", id: "5" }, { level: "6", id: "6" }, { level: "7", id: "7" }, { level: "8", id: "8" }, { level: "9", id: "9" }, { level: "10", id: "10" }, { level: "11", id: "11" }, { level: "12", id: "12" }, { level: "13", id: "13" }, { level: "14", id: "14" }, { level: "15", id: "15" }]

    const checkIsPassed = (checkingLevel) => {
        return passedLevels.includes(checkingLevel)
    }
    useEffect(() => {
        fetchUserData()
    }, [])
    return (
        <div onClick={() => back(currentRef)} className="h-screen w-screen bg-gradient-to-r from-blue-600 to-blue-600 flex flex-col justify-center items-center">
            <div className="flex flex-row-reverse  px-5 w-full absolute top-0 h-6 mt-4">
                {restartdone ? (<div ref={currentRef} onClickœ className="absolute bg-gradient-to-r from-green-500 text-2xl rounded-xl px-5 py-5">
                    <h1 onClick={() => backtohome()}> -Буцах</h1>
                    <h1>-Дахин эхлэх</h1>
                </div>) : (<button className="absolute px-3 py-1 rounded-2xl bg-gradient-to-r from-green-500 to-yellow-500" >
                    <Image src="bars.svg" height={16} width={16} onClick={() => restart()} />
                </button>)}
            </div>

            <div className="w-4/6 h-5/6 flex gap-20 justify-center items-center flex-wrap bg-black rounded-xl snap-y">
                {levelArray.map((e) => (
                    <div onClick={() => playRank(e.id)} className="border-8 border-[#0953F7] bg-white h-[10%] w-1/5 flex justify-center items-center text-[60px] rounded-2xl text-[#D9a9a4]" >
                        {!checkIsPassed(e.level) && <div className="absolute">
                            <Image src="lock.svg" height={64} width={16} />
                        </div>}
                        {e.level}
                    </div>))}
            </div>
        </div>
    )
}
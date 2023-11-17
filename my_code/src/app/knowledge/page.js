"use client"
import Image from "next/image"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
export default function Knonledge() {
    const currentRef = useRef(null)
    const router = useRouter()
    const [restartdone, setrestartdone] = useState(false)
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
                <div className="h-5/6 w-4/6 bg-white rounded-3xl">
                    <div className="text-[40px] w-full flex justify-center">Асуулт?</div>
                </div>
            </div>
            <div className="h-2/6 w-full">
                <div className="h-2/6 flex justify-around">
                    <div className="w-2/5 h-2/6 bg-white rounded-3xl px-4 flex items-center">A.</div>
                    <div className="w-2/5 h-2/6 bg-white rounded-3xl px-4 flex items-center">B.</div>
                </div>
                <div className="h-2/6 flex justify-around">
                    <div className="rounded-3xl w-2/5 h-2/6 bg-white px-4 flex items-center">C.</div>
                    <div className="w-2/5 rounded-3xl h-2/6 bg-white px-4 flex items-center">D.</div>
                </div>
                <div className="h-2/6 flex justify-center ">
                    <button className="flex items-center  bg-gradient-to-r from-green-500 to-yellow-500 px-5 text-2xl rounded-3xl h-2/6">Дараах
                        <Image className="mt-1 ml-2" src="arrow.svg" height={16} width={16} /></button>
                </div>
            </div>
        </div>
    )
}
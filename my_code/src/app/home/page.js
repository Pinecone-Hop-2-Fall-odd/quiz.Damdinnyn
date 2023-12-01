"use client"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useState, useRef } from "react"
export default function Home() {
    const currentRef = useRef(null)
    const params = useSearchParams();
    const userId = params.get("id")
    const router = useRouter();
    const [playstatus, setPlaystatus] = useState(false)
    const [friendsstatus, setFriendsstatus] = useState(false)
    const easyProblem = () => {
        router.push(`/easyproblem?id=${userId}`)
    }
    const hardProblem = () => {
        router.push(`level?id=${userId}`)
    }
    const jumpLogo = () => {
        router.push("/logo")
    }
    const addFile = () => {
        router.push(`/add?id=${userId}`)
    }
    const jumptoPersonAccound = () => {
        router.push(`/user?id=${userId}`)
    }
    const playStatus = () => {
        setPlaystatus(true)
    }
    const friendsstatusdone = () => {
        setFriendsstatus(!friendsstatus)
    }
    function back(ref) {
        if (ref.current && !ref.current.contains(event.target)) {
            setFriendsstatus(false)
        }

    }
    return (
        <div onClick={() => back(currentRef)}>
            <div className="absolute flex w-full flex-row-reverse px-5 py-4">
                <div>
                    <Image onClick={() => jumptoPersonAccound()} src="user.svg" height={32} width={32} />
                </div>
            </div>
            <div className={`absolute w-3/6 ${friendsstatus ? `h-full` : "h-2/5"}  px-4 py-6`}>
                {
                    friendsstatus ? (<div ref={currentRef} className=" w-full h-full bg-white rounded-xl" >
                        <div className="w-full h-[10%] bg-[#DAD9D9] rounded-t-xl flex px-1  items-center">
                            <Image src="friends.svg" height={40} width={40} />
                            <input className="w-4/6 " />
                        </div>
                        <div></div>
                    </div>) : (<div onClick={() => friendsstatusdone()}
                        className="h-2/5 w-4/6 bg-white rounded-xl">

                    </div>)
                }
            </div>

            <div className={`flex gap-20 ${friendsstatus ? 'flex-row-reverse' : 'justify-center'} px-10 items-center  bg-gradient-to-r from-blue-600 to-blue-600 w-screen h-screen`}>
                <div className="rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 h-3/6 w-2/5">
                    <div className="absolute flex flex-row-reverse ">
                        <button onClick={() => addFile()} className="py-1 px-3 rounded-xl bg-gradient-to-r from-green-500 toblue-500 text-2xl">+ Quiz нэмэх</button>
                    </div>
                    <div className="h-5/6 flex items-center justify-center">
                        <div className="text-white text-[56px] origin-bottom rotate-45 ">Бодлого</div>
                    </div>
                    <div onClick={() => playStatus()} className="h-1/6 text-white bg-gradient-to-r from-blue-500 to-blue-400 rounded-b-3xl text-[50px] flex justify-center items-center"> Тоглох</div>
                </div>
                {
                    playstatus ? (<div className="absolute w-4/6 h-96 bg-gradient-to-r from-green-500 flex  items-center gap-20  justify-center rounded-3xl">
                        <button onClick={() => easyProblem()} className="bg-gradient-to-r from-blue-600 to-blue-600 h-12 text-3xl px-5 rounded-2xl">
                            Classic
                        </button>
                        <button onClick={() => hardProblem()} className="bg-gradient-to-r from-blue-600 to-blue-600 h-12 text-3xl px-5 rounded-2xl" >Rank</button>
                    </div>) : (
                        <div></div>
                    )
                }

            </div>
        </div>)
}
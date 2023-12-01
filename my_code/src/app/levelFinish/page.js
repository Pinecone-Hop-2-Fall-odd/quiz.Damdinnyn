"use client"
import { useRouter, useSearchParams } from "next/navigation"
export default function Home() {
    const router = useRouter()
    const params = useSearchParams();
    const userId = params.get("id")
    const quizId = params.get("quizId")
    const back = () => {
        router.push(`./level?id=${userId}`)
    }
    const replay = () => {
        router.push(`hardproblem?id=${userId}&quizId=${quizId}`)
    }
    return (
        <div className="h-screen w-screen bg-gradient-to-r from-blue-600 to-blue-600 flex justify-center items-center">
            <div className="bg-white h-4/6 w-4/6 border-[10px] border-black rounded-3xl">
                <div className="h-4/6">

                </div>
                <div className="h-2/6 flex gap-10 justify-center items-center">
                    <div onClick={() => back()} className="bg-gradient-to-r from-green-500 to-yellow-500 text-2xl px-3 py-1 rounded-2xl border-4 border-black">Буцах</div>
                    <div onClick={() => replay()} className="bg-gradient-to-r from-green-500 to-yellow-500 text-2xl px-3 py-1 rounded-2xl border-4 border-black">Дахин тоглох</div>
                </div>
            </div>
        </div>
    )
}
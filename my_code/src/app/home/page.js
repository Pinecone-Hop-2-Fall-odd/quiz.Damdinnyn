"use client"
import { useRouter } from "next/navigation"
export default function Home() {
    const router = useRouter()
    const jumpKnowledge = () => {
        router.push("/knowledge")
    }
    const jumpLogo = () => {
        router.push("/logo")
    }
    const addFile = () => {
        router.push("/add")
    }
    return (<div className="flex gap-20 justify-center items-center  bg-gradient-to-r from-violet-500 to-fuchsia-500 w-screen h-screen">
        <div className="rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 h-3/6 w-2/6">
            <div className="absolute flex flex-row-reverse ">
                <button className="px-3 py-1 rounded-xl bg-gradient-to-r from-green-500 toblue-500 text-2xl">+ Quiz нэмэх</button>
            </div>
            <div className="h-5/6 flex items-center justify-center">
                <div className="text-white text-[56px] origin-bottom rotate-45 ">Лого</div>
            </div>
            <div onClick={() => jumpLogo()} className="h-1/6 text-white bg-gradient-to-r from-orange-500 to-green-500 text-[50px] rounded-b-3xl flex justify-center items-center"> Тоглох</div>

        </div>
        <div className="rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 h-3/6 w-2/6">
            <div className="absolute flex flex-row-reverse ">
                <button onClick={() => addFile()} className="py-1 px-3 rounded-xl bg-gradient-to-r from-green-500 toblue-500 text-2xl">+ Quiz нэмэх</button>
            </div>
            <div className="h-5/6 flex items-center justify-center">
                <div className="text-white text-[56px] origin-bottom rotate-45 ">Танин мэдэхүй</div>
            </div>
            <div onClick={() => jumpKnowledge()} className="h-1/6 text-white bg-gradient-to-r from-green-500 to-orange-500 rounded-b-3xl text-[50px] flex justify-center items-center"> Тоглох</div>
        </div>
    </div>)
}
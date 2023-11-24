"use client"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
export default function Home() {
    const params = useSearchParams();
    const userId = params.get("id")
    const router = useRouter();
    const jumpKnowledge = () => {
        router.push(`/knowledge?id=${userId}`)
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
    return (
        <div>
            <div className="absolute flex w-full flex-row-reverse px-5 py-4">
                <div>
                    <Image onClick={() => jumptoPersonAccound()} src="user.svg" height={32} width={32} />
                </div>
            </div>
            <div className="flex gap-20 justify-center items-center  bg-gradient-to-r from-blue-600 to-blue-600 w-screen h-screen">

                <div className="rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 h-3/6 w-2/6">
                    <div className="absolute flex flex-row-reverse ">
                        <button className="px-3 py-1 rounded-xl bg-gradient-to-r from-green-500 toblue-500 text-2xl">+ Quiz нэмэх</button>
                    </div>
                    <div className="h-5/6 flex items-center justify-center">
                        <div className="text-white text-[56px] origin-bottom rotate-45 ">Танин мэдэхүй</div>
                    </div>
                    <div onClick={() => jumpLogo()} className="h-1/6 text-white bg-gradient-to-r from-blue-500 to-blue-400 text-[50px] rounded-b-3xl flex justify-center items-center"> Тоглох</div>

                </div>
                <div className="rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 h-3/6 w-2/6">
                    <div className="absolute flex flex-row-reverse ">
                        <button onClick={() => addFile()} className="py-1 px-3 rounded-xl bg-gradient-to-r from-green-500 toblue-500 text-2xl">+ Quiz нэмэх</button>
                    </div>
                    <div className="h-5/6 flex items-center justify-center">
                        <div className="text-white text-[56px] origin-bottom rotate-45 ">Бодлого</div>
                    </div>
                    <div onClick={() => jumpKnowledge()} className="h-1/6 text-white bg-gradient-to-r from-blue-500 to-blue-400 rounded-b-3xl text-[50px] flex justify-center items-center"> Тоглох</div>
                </div>
            </div>
        </div>)
}
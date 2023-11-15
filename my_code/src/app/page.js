"use client"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const login = () => {
    router.push("/home")
  }
  return (
    <div
      className="w-screen h-screen bg-gradient-to-r from-purple-500 to-pink-500 
      flex justify-center items-center
      ">

      <div className="bg-white w-2/6 py-4 rounded-[30px] flex flex-col items-center justify-center gap-6 px-4  ">
        <input className="bg-white text-white border-black border-[3px] rounded-3xl w-full  h-10" />
        <input className="bg-white text-white border-black border-[3px]  rounded-3xl w-full h-10" />
        <button onClick={() => login()} className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl px-5 text-xl ">log in</button>
      </div>
    </div>

  )
}
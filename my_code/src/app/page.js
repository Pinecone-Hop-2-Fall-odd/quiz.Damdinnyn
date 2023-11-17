"use client"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function Home() {
  const [namevalue, setNamevalue] = useState("")
  const [users, setUsers] = useState([])
  const router = useRouter()
  const login = () => {
    router.push("/home")
  }
  const createNewAccound = () => {
    router.push("/newacc")
  }
  const fetchalldata = async () => {
    const url = "http://localhost:8080/users"
    const fetchdata = await fetch(url).then((fetch) => fetch.json());
    setUsers(fetchdata.data)
    console.log("users", users)
  }

  useEffect(() => {
    fetchalldata();
  }, [])
  return (
    <div
      className="w-screen h-screen bg-gradient-to-r from-purple-500 to-pink-500 
      flex justify-center items-center
      ">

      <div className="bg-white w-2/6 py-4 rounded-[30px] flex flex-col items-center justify-center gap-6 px-4  ">
        <input className="bg-white text-white border-black border-[3px] rounded-3xl w-full  h-10" />
        <input className="bg-white text-white border-black border-[3px]  rounded-3xl w-full h-10" />
        <button onClick={() => login()} className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl px-5 text-xl ">Нэвтрэх</button>
        <button onClick={() => createNewAccound()} className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl px-5 text-xl ">Шинэ акк үүсгэх </button>
      </div>
    </div>

  )
}
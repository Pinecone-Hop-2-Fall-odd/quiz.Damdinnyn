"use client"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Home() {
  const [namevalue, setNamevalue] = useState("")
  const [passwordvalue, setPasswordvalue] = useState("")
  const [users, setUsers] = useState([])
  const router = useRouter()
  const [userId, setUserId] = useState()

  const createNewAccound = () => {
    router.push("/newacc")
  }
  const fetchalldata = async () => {
    const url = "http://localhost:8080/users"
    const fetchdata = await fetch(url).then((fetch) => fetch.json());
    setUsers(fetchdata.userData)
    console.log("users", users)
  }
  const login = async () => {
    await axios.post("http://localhost:8080/password", {
      username: namevalue,
      password: passwordvalue
    }).then((res) => router.push(`/home?id=${res?.data?.userData?._id}`))
      .catch((error) => alert(error))

  }
  useEffect(() => {
    fetchalldata();
  }, [])
  return (
    <div
      className="w-screen h-screen bg-gradient-to-r from-blue-600 to-blue-600 
      flex justify-center items-center
      ">

      <div className="bg-white w-2/6 py-4 rounded-[30px] flex flex-col items-center justify-center gap-6 px-4  ">
        <input placeholder="Name" onChange={(e) => setNamevalue(e.target.value)} value={namevalue} className="bg-white text-black border-black border-[3px] rounded-3xl w-full  h-10 px-3 text-2xl" />
        <input placeholder="Password" type="password" onChange={(e) => setPasswordvalue(e.target.value)} value={passwordvalue} className=" bg-white text-black border-black border-[3px] px-3 text-2xl  rounded-3xl w-full h-10 " />
        <button onClick={() => login()} className="bg-gradient-to-r from-blue-500 to-green-500 rounded-3xl px-5 text-xl ">Нэвтрэх</button>
        <button onClick={() => createNewAccound()} className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl px-5 text-xl ">Шинэ акк үүсгэх </button>
      </div>
    </div>

  )
}
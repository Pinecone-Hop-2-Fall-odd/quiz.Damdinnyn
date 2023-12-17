"use client"
import { useState, useEffect } from "react"
import axios, { isCancel, AxiosError } from 'axios';
export default function Home() {
    const [namevalue, setNamevalue] = useState("")
    const [agevalue, setAgevalue] = useState("")
    const [phonenumbervalue, setPhonenumbervalue] = useState("")
    const [passwordvalue, setPasswordvalue] = useState("")
    const [users, setUsers] = useState([])
    // async function fetchalldata() {
    //     const url = "http://localhost:3002/users"
    //     const fetchdata = await fetch(url).then((fetch) => fetch.json());
    //     setUsers(fetchdata.data)
    //     console.log("users", users)
    // }
    const login = async () => {
        await axios.post("http://localhost:3002/addUser", {
            username: namevalue,
            age: agevalue,
            phoneNumber: phonenumbervalue,
            password: passwordvalue
        }).then((res) => {
            setUsers(res.data)
        }).catch(function (error) {
            console.log(error)
        })
        setAgevalue("")
        setNamevalue("")
        setPasswordvalue("")
        setPhonenumbervalue("")
    }
    useEffect(() => {
        //fetchalldata();
    }, [])
    return (
        <div className="bg-gradient-to-r from-blue-600 to-blue-600 w-screen h-screen flex justify-center items-center ">
            <div className="bg-white w-2/5 h-2/5 border-black border-[3px] rounded-2xl text-2xl flex flex-col max-w-[300px] justify-center items-center py-4 gap-6">
                <input onChange={(e) => setNamevalue(e.target.value)} value={namevalue} className="border-black border-2 w-4/6 h-10 rounded-3xl  px-3" placeholder="Name" />
                <input onChange={(e) => setAgevalue(e.target.value)} value={agevalue} className="border-black border-2 w-4/6 h-10 rounded-3xl px-3" placeholder="Age" />
                <input onChange={(e) => setPhonenumbervalue(e.target.value)} value={phonenumbervalue} className="border-black border-2 w-4/6 h-10 rounded-3xl px-3" placeholder="PhoneNumber" />
                <input onChange={(e) => setPasswordvalue(e.target.value)} value={passwordvalue} className="border-black border-2 w-4/6 h-10 rounded-3xl px-3" placeholder="Password" />
                <button onClick={() => login()} className="text-2xl bg-gradient-to-r from-blue-500 to-green-500 px-3 rounded-2xl">Бүртгэл үүсгэх</button>
            </div>
        </div>
    )
}
"use client"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { SearchPart } from "../components/SearchPart"
export default function Home() {
    const currentRef = useRef(null)
    const params = useSearchParams();
    //const userId = params.get("id")
    const router = useRouter();
    const [playstatus, setPlaystatus] = useState(false)
    const [friendsstatus, setFriendsstatus] = useState(false)
    const [search, setSearch] = useState("")
    const [searchUserData, setSearchUserData] = useState([])
    const [myReqdata, setmyReqdata] = useState([])
    const [reqAllow, setReqAllow] = useState(true)
    const [searchPerson, setSearchPerson] = useState(false)
    const [myallreq, setmyAllData] = useState([])
    const [userId, setUserId] = useState([])
    const mytoken = localStorage.getItem("token");
    // const MyUserId = async () => {
    //     const url = "http://localhost:3002/token"
    //     await axios.get(url, { headers: { "token": mytoken } }).then((res) => console.log("sss", res?.data))
    // }
    // console.log(userId.id)
    const fetchAllData = async () => {
        await axios.post("http://localhost:3002/userdata", {
            token: mytoken
        }).then((res) => setmyAllData(res?.data?.userData?.requestFriend))
    }
    console.log(myallreq)
    //const reqId = myalldata?.requestFriend
    //console.log(reqId)
    // const fetchreqFriendsData = async () => {
    //     await axios.post("http://localhost:3002/reqFriendId", {
    //         token: mytoken
    //     }).then((res) => setmyReqdata(res?.data?.userData))
    // }
    const fetchMyFriends = async () => {

    }
    console.log(myReqdata)
    const easyProblem = () => {
        router.push(`/easyproblem`)
    }
    const hardProblem = () => {
        router.push(`level`)
    }
    const addFile = () => {
        router.push(`/add`)
    }
    const jumptoPersonAccound = () => {
        router.push(`/user`)
    }
    const playStatus = () => {
        setPlaystatus(true)
    }
    const friendsstatusdone = () => {
        setFriendsstatus(!friendsstatus)
        if (myallreq.length > 0) {
            setReqAllow(false)
        }
    }
    function back(ref) {
        if (ref.current && !ref.current.contains(event.target)) {
            setFriendsstatus(false)
        }
    }
    const searchUser = async () => {
        const url = `http://localhost:3002/searchUser/${search}`
        await axios.get(url).then((data) => setSearchUserData(data?.data?.data))
        setSearch(searchUserData?._id)
        console.log(searchUserData)
    }
    const reqFriend = async (id) => {
        console.log(id)
        const url = `http://localhost:3002/reqfriend`
        await axios.post(url, {
            token: mytoken,
            toId: id
        })
    }
    const seeFriendsReq = async () => {
        setSearchPerson(!searchPerson)
        await axios.post("http://localhost:3002/reqFriendInfo", {
            token: mytoken,
            id: myallreq
        }).then((res) => setmyReqdata(res?.data?.userData))
        // for (let i; i < myallreq.length; i++) {
        //     console.log("hiiiii", i)
        // }
        console.log(myallreq)
    }
    useEffect(() => {
        fetchAllData();
        // fetchreqFriendsData
        fetchMyFriends();
    }, [])
    return (
        <div onClick={() => back(currentRef)} className="min-w-[800px]">
            <div className="absolute flex w-full flex-row-reverse px-5 py-4">
                <div>
                    <Image onClick={() => jumptoPersonAccound()} src="user.svg" height={32} width={32} />
                </div>
            </div>
            <SearchPart friendsstatus={friendsstatus}
                friendsstatusdone={friendsstatusdone}
                currentRef={currentRef}
                search={search}
                setSearch={setSearch}
                searchUser={searchUser}
                // searchedUser={searchUser}
                searchPerson={searchPerson}
                setSearchPerson={setSearchPerson}
                searchUserData={searchUserData}
                setSearchUserData={setSearchUserData}
                reqFriend={reqFriend}
                reqAllow={reqAllow}
                seeFriendsReq={seeFriendsReq}
            />
            <div className={`flex gap-20 ${friendsstatus ? 'flex-row-reverse' : 'justify-center'} px-10 items-center  bg-gradient-to-r from-blue-600 to-blue-600 w-screen h-screen min-w-[200px]`}>
                <div className="rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 h-3/6 w-2/5 min-w-[250px]">
                    <div className="absolute flex flex-row-reverse ">
                        <button onClick={() => addFile()} className="py-1 px-3 rounded-xl bg-gradient-to-r from-green-500 toblue-500 text-2xl">+ Add Problem</button>
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
"use client";
import { useRouter } from "next/navigation";
import { UserDataContext } from "@/app/layout";
import Image from "next/image";
import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { SearchPart } from "../components/SearchPart";
import { InviteFriend, Playroom } from "../components/InviteFriend";
export default function Home() {
  const { token } = useContext(UserDataContext);
  const currentRef = useRef(null);
  const router = useRouter();
  const [playstatus, setPlaystatus] = useState(false);
  const [friendsstatus, setFriendsstatus] = useState(false);
  const [search, setSearch] = useState("");
  const [searchUserData, setSearchUserData] = useState([]);
  const [reqAllow, setReqAllow] = useState(true);
  const [searchPerson, setSearchPerson] = useState(false);
  const [myalldata, setmyAllData] = useState([]);
  //const [invitedFriend, setInvitedFriend] = useState([])
  const [usersInfo, setUsersInfo] = useState([]);
  const [myClosefrienddone, setMyclosefrienddone] = useState(true);
  const [liststatus, setListStatus] = useState(true);
  const [reqstatus, setReqstatus] = useState(false);
  const [playRoomStatus, setPlayRoomStatus] = useState(false);
  console.log("token", token);
  const fetchAllData = async () => {
    try {
      await axios
        .post("http://localhost:3002/userdata", {
          token: token,
        })
        .then((res) => setmyAllData(res?.data));
    } catch (err) {
      console.log(err);
    }
  };
  const myallreq = myalldata?.userData?.requestFriend;
  const invitationGame = myalldata?.userData?.invitationGame;
  const myFriendsData = myalldata?.userData?.myFriends;
  const invitedFriends = myalldata?.invitationGame;
  console.log("i am invitedFriends", invitedFriends);
  console.log(myallreq);
  const easyProblem = () => {
    router.push(`/easyproblem`);
  };
  const hardProblem = () => {
    router.push(`level`);
  };
  const addFile = () => {
    router.push(`/add`);
  };
  const jumptoPersonAccound = () => {
    router.push(`/user`);
  };
  const playStatus = () => {
    setPlaystatus(true);
  };
  const friendsstatusdone = async () => {
    setFriendsstatus(!friendsstatus);
    if (myallreq.length > 0) {
      setReqAllow(false);
    }
    await axios
      .post("http://localhost:3002/reqFriendInfo", {
        token: token,
        id: myallreq,
      })
      .then((res) => setUsersInfo(res?.data?.users));
  };
  async function back(ref) {
    if (ref.current && !ref.current.contains(event.target)) {
      setFriendsstatus(false);
      setSearchPerson(false);
      setListStatus(true);
      setPlaystatus(false);
      setPlayRoomStatus(false);
      try {
        const url = `http://localhost:3002/RemoveInvitation`;
        await axios.post(url, {
          token: token,
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
  const searchUser = async () => {
    setListStatus(false);
    setSearchPerson(false);
    const url = `http://localhost:3002/searchUser/${search}`;
    await axios.get(url).then((data) => setSearchUserData(data?.data?.data));
    setSearch(searchUserData?._id);
    setMyclosefrienddone(!myClosefrienddone);
    setSearch("");
  };
  const searchId = async () => {
    try {
      setListStatus(false);
      setSearchPerson(false);
      const url = `http://localhost:3002/searchId/${search}`;
      await axios.get(url).then((data) => setSearchUserData(data?.data?.data));
      setSearch(searchUserData?._id);
      setMyclosefrienddone(!myClosefrienddone);
      setSearch("");
    } catch (err) {
      console.log(err);
    }
  };
  const reqFriend = async (id) => {
    const url = `http://localhost:3002/reqfriend`;
    await axios.post(url, {
      token: token,
      toId: id,
    });
    setReqstatus(!reqstatus);
  };
  const seeFriendsReq = async () => {
    if (searchPerson == false) {
      setSearchPerson(true);
    }
    if (liststatus == true) {
      setListStatus(false);
    } else {
      setListStatus(true);
    }
  };
  const allowReq = async (id) => {
    alert(id);
    const url = `http://localhost:3002/allowReq`;
    await axios.post(url, {
      token: token,
      reqId: id,
    });
  };
  const refuse = async (id) => {
    const url = `http://localhost:3002/refuseReq`;
    await axios.post(url, {
      token: token,
      reqId: id,
    });
  };
  const ConnectFriends = () => {
    setFriendsstatus(true);
  };
  const withPlayFriends = async (id) => {
    try {
      const addRoomUrl = `http://localhost:3002/Addroom`;
      const curData = Date.now();
      // curData.getTime();
      const { data } = await axios.post(addRoomUrl, {
        token: token,
        toId: id,
        dateNow: curData,
      });
      const roomId = data;
      console.log(roomId);
      const url = `http://localhost:3002/invitationGame`;
      await axios.post(url, {
        token: token,
        toId: id,
        roomId: roomId,
      });
      const interval = setInterval(async () => {
        const url = `http://localhost:3002/handleToRequestStatus/${roomId}`;
        await axios
          .get(url)
          .then((res) => router.push(`/playwithfriend?roomId=${roomId}`));
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };
  const jumpIntoAnotherUsersAccound = (id) => {
    router.push(`./anotherUsers?id=${id}`);
  };
  const consoler = async () => {
    console.log(invitationGame);
    if (invitationGame.length > 0) {
      setPlayRoomStatus(true);
    }
  };
  const refreshPlayRoomButton = async () => {
    fetchAllData();
    setTimeout(() => {
      consoler();
    }, 100);
  };
  const HandlePlayWithFriend = async (roomId) => {
    //alert(roomId)
    router.push(`./playwithfriend?roomId=${roomId}`);
    try {
      const url = `http://localhost:3002/loginToRoom`;
      await axios.post(url, {
        token: token,
        roomId: roomId,
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (token) {
      fetchAllData();
    }
  }, [token]);
  return (
    <div onClick={() => back(currentRef)} className="min-w-[800px] ">
      <div className="absolute flex w-full flex-row-reverse cursor-pointer px-5 py-4">
        <div>
          <Image
            onClick={() => jumptoPersonAccound()}
            src="user.svg"
            height={32}
            width={32}
          />
        </div>
      </div>
      <SearchPart
        friendsstatus={friendsstatus}
        friendsstatusdone={friendsstatusdone}
        currentRef={currentRef}
        search={search}
        setSearch={setSearch}
        searchUser={searchUser}
        searchPerson={searchPerson}
        setSearchPerson={setSearchPerson}
        searchUserData={searchUserData}
        setSearchUserData={setSearchUserData}
        reqFriend={reqFriend}
        reqAllow={reqAllow}
        seeFriendsReq={seeFriendsReq}
        usersInfo={usersInfo}
        allowReq={allowReq}
        myFriendsData={myFriendsData}
        myClosefrienddone={myClosefrienddone}
        liststatus={liststatus}
        refuse={refuse}
        jumpIntoAnotherUsersAccound={jumpIntoAnotherUsersAccound}
        searchId={searchId}
        withPlayFriends={withPlayFriends}
        reqstatus={reqstatus}
        setReqstatus={setReqstatus}
      />
      <div
        className={`flex gap-20 ${
          friendsstatus ? "flex-row-reverse" : "justify-center"
        } px-10 items-center  bg-gradient-to-r from-blue-600 to-blue-600 w-screen h-screen min-w-[200px]`}
      >
        <div className="absolute rounded-3xl bg-gradient-to-r  from-cyan-500 to-blue-500 h-3/6 w-2/5 min-w-[250px]">
          <div className="flex justify-between gap-4">
            <button
              onClick={() => addFile()}
              className="py-1  px-3 rounded-xl bg-gradient-to-r from-green-500 toblue-500 text-2xl"
            >
              + Add Problem
            </button>
            <button
              className="  py-1 px-3  rounded-3xl bg-gradient-to-r from-green-500  text-2xl"
              onClick={() => refreshPlayRoomButton()}
            >
              <Image
                src="refresh.svg"
                height={16}
                width={16}
                className="rounded-xl"
              />
            </button>
          </div>
          <div className="h-5/6 flex items-center justify-center">
            <div className="text-white text-[56px] origin-bottom rotate-45 ">
              Бодлого
            </div>
          </div>
          <div
            onClick={() => playStatus()}
            className="h-1/6 text-white cursor-pointer bg-gradient-to-r from-blue-500 to-blue-400 rounded-b-3xl text-[50px] flex justify-center items-center"
          >
            Тоглох
          </div>
        </div>
        {playstatus ? (
          <div className="absolute w-4/6 h-96  flex  items-center gap-20  justify-center rounded-3xl">
            <button
              ref={currentRef}
              onClick={() => easyProblem()}
              className="bg-gradient-to-r cursor-pointer text-white py-2 border-black border-4 from-blue-600 to-blue-600  text-3xl px-5 rounded-2xl"
            >
              Classic
            </button>
            <button
              ref={currentRef}
              onClick={() => hardProblem()}
              className="bg-gradient-to-r cursor-pointer text-white py-2 border-black border-4 from-blue-600 to-blue-600  text-3xl px-5 rounded-2xl"
            >
              Rank
            </button>
            <button
              ref={currentRef}
              onClick={() => ConnectFriends()}
              className="flex text-white cursor-pointer gap-2 items-baseline py-2 bg-gradient-to-r border-black border-4 from-blue-600 to-blue-600  text-3xl px-5 rounded-2xl"
            >
              <Image src="users.svg" height={24} width={24} />
              <h1>Challenge</h1>
            </button>
          </div>
        ) : (
          <div></div>
        )}
        {playRoomStatus ? (
          <div
            ref={currentRef}
            className=" w-60 rounded-3xl py-2  absolute bg-white flex flex-col gap-4 justify-center items-center over overflow-y-auto"
          >
            {invitedFriends.map((e) => (
              <InviteFriend
                profile={e.profile}
                username={e.username}
                roomId={e._id}
                HandlePlayWithFriend={HandlePlayWithFriend}
              />
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

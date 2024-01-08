"use client";
import { useState, useEffect, useRef, useContext } from "react";
import { Myquiz } from "../components/Myquiz";
import { Profile } from "../components/Profile";
import { Posts } from "../components/Posts";
import { Photos } from "../components/Photos";
import { UserDataContext } from "@/app/layout";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CreateNewFile } from "../components/CreateNewFile";
export default function Home() {
  const currentRef = useRef(null);
  const router = useRouter();
  const { token } = useContext(UserDataContext);
  const [restartdone, setrestartdone] = useState(false);
  const imageInput = useRef(null);
  const myCollection = useRef(null);
  const myCollection2 = useRef(null);
  const [useralldata, setUseralldata] = useState();
  const [collectionFile, setCollectionFile] = useState("");
  const [myquizData, setMyquizData] = useState([]);
  const [settingsStatus, setSettingsStatus] = useState(false);
  const [profileclick, setProfileClick] = useState(true);
  const [postsclick, setPostsClick] = useState(false);
  const [photosclick, setPhotosClick] = useState(false);
  const [entriesclick, setEntriesClick] = useState(false);
  const [greenbutton, setGreenbutton] = useState(true);
  const fetchUserdata = async () => {
    await axios
      .post("http://localhost:3002/userdata", {
        token: token,
      })
      .then((res) => setUseralldata(res?.data?.userData));
  };
  const fetchMyquizIntoData = async () => {
    await axios
      .get(`http://localhost:3002/MyquizIntoData`, {
        headers: { token: token },
      })
      .then((res) => setMyquizData(res?.data?.quizdata));
  };
  console.log("quiz", myquizData);
  const name = useralldata?.username;
  const id = useralldata?.userId;
  const profilePhoto = useralldata?.profile;
  const mycollection1 = useralldata?.mycollection1;
  const mycollection2 = useralldata?.mycollection2;
  const classicPoint = useralldata?.classicPoint;
  const classicHigh = useralldata?.classicHigh;
  const filechosen = async (file) => {
    const FR = new FileReader();
    FR.addEventListener("load", async function (evt) {
      // setImage(evt.target.result)
      await axios.post("http://localhost:3002/profile", {
        token: token,
        profile: evt.target.result,
      });
    });
    FR.readAsDataURL(file);
  };
  const Collectionchosen = (file) => {
    const FR = new FileReader();
    FR.addEventListener("load", async function (evt) {
      setCollectionFile(evt.target.result);
      await axios.post("http://localhost:3002/collection1", {
        token: token,
        mycollection1: evt.target.result,
      });
    });
    FR.readAsDataURL(file);
    console.log(collectionFile);
  };
  const Collectionchosen2 = (file) => {
    const FR = new FileReader();
    FR.addEventListener("load", async function (evt) {
      setCollectionFile(evt.target.result);
      await axios.post("http://localhost:3002/collection2", {
        token: token,
        mycollection2: evt.target.result,
      });
    });
    FR.readAsDataURL(file);

    console.log(collectionFile);
  };
  const DeleteQuiz = async (id, fetchMyquizIntoData) => {
    setTimeout(() => {
      fetchMyquizIntoData();
    }, 500);
    try {
      const url = "http://localhost:3002/deleteOneQuiz";
      await axios.post(url, {
        token: token,
        id: id,
      });
    } catch {}
  };
  const settingsStatusDone = () => {
    setSettingsStatus(!settingsStatus);
  };

  const restart = () => {
    setrestartdone(!restartdone);
  };
  const backtohome = () => {
    router.push(`/home`);
  };
  const back = (ref) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setrestartdone(false);
    }
  };
  useEffect(() => {
    if (token) {
      fetchUserdata();
      fetchMyquizIntoData();
    }
  }, [token]);
  const HandleProfile = () => {
    setProfileClick(true);
    setPhotosClick(false);
    setPostsClick(false);
    setEntriesClick(false);
    setGreenbutton(true);
  };
  const HandleEntries = () => {
    setEntriesClick(true);
    setPhotosClick(false);
    setProfileClick(false);
    setPostsClick(false);
    setGreenbutton(false);
  };
  return (
    <div
      onClick={() => back(currentRef)}
      className="w-screen h-screen flex bg-blue-500"
    >
      {greenbutton ? (
        restartdone ? (
          <div
            ref={currentRef}
            className="absolute bg-gradient-to-r from-green-500 text-2xl rounded-xl px-5 py-5 mt-4 ml-3"
          >
            <button onClick={() => backtohome()}> -Буцах</button>
          </div>
        ) : (
          <button className="absolute px-3 py-1 rounded-2xl bg-gradient-to-r from-green-500 to-yellow-500 mt-2 ml-3">
            <Image
              src="bars.svg"
              height={16}
              width={16}
              onClick={() => restart()}
            />
          </button>
        )
      ) : (
        ""
      )}

      <div className="h-full w-full text-black ">
        {profileclick ? (
          <Profile
            profilePhoto={profilePhoto}
            imageInput={imageInput}
            filechosen={filechosen}
            name={name}
            id={id}
            mycollection1={mycollection1}
            mycollection2={mycollection2}
            myCollection={myCollection}
            myCollection2={myCollection2}
            classicPoint={classicPoint}
            Collectionchosen={Collectionchosen}
            classicHigh={classicHigh}
          />
        ) : (
          ""
        )}
        {photosclick ? (
          <Photos
            mycollection1={mycollection1}
            mycollection2={mycollection2}
            myCollection={myCollection}
            myCollection2={myCollection2}
          />
        ) : (
          ""
        )}
        {postsclick ? <Posts /> : ""}
        {entriesclick ? (
          <div className="h-full h-full">
            <div className="h-3/6 w-full border-b-4 border-black">
              <CreateNewFile />
            </div>
            <div className="flex flex-col gap-4 ">
              <div className="h-full w-full flex justify-center text-3xl">
                Your all quiz
              </div>
              {myquizData?.map((e, index) => (
                <div className="w-full ">
                  <Myquiz
                    question={e.question}
                    a_answer={e.a_answer}
                    b_answer={e.b_answer}
                    c_answer={e.c_answer}
                    d_answer={e.d_answer}
                    DeleteQuiz={DeleteQuiz}
                    _id={e._id}
                    index={index}
                    correctAnswer={e.correctAnswer}
                    fetchMyquizIntoData={fetchMyquizIntoData}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="h-full min-w-[100px] text-black border-l-4	border-black">
        <div onClick={() => HandleProfile()}>Profile</div>
        <div onClick={() => HandleEntries()}>Your created</div>
      </div>
    </div>
  );
}

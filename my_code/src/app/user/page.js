"use client";
import { useState, useEffect, useRef, useContext } from "react";
import { Myquiz } from "../components/Myquiz";
import { Profile } from "../components/Profile";
import { Posts } from "../components/Posts";
import { Photos } from "../components/Photos";
import { UserDataContext } from "@/app/layout"
import Image from "next/image";
import axios from "axios";
import { CreateNewFile } from "../components/CreateNewFile";
export default function Home() {
  const { token } = useContext(UserDataContext);
  const imageInput = useRef(null);
  const myCollection = useRef(null);
  const myCollection2 = useRef(null);
  const [useralldata, setUseralldata] = useState();
  const [collectionFile, setCollectionFile] = useState("");
  const [myquizData, setMyquizData] = useState([]);
  const [quizNumber, setQuizNumber] = useState(1);
  const [settingsStatus, setSettingsStatus] = useState(false);
  const [profileStatus, setProfileStatus] = useState(true);
  const [photoStatus, setPhotoStatus] = useState(false);
  const [podtStatus, setPostStatus] = useState(false);
  const [entriesStatus, setEntriesStatus] = useState(false);
  ///
  const [profileclick, setProfileClick] = useState(true);
  const [postsclick, setPostsClick] = useState(false);
  const [photosclick, setPhotosClick] = useState(false);
  const [entriesclick, setEntriesClick] = useState(false);
  //
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
  const classicPoint = useralldata?.classicPoint
  //alert(classicPoint)
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
    } catch { }
  };
  const settingsStatusDone = () => {
    setSettingsStatus(!settingsStatus);
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
  };
  const HandlePosts = () => {
    setEntriesClick(false);
    setPhotosClick(false);
    setPostsClick(true);
    setProfileClick(false);
  };
  const HandlePhotos = () => {
    setEntriesClick(false);
    setPhotosClick(true);
    setPostsClick(false);
    setProfileClick(false);
  };
  const HandleEntries = () => {
    setEntriesClick(true);
    setPhotosClick(false);
    setProfileClick(false);
    setPostsClick(false);
  };
  return (
    <div className="w-screen h-screen flex ">
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
              <div className="h-full w-full flex justify-center text-3xl">Your all quiz</div>
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
        <div onClick={() => HandlePosts()}>Posts</div>
        <div onClick={() => HandlePhotos()}>Photo</div>
        <div onClick={() => HandleEntries()}>Your created</div>
      </div>
    </div>
  );
}

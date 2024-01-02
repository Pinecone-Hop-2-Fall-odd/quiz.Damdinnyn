"use client";
import { useState, useEffect, useRef, useContext } from "react";
import { Myquiz } from "../components/Myquiz";
import { Profile } from "../components/Profile";
import { Posts } from "../components/Posts";
import { Photos } from "../components/Photos";
import { UserDataContext } from "@/app/layout";
import Image from "next/image";
import axios from "axios";
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
          <div className="flex flex-col gap-4">
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
        ) : (
          ""
        )}
      </div>
      <div className="h-full min-w-[100px] text-black border-l-2	border-solid">
        <div onClick={() => HandleProfile()}>Profile</div>
        <div onClick={() => HandlePosts()}>Posts</div>
        <div onClick={() => HandlePhotos()}>Photo</div>
        <div onClick={() => HandleEntries()}>Your created</div>
      </div>

      {/* <div className="flex w-full h-2/5">
        <div className="w-2/5 flex flex-col items-center py-2">
          <div className="w-full flex flex-row-reverse px-2">
            <Image
              onClick={() => settingsStatusDone()}
              src="gear.svg"
              height={24}
              width={24}
            />
          </div>
          {settingsStatus ? (
            <div className=" flex flex-col items-center justify-center">
              <div></div>
              <div></div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div
                style={{ backgroundImage: `url(${profilePhoto})` }}
                className="rounded-full w-40 h-40 border-[8px] border-black bg-no-repeat bg-center  bg-cover"
              >
                <input
                  ref={imageInput}
                  style={{ visibility: "hidden" }}
                  type="file"
                  onChange={(e) => {
                    filechosen(e.target.files[0]);
                  }}
                />
              </div>
              <Image
                onClick={() => {
                  if (imageInput.current) {
                    imageInput.current.click();
                  }
                }}
                src="camera.svg"
                height={16}
                width={16}
              />
              <div className="text-3xl">{name}</div>
            </div>
          )}
        </div>
        <div className="h-full w-12 bg-[#DAD9D9]"></div>
        <div className="w-3/5 flex flex-col items-center">
          <div className="text-[60px]"> Таны зэрэглэл </div>
        </div>
      </div>
      <div className="w-full h-12 bg-[#DAD9D9]"></div>
      <div className="w-full h-3/5 flex">
        <div className="w-3/6 h-full flex gap-2 flex-col items-center py-4 ">
          <div className="text-3xl">Таны цуглуулга</div>
          <div
            style={{ backgroundImage: `url(${mycollection1})` }}
            className="g-no-repeat bg-center bg-cover w-5/6 h-3/6 border-4 border-[#DAD9D9] rounded-xl max-w-[400px]"
          >
            <div className="flex w-full flex-row-reverse px-2 py-1 ">
              <Image
                onClick={() => {
                  if (myCollection.current) {
                    myCollection.current.click();
                  }
                }}
                src="bars.svg"
                width={12}
                height={12}
              />
              <input
                ref={myCollection}
                style={{ visibility: "hidden" }}
                type="file"
                onChange={(e) => {
                  Collectionchosen(e.target.files[0]);
                }}
              />
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${mycollection2})` }}
            className="g-no-repeat bg-center bg-cover w-5/6 h-3/6 border-4 border-[#DAD9D9] rounded-xl max-w-[400px]"
          >
            <div className="flex w-full flex-row-reverse px-2 py-1">
              <Image
                onClick={() => {
                  if (myCollection2.current) {
                    myCollection2.current.click();
                  }
                }}
                src="bars.svg"
                width={12}
                height={12}
              />
              <input
                ref={myCollection2}
                style={{ visibility: "hidden" }}
                type="file"
                onChange={(e) => {
                  Collectionchosen2(e.target.files[0]);
                }}
              />
            </div>
          </div>
        </div>
        <div className="h-full w-12 bg-[#DAD9D9]"></div>
        <div className="w-3/6 flex flex-col items-center py-4 px-4 gap-2">
          <h1 className="text-black text-3xl flex justify-center">
            Таны оруулсан зүйлс
          </h1>
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
      </div> */}
    </div>
  );
}

"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { BACK_END_URL } from "@/back-url";
import axios from "axios";
import Image from "next/image";

export default function Home() {
  const currentRef = useRef(null);
  const [useralldata, setUseralldata] = useState([]);
  const [quizdata, setQuizdata] = useState([]);
  const [restartdone, setrestartdone] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");
  const fetchUserdata = async () => {
    const myToken = localStorage.getItem("token");
    await axios
      .get(`${BACK_END_URL}/anotherUserData/${id}`, {
        headers: { token: myToken },
      })
      .then((res) => setUseralldata(res?.data?.userData));
  };
  const getYourQuizData = async () => {
    const myToken = localStorage.getItem("token");
    try {
      const url = `${BACK_END_URL}/getYourQuizData/${id}`;
      await axios
        .get(url, {
          headers: { token: myToken },
        })
        .then((res) => setQuizdata(res));
    } catch (err) {
      console.log(err);
    }
  };
  // loadStaticPaths;
  const profilePhoto = useralldata?.profile;
  const username = useralldata?.username;
  const mycollection1 = useralldata?.mycollection1;
  const mycollection2 = useralldata?.mycollection2;
  const userid = useralldata?.userId;
  const classicPoint = useralldata?.classicPoint;
  const classicHigh = useralldata?.classicHigh;
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
    fetchUserdata();
    getYourQuizData();
  }, []);
  return (
    <div
      onClick={() => back(currentRef)}
      className="w-screen h-screen bg-blue-500"
    >
      <div className="flex flex-row-reverse  px-5 w-full absolute top-0 h-6 mt-4">
        {restartdone ? (
          <div
            ref={currentRef}
            onClickœ
            className="absolute bg-gradient-to-r from-green-500 text-2xl rounded-xl px-5 py-5"
          >
            <h1 onClick={() => backtohome()} className="cursor-pointer">
              -Буцах
            </h1>
          </div>
        ) : (
          <button className="absolute px-3 py-1 rounded-2xl bg-gradient-to-r from-green-500 to-yellow-500">
            <Image
              src="bars.svg"
              height={16}
              width={16}
              onClick={() => restart()}
            />
          </button>
        )}
      </div>
      <div className="flex w-full h-2/5">
        <div className="w-2/5 flex flex-col items-center py-5 min-w-[300px]">
          <div
            style={{ backgroundImage: `url(${profilePhoto})` }}
            className="rounded-full w-60 h-60 border-[8px] border-black bg-no-repeat bg-center  bg-cover"
          ></div>
          <div className="flex flex-col items-center">
            <div className="text-3xl">{username}</div>
            <h1>ID({userid})</h1>
          </div>
        </div>
        <div className="w-3/5 flex flex-col items-center justify-center">
          <div className="text-[60px] w-full flex justify-center bg-blue-500">
            {" "}
            {username}' s Rank{" "}
          </div>
          <div className="h-[500px] w-full flex flex-col bg-blue-500 justify-center items-center">
            <div className="w-full h-2/6 text-2xl min-w-[500px] flex flex-col justify-center items-center">
              <div className="flex ">
                <div className="flex gap-4 justify-center">
                  <h1 className="w-40 flex  flex-row-reverse">
                    Classic Score:{" "}
                  </h1>
                  <div className="flex gap-2">
                    <h1>{classicPoint}</h1>
                    <Image src="star.svg" height={24} width={24} />
                  </div>
                </div>
                <div className="flex gap-4">
                  <h1 className="w-40 flex  flex-row-reverse">High Score: </h1>
                  <div className="flex gap-2">
                    <h1>{classicHigh}</h1>
                    <Image src="star.svg" height={24} width={24} />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-2/6 text-2xl min-w-[500px] flex justify-center">
              <h1 className="w-36 flex flex-row-reverse">Rank</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-12 bg-black"></div>
      <div className="w-full h-3/5 flex ">
        <div className="w-3/6 h-full flex gap-2 flex-col items-center py-4 ">
          <div className="text-3xl">{username}'s Collection</div>
          <div
            style={{ backgroundImage: `url(${mycollection1})` }}
            className="g-no-repeat bg-center bg-cover w-5/6 h-3/6 border-4 border-[#DAD9D9] rounded-xl max-w-[400px]"
          ></div>
          <div
            style={{ backgroundImage: `url(${mycollection2})` }}
            className="g-no-repeat bg-center bg-cover w-5/6 h-3/6 border-4 border-[#DAD9D9] rounded-xl max-w-[400px]"
          ></div>
        </div>
        <div className="h-full w-12 bg-[black]"></div>
        <div className="w-3/6 flex flex-col items-center py-4">
          <h1 className="text-black text-3xl">{username}' Problems</h1>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRef } from "react";
import Image from "next/image";
import axios from "axios";
import { BACK_END_URL } from "@/back-url";
// color codes
// red green blue
// hex, rgb
// rgb(255, 255, 255)
// rgba(255, 255, 255, 0.6)
// #ffffff
export default function Home() {
  const currentRef = useRef(null);
  const router = useRouter();
  const [restartdone, setrestartdone] = useState(false);
  const [passedLevels, setPassedLevels] = useState([]);
  const [showRankStatus, setShowRankStatus] = useState(false);

  const fetchUserData = async () => {
    const mytoken = localStorage.getItem("token");
    const res = await axios
      .get(`${BACK_END_URL}/userdata`, { headers: { token: mytoken } })
      .then((res) => setPassedLevels(res.data.data));
  };
  console.log(passedLevels);

  const playRank = (id, passed) => {
    // alert(id);
    if (passedLevels.includes(id)) {
      //alert("aaa");
      router.push(`/hardproblem?quizId=${id}`);
    }
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
  const levelArray = [
    { level: "1", id: "1", passedId: "2" },
    { level: "2", id: "2", passedId: "3" },
    { level: "3", id: "3", passedId: "4" },
    { level: "4", id: "4", passedId: "5" },
    { level: "5", id: "5", passedId: "6" },
    { level: "6", id: "6", passedId: "7" },
    { level: "7", id: "7", passedId: "8" },
    { level: "8", id: "8", passedId: "9" },
    { level: "9", id: "9", passedId: "10" },
    { level: "10", id: "10", passedId: "11" },
    { level: "11", id: "11", passedId: "12" },
    { level: "12", id: "12", passedId: "13" },
    { level: "13", id: "13", passedId: "14" },
    { level: "14", id: "14", passedId: "15" },
    { level: "15", id: "15", passedId: "16" },
  ];

  const checkIsPassed = (checkingLevel) => {
    return passedLevels.includes(checkingLevel);
  };
  const expertPart = () => {
    setShowRankStatus(!showRankStatus);
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div
      onClick={() => back(currentRef)}
      className="h-screen w-screen bg-gradient-to-r from-blue-600 to-blue-600 flex flex-col justify-center items-center"
    >
      <div className="flex flex-row-reverse  px-5 w-full absolute top-0 h-6 mt-4">
        {restartdone ? (
          <div
            ref={currentRef}
            onClickœ
            className="absolute bg-gradient-to-r from-green-500 text-2xl rounded-xl px-5 py-5"
          >
            <button onClick={() => backtohome()}> -Буцах</button>
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
      <div className="text-[60px] text-white">
        {showRankStatus ? "Expert" : "Warrior"}
      </div>
      {showRankStatus ? (
        <div className="keke w-4/6 h-5/6 flex  bg-black rounded-xl text-white overflow-none">
          <div className="h-full w-12 flex justify-center items-center">
            <Image src="leftarrow.svg" height={16} width={16} />
          </div>
          <div className="w-full h-full flex gap-20 justify-center items-center flex-wrap bg-black rounded-xl overflow-y-scrol overflow-hidden">
            {levelArray.map((e) => (
              <div
                onClick={() => playRank(e.id, e.passedId)}
                className="border-8 border-[#0953F7] bg-white h-20 w-40 flex justify-center items-center text-[60px] rounded-2xl text-[#D9a9a4]"
              >
                {!checkIsPassed(e.level) && (
                  <div className="">
                    <Image src="lock.svg" height={64} width={16} />
                  </div>
                )}
                {e.level}
              </div>
            ))}
          </div>
          <div
            style={{ overflowY: "hidden" }}
            className="h-full w-12 flex justify-center items-center"
          >
            <Image
              onClick={() => expertPart()}
              src="rightarrow.svg"
              height={16}
              width={16}
            />
          </div>
        </div>
      ) : (
        <div className="w-4/6 h-5/6 flex  bg-black rounded-xl overflow-y-scroll">
          <div className="h-full w-12 flex justify-center items-center">
            <Image src="leftarrow.svg" height={16} width={16} />
          </div>
          <div className="w-full h-full flex gap-20 justify-center items-center flex-wrap bg-black rounded-xl overflow-y-scroll">
            {levelArray.map((e) => (
              <div
                onClick={() => playRank(e.id)}
                className="border-8 border-[#0953F7] bg-white h-20 w-40 flex justify-center items-center text-[60px] rounded-2xl text-[#D9a9a4]"
              >
                {!checkIsPassed(e.level) && (
                  <div className="">
                    <Image src="lock.svg" height={64} width={16} />
                  </div>
                )}
                {e.level}
              </div>
            ))}
          </div>
          <div className="h-full w-12 flex justify-center items-center">
            <Image
              onClick={() => expertPart()}
              src="rightarrow.svg"
              height={16}
              width={16}
            />
          </div>
        </div>
      )}
    </div>
  );
}

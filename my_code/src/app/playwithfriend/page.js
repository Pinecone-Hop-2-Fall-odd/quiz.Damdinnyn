"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function Home() {
  const router = useRouter();
  const [questionvalue, setQuestionvalue] = useState("");
  const [a_answer, setA_answer] = useState("");
  const [b_answer, setB_answer] = useState("");
  const [c_answer, setC_answer] = useState("");
  const [d_answer, setD_answer] = useState("");
  const [bordercolor, setBordercolor] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [restartdone, setrestartdone] = useState(false);
  const currentRef = useRef(null);

  const clickme = (index) => {
    setBordercolor(bordercolor === index ? null : index);
    console.log("sss", index);
    setCorrectAnswer(index);
  };
  function back(ref) {
    if (ref.current && !ref.current.contains(event.target)) {
      setrestartdone(false);
    }
  }
  const restart = () => {
    setrestartdone(!restartdone);
  };
  const backtohome = () => {
    router.push(`/home`);
  };
  return (
    <div
      onClick={() => back(currentRef)}
      className="bg-gradient-to-r from-blue-500 to-blue-500 w-screen h-screen"
    >
      {restartdone ? (
        <div
          ref={currentRef}
          className="absolute bg-gradient-to-r from-green-500 text-2xl rounded-xl px-5 py-5 mt-[2px] ml-3"
        >
          <h1 onClick={() => backtohome()}> -Буцах</h1>
          <h1 onClick={() => startAgain()}>-Дахин эхлэх</h1>
        </div>
      ) : (
        <button className="absolute px-3 py-1 rounded-2xl bg-gradient-to-r from-green-500 to-yellow-500 mt-[2px] ml-3">
          <Image
            src="bars.svg"
            height={16}
            width={16}
            onClick={() => restart()}
          />
        </button>
      )}
      <div className="h-4/6 w-full flex justify-center items-center">
        <div className="h-5/6 w-4/6 rounded-3xl  px-8 py-4 flex flex-col  bg-gradient-to-r from-blue-400 to-blue-400 ">
          <div className="text-[40px] w-full flex justify-center">
            Your input problem?
          </div>
          <input
            onChange={(e) => setQuestionvalue(e.target.value)}
            value={questionvalue}
            className="border-black px-4 border-[3px] text-2xl rounded-2xl flex flex-wrap"
          />
        </div>
      </div>
      {/* <div className="absolute w-full   bg-gradient-to-r from-green-500 to-yellow-500"></div> */}
      <div className="h-2/6 w-full">
        <div className="h-2/6 flex justify-around text-2xl">
          <div className="w-2/5 h-2/6 px-4 flex items-center ">
            {" "}
            <h1 onClick={() => clickme(0)}>A.</h1>
            <input
              onChange={(e) => setA_answer(e.target.value)}
              value={a_answer}
              className={`${
                bordercolor === 0 ? "border-[red]" : "border-black"
              } rounded-xl border-[4px] w-full px-2`}
            />
          </div>
          <div className="w-2/5 h-2/6 px-4 flex items-center">
            <h1 onClick={() => clickme(1)}>B.</h1>
            <input
              onChange={(e) => setB_answer(e.target.value)}
              value={b_answer}
              className={`${
                bordercolor === 1 ? "border-[red]" : "border-black"
              } rounded-xl  border-[4px] w-full px-2`}
            />
          </div>
        </div>
        <div className="h-2/6 flex justify-around text-2xl">
          <div className=" w-2/5 h-2/6  px-4 flex items-center">
            <h1 onClick={() => clickme(2)}>C.</h1>
            <input
              onChange={(e) => setC_answer(e.target.value)}
              value={c_answer}
              className={`${
                bordercolor === 2 ? "border-[red]" : "border-black"
              } rounded-xl border-[4px] w-full px-2`}
            />
          </div>
          <div className="w-2/5  h-2/6  px-4 flex items-center">
            <h1 onClick={() => clickme(3)}>D.</h1>
            <input
              onChange={(e) => setD_answer(e.target.value)}
              value={d_answer}
              className={`${
                bordercolor === 3 ? "border-[red]" : "border-black"
              } rounded-xl  border-[4px] w-full px-2`}
            />
          </div>
        </div>

        <div className="h-2/6 flex justify-center ">
          <button
            onClick={() => finished()}
            className="flex items-center  bg-gradient-to-r from-green-500 to-yellow-500 px-5 py-4 text-2xl rounded-3xl h-2/6"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

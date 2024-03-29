"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BACK_END_URL } from "@/back-url";
import axios from "axios";
export default function Knonledge() {
  const params = useSearchParams();
  const userId = params.get("id");
  const quizId = params.get("quizId");
  const id = String(params.get("quizId"));
  const currentRef = useRef(null);
  const router = useRouter();
  const [restartdone, setrestartdone] = useState(false);
  const [quizData, setQuizdata] = useState([]);
  const [bordercolor, setBordercolor] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState();
  const [count, setCount] = useState(30);
  const mytoken = localStorage.getItem("token");
  const [index, setIndex] = useState();
  const [timeborder, setTimeborder] = useState(false);
  const fetchalldata = async () => {
    const url = `${BACK_END_URL}/rankquiz/${id}`;
    await axios.get(url).then((res) => {
      setQuizdata(res?.data?.quizData);
    });
  };
  //console.log(quizData);
  const restart = () => {
    setrestartdone(!restartdone);
  };
  const backtohome = () => {
    router.push(`/home`);
  };
  function back(ref) {
    if (ref.current && !ref.current.contains(event.target)) {
      setrestartdone(false);
    }
  }
  const clickme = (index) => {
    setBordercolor(bordercolor === index ? null : index);
    setCorrectAnswer(index);
  };
  const overProblem = async () => {
    const passedlevel = Number(id) + 1;
    console.log(id);
    console.log("pass", passedlevel);
    if (quizData?.correctAnswer == correctAnswer) {
      await axios.post(`${BACK_END_URL}/passedlevels`, {
        token: mytoken,
        levelId: passedlevel,
        rankId: Number(passedlevel),
      });
      router.push(`./levelFinish?quizId=${quizId}`);
      //index == 1
      //setBordercolor(11)
    } else {
      router.push(`./loseThenlevelFinished?quizId=${quizId}`);
      //index == 1
      // setBordercolor(11)
    }
  };
  ///setInterval
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    if (count == 0) {
      router.push(`./loseThenlevelFinished?id=${userId}&quizId=${quizId}`);
    } else if (count < 10) {
      setTimeborder(true);
    }
    return () => clearInterval(interval);
  }, [count]);
  useEffect(() => {
    fetchalldata();
  }, []);

  return (
    <div
      onClick={() => back(currentRef)}
      className="h-screen w-screen bg-gradient-to-r from-blue-600 to-blue-600"
    >
      <div className="flex flex-row-reverse  px-5">
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
      <div className="w-full flex justify-center py-5 absolute">
        <div
          className={`bg-white px-10 ${timeborder ? "border-[red]" : "border-black"
            } flex justify-center text-3xl border-4  rounded-xl`}
        >
          {count}
        </div>
      </div>
      <div className="h-4/6 w-full flex justify-center items-center">
        <div className="h-5/6 w-4/6 bg-white rounded-3xl bg-gradient-to-r from-blue-500 to-blue-500">
          <div className="text-[40px] w-full flex justify-center">Бодлого?</div>
          <div className="text-3xl flex justify-center px-3">
            {quizData?.question}
          </div>
        </div>
      </div>
      <div className="h-2/6 w-full">
        <div className="h-2/6 flex justify-around text-2xl">
          <div
            onClick={() => clickme(0)}
            className={` h-2/6 ${bordercolor === 0 ? "border-[red]" : "border-black"
              }  border-[3px] bg-white rounded-3xl px-6 py-4 flex items-center`}
          >
            A.{quizData?.a_answer}
          </div>
          <div
            onClick={() => clickme(1)}
            className={` h-2/6 ${bordercolor === 1 ? "border-[red]" : "border-black"
              }  border-[3px] bg-white rounded-3xl px-6 py-4 flex items-center`}
          >
            B.{quizData?.b_answer}
          </div>
        </div>
        <div className="h-2/6 flex justify-around text-2xl">
          <div
            onClick={() => clickme(2)}
            className={` h-2/6 ${bordercolor === 2 ? "border-[red]" : "border-black"
              }  border-[3px] bg-white rounded-3xl px-6 py-4 flex items-center`}
          >
            C.{quizData?.c_answer}
          </div>
          <div
            onClick={() => clickme(3)}
            className={` h-2/6 ${bordercolor === 3 ? "border-[red]" : "border-black"
              }  border-[3px] bg-white rounded-3xl px-6 py-4 flex items-center`}
          >
            D.{quizData?.d_answer}
          </div>
        </div>
        <div className=" flex justify-center ">
          <button
            onClick={() => overProblem()}
            className="flex items-center  bg-gradient-to-r from-green-500 to-yellow-500 px-5  text-2xl rounded-3xl "
          >
            Дууссан
            <Image
              className="mt-1 ml-2"
              src="arrow.svg"
              height={16}
              width={16}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

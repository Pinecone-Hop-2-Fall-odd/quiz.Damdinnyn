"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext } from "react";
import { UserDataContext } from "@/app/layout";
import axios from "axios";
import { BACK_END_URL } from "@/back-url";
export default function Knonledge() {
    const { token } = useContext(UserDataContext);
    //console.log("token", token)
    const params = useSearchParams();
    const roomId = params.get("roomId");
    const currentRef = useRef(null);
    const router = useRouter();
    const [restartdone, setrestartdone] = useState(false);
    const [roomData, setRoomdata] = useState(null);
    const [bordercolor, setBordercolor] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(10);
    const [count, setCount] = useState(60);
    const [timeborder, setTimeborder] = useState(false);
    const [question, setQuestion] = useState("")
    const [a_answer, setA_answer] = useState("")
    const [b_answer, setB_answer] = useState("")
    const [c_answer, setC_answer] = useState("")
    const [d_answer, setD_answer] = useState("")
    const [id, setId] = useState("")
    const replacedProblem = async () => {
        const url = `${BACK_END_URL}/getProblemOfRoom`;
        if (token)
            await axios.post(url, {
                roomId: roomId,
            }, { headers: { token } }).then((res) => {
                setId(res?.data.id)
                setRoomdata(res?.data.roomData);
            });
    };
    const restart = () => {
        setrestartdone(!restartdone);
    };
    const backtohome = () => {
        router.push(`/ home`);
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
    const finished = async () => {
        if (roomData.Aplayer == id) {
            if (roomData?.B_playerProblem.correct_answer == correctAnswer) {
                alert("you win")
                router.push(`./ compareTwoPlayers ? roomId = ${roomId}`);
                try {
                    const url = `${BACK_END_URL}/WhoIsTheWinner`
                    await axios.post(url, {
                        winner: "A"
                    })
                } catch (err) {
                    console.log(err)
                }
            } else {
                alert("you lose")
                router.push(`./compareTwoPlayers?roomId=${roomId}`);
            }

        } else if (roomData.Bplayer == id) {
            if (roomData?.A_playerProblem.correct_answer == correctAnswer) {
                alert("you win")
                router.push(`./home`);
                try {
                    const url = `${BACK_END_URL}/WhoIsTheWinner`
                    await axios.post(url, {
                        winner: "B"
                    })
                } catch (err) {
                    console.log(err)
                }
            } else {
                alert("you lose")
                router.push(`./home`);
            }
        }
    };
    ///setInterval
    useEffect(() => {
        const interval = setInterval(() => {
            setCount(count - 1);
        }, 1000);
        if (count == 0) {
            finished()
        } else if (count < 10) {
            setTimeborder(true);
        }
        return () => clearInterval(interval);
    }, [count]);
    useEffect(() => {
        replacedProblem();
    }, [token]);

    useEffect(() => {
        if (roomData) {
            if (roomData.Aplayer == id) {
                setQuestion(roomData.B_playerProblem?.question)
                setA_answer(roomData.B_playerProblem.a_answer)
                setB_answer(roomData.B_playerProblem.b_answer)
                setC_answer(roomData.B_playerProblem.c_answer)
                setD_answer(roomData.B_playerProblem.d_answer)

            } else if (roomData.Bplayer == id) {
                setQuestion(roomData.A_playerProblem?.question)
                setA_answer(roomData.A_playerProblem.a_answer)
                setB_answer(roomData.A_playerProblem.b_answer)
                setC_answer(roomData.A_playerProblem.c_answer)
                setD_answer(roomData.A_playerProblem.d_answer)
            }
        }
    }, [roomData]);

    //console.log("roomData", roomData)

    return (
        <div
            onClick={() => back(currentRef)}
            className="h-screen w-screen bg-gradient-to-r from-blue-600 to-blue-600"
        >
            <div className="flex flex-row-reverse  px-5">
                {restartdone ? (
                    <div
                        ref={currentRef}
                        className="bg-gradient-to-r from-green-500 text-2xl rounded-xl px-5 py-5"
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
                        {question}
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
                        A.{a_answer}
                    </div>
                    <div
                        onClick={() => clickme(1)}
                        className={` h-2/6 ${bordercolor === 1 ? "border-[red]" : "border-black"
                            }  border-[3px] bg-white rounded-3xl px-6 py-4 flex items-center`}
                    >
                        B.{b_answer}
                    </div>
                </div>
                <div className="h-2/6 flex justify-around text-2xl">
                    <div
                        onClick={() => clickme(2)}
                        className={` h-2/6 ${bordercolor === 2 ? "border-[red]" : "border-black"
                            }  border-[3px] bg-white rounded-3xl px-6 py-4 flex items-center`}
                    >
                        C.{c_answer}
                    </div>
                    <div
                        onClick={() => clickme(3)}
                        className={` h-2/6 ${bordercolor === 3 ? "border-[red]" : "border-black"
                            }  border-[3px] bg-white rounded-3xl px-6 py-4 flex items-center`}
                    >
                        D.{d_answer}
                    </div>
                </div>
                <div className=" flex justify-center ">
                    <button
                        onClick={() => overProblem()}
                        className="flex items-center  bg-gradient-to-r from-green-500 to-yellow-500 px-5  text-2xl rounded-3xl "
                    >
                        Confirm
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

"use client";
import { useState, useEffect, useRef } from "react";
import { Myquiz } from "../components/Myquiz";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
export default function Home() {
    const imageInput = useRef(null);
    const myCollection = useRef(null);
    const myCollection2 = useRef(null);
    const [useralldata, setUseralldata] = useState();
    // const [image, setImage] = useState("");
    const [collectionFile, setCollectionFile] = useState("");
    const myToken = localStorage.getItem("token");
    const [myquizData, setMyquizData] = useState([]);
    const [quizNumber, setQuizNumber] = useState(1);

    const fetchUserdata = async () => {
        await axios
            .post("http://localhost:3002/userdata", {
                token: myToken,
            })
            .then((res) => setUseralldata(res?.data?.userData));
    };
    const fetchMyquizIntoData = async () => {
        await axios
            .get(`http://localhost:3002/MyquizIntoData`, {
                headers: { token: myToken },
            })
            .then((res) => setMyquizData(res?.data?.quizdata));
    };
    console.log("quiz", myquizData);
    const name = useralldata?.username;
    const profilePhoto = useralldata?.profile;
    const mycollection1 = useralldata?.mycollection1;
    const mycollection2 = useralldata?.mycollection2;
    const filechosen = async (file) => {
        const FR = new FileReader();
        FR.addEventListener("load", async function (evt) {
            // setImage(evt.target.result)
            await axios.post("http://localhost:3002/profile", {
                token: myToken,
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
                token: myToken,
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
                token: myToken,
                mycollection2: evt.target.result,
            });
        });
        FR.readAsDataURL(file);

        console.log(collectionFile);
    }
    const DeleteQuiz = async (id) => {
        try {
            const url = "http://localhost:3002/deleteOneQuiz"
            await axios.post(url, {
                token: myToken,
                id: id
            })
        } catch {

        }

    }
    useEffect(() => {
        fetchUserdata();
        fetchMyquizIntoData();
    }, []);
    return (
        <div className="w-screen h-screen">
            <div className="flex w-full h-2/5">
                <div className="w-2/5 flex flex-col items-center py-5 ">
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
                <div className="h-full w-12 bg-[#DAD9D9]">

                </div>
                <div className="w-3/5 flex flex-col items-center">
                    <div className="text-[60px]"> Таны зэрэглэл </div>
                </div>
            </div>
            <div className="w-full h-12 bg-[#DAD9D9]"></div>
            <div className="w-full h-3/5 flex">
                <div className="w-3/6 h-full flex gap-2 flex-col items-center py-4 b">
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
                        Таны оруулсан бодлогууд
                    </h1>
                    {myquizData?.map((e, index) => (
                        <div className="w-full ">
                            {/* //<button>{index + 1}</button> */}
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
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

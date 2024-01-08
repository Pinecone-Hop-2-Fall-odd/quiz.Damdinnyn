"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

export default function Home() {
  const [namevalue, setNamevalue] = useState("");
  const [passwordvalue, setPasswordvalue] = useState("");
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const [userId, setUserId] = useState();
  const [passwordstatus, setPasswordstatus] = useState(false);
  const [showPasswordStatus, setShowPasswordStatus] = useState(false);

  const createNewAccound = () => {
    router.push("/newacc");
  };
  const login = async () => {
    console.log(namevalue, passwordvalue);
    try {
      await axios
        .post("http://localhost:3002/login", {
          phoneNumber: namevalue,
          password: passwordvalue,
        })
        .then((res) => {
          router.push(`/home`);
          localStorage.setItem(`token`, `${res?.data?.token}`);
        })
        .catch((error) => setPasswordstatus(true));
    } catch (err) {
      console.log(err);
    }
  };
  const showPassword = () => {
    setShowPasswordStatus(!showPasswordStatus);
  };
  useEffect(() => {
    setPasswordstatus(false);
  }, [namevalue, passwordvalue]);
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-blue-600 to-blue-600 flex justify-center items-center gap-10 flex-col">
      <div>
        <img src="math.png" />
      </div>
      <div className="bg-white w-2/6 py-4 rounded-[30px] flex flex-col items-center justify-center gap-6 px-4 max-w-[300px]">
        <input
          placeholder="PhoneNumber"
          onChange={(e) => setNamevalue(e.target.value)}
          value={namevalue}
          className={`bg-white text-black ${
            passwordstatus ? "border-[#F7095E]" : "border-black"
          }   border-[3px] rounded-3xl w-full  h-10 px-3 text-2xl`}
        />
        <div className="flex">
          <input
            placeholder="Password"
            type={`${showPasswordStatus ? "text" : "password"}`}
            onChange={(e) => setPasswordvalue(e.target.value)}
            value={passwordvalue}
            className={` bg-white text-black ${
              passwordstatus ? "border-[#F7095E]" : "border-black"
            } border-[3px] px-3 text-2xl  rounded-3xl w-full h-10 `}
          />
          <Image
            onClick={() => showPassword()}
            className="ml-[-25px]"
            src="eye-slash.svg"
            width={16}
            height={16}
          />
        </div>

        <button
          onClick={() => login()}
          className="bg-gradient-to-r from-blue-500 to-green-500 rounded-3xl px-5 text-xl "
        >
          log in
        </button>
        <button
          onClick={() => createNewAccound()}
          className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl px-5 text-xl "
        >
          Create new accound
        </button>
      </div>
    </div>
  );
}

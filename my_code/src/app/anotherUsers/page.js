"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
export default function Home() {
  const [useralldata, setUseralldata] = useState([]);
  const myToken = localStorage.getItem("token");
  const params = useSearchParams();
  const id = params.get("id");
  const fetchUserdata = async () => {
    await axios
      .get(`http://localhost:3002/anotherUserData/${id}`, {
        headers: { token: myToken },
      })
      .then((res) => setUseralldata(res?.data?.userData));
  };
  const profilePhoto = useralldata?.profile;
  const username = useralldata?.username;
  const mycollection1 = useralldata?.mycollection1;
  const mycollection2 = useralldata?.mycollection2;
  useEffect(() => {
    fetchUserdata();
  }, []);
  return (
    <div className="w-screen h-screen">
      <div className="flex w-full h-2/5">
        <div className="w-2/5 flex flex-col items-center py-5 ">
          <div
            style={{ backgroundImage: `url(${profilePhoto})` }}
            className="rounded-full w-40 h-40 border-[8px] border-black bg-no-repeat bg-center  bg-cover"
          ></div>
          <Image src="camera.svg" height={16} width={16} />
          <div className="text-3xl">{username}</div>
        </div>
        <div className="w-3/5 flex flex-col items-center">
          <div className="text-[60px]"> {username} зэрэглэл </div>
        </div>
      </div>
      <div className="w-full h-12 bg-[#DAD9D9]"></div>
      <div className="w-full h-3/5 flex">
        <div className="w-3/6 h-full flex gap-2 flex-col items-center py-4 b">
          <div className="text-3xl">{username} цуглуулга</div>
          <div
            style={{ backgroundImage: `url(${mycollection1})` }}
            className="g-no-repeat bg-center bg-cover w-5/6 h-3/6 border-4 border-[#DAD9D9] rounded-xl max-w-[400px]"
          >
            <div className="flex w-full flex-row-reverse px-2 py-1 ">
              <Image src="bars.svg" width={12} height={12} />
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${mycollection2})` }}
            className="g-no-repeat bg-center bg-cover w-5/6 h-3/6 border-4 border-[#DAD9D9] rounded-xl max-w-[400px]"
          >
            <div className="flex w-full flex-row-reverse px-2 py-1">
              <Image src="bars.svg" width={12} height={12} />
            </div>
          </div>
        </div>
        <div className="h-full w-12 bg-[#DAD9D9]"></div>
        <div className="w-3/6 flex flex-col items-center py-4">
          <h1 className="text-black text-3xl">{username} оруулсан бодлогууд</h1>

          {/* <Myquiz /> */}
        </div>
      </div>
    </div>
  );
}

"use client"
import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import axios from "axios"
export default function Home() {
    const params = useSearchParams();
    const imageInput = useRef(null);
    const userId = params.get("id")
    const [useralldata, setUseralldata] = useState()
    const [image, setImage] = useState("")
    const fetchUserdata = async () => {
        await axios.post("http://localhost:8080/userdata", {
            userId: userId
        }).then((res) => setUseralldata(res?.data?.userData))
    }
    console.log("image", image)
    const name = useralldata?.username
    const filechosen = async (file) => {
        const FR = new FileReader();
        FR.addEventListener("load", function (evt) {
            setImage(evt.target.result)
        });
        FR.readAsDataURL(file);
        await axios.put("http://localhost:8080/users", {
            _id: userId,
            profile: image
        })
    }
    useEffect(() => {
        fetchUserdata();
    }, [])
    return (
        <div className="w-screen h-screen">
            <div className="flex w-full h-2/5">
                <div className="w-2/5 flex flex-col items-center py-5 ">
                    <div style={{ backgroundImage: `url(${image})` }} className="rounded-full w-80 h-80 border-[8px] border-black bg-no-repeat  bg-cover">
                        <input ref={imageInput} style={{ visibility: 'hidden' }} type="file" onChange={(e) => {
                            filechosen(e.target.files[0])
                        }} />
                    </div>
                    <Image onClick={() => {
                        if (imageInput.current) {
                            imageInput.current.click()
                        }
                    }} src="camera.svg" height={16} width={16} />
                    <div className="text-3xl">{name}</div>
                </div>
                <div className="w-3/5 flex flex-col items-center">
                    <div className="text-[60px]"> Таны зэрэглэл </div>
                </div>
            </div>
            <div className="w-full h-12 bg-[#DAD9D9]"></div>
            <div className="w-full">
                <div className="w-3/6 flex flex-col items-center py-4">
                    <div className="text-3xl">Таны цуглуулга</div>
                </div>
                <div className="w-3/6"></div>
            </div>
        </div>
    )
}
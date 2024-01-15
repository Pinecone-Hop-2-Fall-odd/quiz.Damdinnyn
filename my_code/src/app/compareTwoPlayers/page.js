"use client"
import { useState, useEffect } from "react"
import { BACK_END_URL } from "@/back-url";

export default function Compare() {
    const [roomData, setRoomData] = useState(null)
    const [winner, setWinner] = useState("")
    const playersInfo = async () => {
        const url = `${BACK_END_URL}/getProblemOfRoom`;
        if (token)
            await axios.post(url, {
                roomId: roomId,
            }, { headers: { token } }).then((res) => {
                // setId(res?.data.id)
                setRoomData(res?.data.roomData);
            });
    };
    const Aname = roomData?.Aname
    const Aprofile = roomData?.Aprofile
    const Bname = roomData?.Bname
    const Bprofile = roomData?.Bprofile
    useEffect(() => {
        if (roomData) {
            if (roomData.Awin == true) {

            } else if (roomData.Bwin == true) {

            }

        }
    }, [roomData]);
    useEffect(() => {
        playersInfo()
    }, [])

    return (
        <div className="h-screen w-screen">
            <div>WINNER </div>
            <div className="h-5/6 w-full bg-gradient-to-r from-blue-600 to-blue-600 flex">
                <div>
                    <div>A player</div>
                    <div>{Aname}</div>
                    <div style={{ backgroundImage: `url(${Aprofile})` }}
                        className="rounded-full w-80 h-80 border-[8px] border-black bg-no-repeat bg-center  bg-cover"></div>
                </div>
                <div>
                    <div>B player</div>
                    <div>{Bname}</div>
                    <div style={{ backgroundImage: `url(${Bprofile})` }}
                        className="rounded-full w-80 h-80 border-[8px] border-black bg-no-repeat bg-center  bg-cover"></div>
                </div>
            </div>
        </div>

    )
}
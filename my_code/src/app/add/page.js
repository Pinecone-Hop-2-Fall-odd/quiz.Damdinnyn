export default function Home() {
    return (
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-screen h-screen">
            <div className="text-[90px] flex justify-center h-1/6"> Quiz +</div>
            <div className="h-3/6 w-full flex justify-center items-center" >
                <div className="h-5/6 w-4/6 bg-white rounded-3xl">
                    <div className="text-[40px] w-full flex justify-center">Таны асуулт?</div>
                </div>
                {restartdone ? (<div ref={currentRef} onClickœ className="absolute bg-gradient-to-r from-green-500 text-2xl rounded-xl px-5 py-5">
                    <h1 onClick={() => backtohome()}> -Буцах</h1>
                    <h1>-Дахин эхлэх</h1>
                </div>) : (<button className="absolute px-3 py-1 rounded-2xl bg-gradient-to-r from-green-500 to-yellow-500" >
                    <Image src="bars.svg" height={16} width={16} onClick={() => restart()} />
                </button>)}
            </div>
            <div className="h-2/6 w-full">
                <div className="h-2/6 flex justify-around">
                    <div className="w-2/5 h-2/6 px-4 flex items-center">A.
                        <input className="rounded-xl border-black border-2 w-full" />
                    </div>
                    <div className="w-2/5 h-2/6 px-4 flex items-center">B.
                        <input className="rounded-xl border-black border-2 w-full" />
                    </div>
                </div>
                <div className="h-2/6 flex justify-around">
                    <div className=" w-2/5 h-2/6  px-4 flex items-center">C.
                        <input className="rounded-xl border-black border-2 w-full" />
                    </div>
                    <div className="w-2/5  h-2/6  px-4 flex items-center">D.
                        <input className="rounded-xl border-black border-2 w-full" />
                    </div>
                </div>
                <div className="h-2/6 flex justify-center ">
                    <button className="flex items-center  bg-gradient-to-r from-green-500 to-yellow-500 px-5 text-2xl rounded-3xl h-2/6">Дууссан
                    </button>
                </div>
            </div>


        </div>
    )
}
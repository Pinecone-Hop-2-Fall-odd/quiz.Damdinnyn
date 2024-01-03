import Image from "next/image";
import { useState, useRef } from "react";
export function CreateNewFile() {
  const [handleNewfileStatus, setHandleNewfileStatus] = useState(false);
  const HandleAddFile = () => {
    setHandleNewfileStatus(true);
  };
  return (
    <div className="w-full h-full flex">
      <div className="w-28 h-full border-r-4 border-black flex flex-col">
        <button className="w-full border-b-2 border-solid flex gap-4">
          <h1>Your file </h1>
          <Image
            onClick={() => HandleAddFile()}
            src="file.svg"
            height={16}
            width={16}
          />
        </button>
        <div>
          {handleNewfileStatus ? (
            <input className="w-full h-6 border-2 border-solid mt-[0.5px] rounded-[5px]" />
          ) : (
            ""
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
}

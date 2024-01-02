import Image from "next/image";
export function Profile(props) {
  const { profilePhoto, imageInput, filechosen, name, id } = props;
  return (
    <div className="flex flex-col items-center px-4 py-4">
      <div className="">
        <div
          style={{ backgroundImage: `url(${profilePhoto})` }}
          className="rounded-full w-80 h-80 border-[8px] border-black bg-no-repeat bg-center  bg-cover"
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
        <div className="w-full flex justify-center">
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
        </div>

        <div className="text-3xl w-full flex justify-center">{name}</div>
        <h1 className=" w-full flex justify-center">ID({id})</h1>
      </div>
      <div></div>
    </div>
  );
}

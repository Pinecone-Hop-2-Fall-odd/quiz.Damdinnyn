import Image from "next/image";
export function Profile(props) {
  const {
    profilePhoto,
    imageInput,
    filechosen,
    name,
    id,
    mycollection1,
    mycollection2,
    myCollection,
    myCollection2,
    classicPoint,
    classicHigh,
    Collectionchosen,
    Collectionchosen2,
    rankLevel,
    rankLevelCount,
  } = props;

  return (
    <div>
      <div className="flex h-3/6 items-center px-4 py-4 gap-10">
        <div className="h-[500px] w-84">
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
        <div className="h-[500px] w-full flex flex-col justify-center items-center">
          <div className="w-full h-2/6 text-2xl min-w-[500px]">
            <div className="flex w-full justify-center ">
              <div className="flex gap-4">
                <h1 className="w-40 flex  flex-row-reverse">Classic Score: </h1>
                <div className="flex gap-2">
                  <h1>{classicPoint}</h1>
                  <Image src="star.svg" height={24} width={24} />
                </div>
              </div>
              <div className="flex gap-4">
                <h1 className="w-40 flex  flex-row-reverse">High Score: </h1>
                <div className="flex gap-2">
                  <h1>{classicHigh}</h1>
                  <Image src="star.svg" height={24} width={24} />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-2/6 text-2xl min-w-[500px]">
            <div className="flex w-full justify-center ">
              <div className="flex gap-4">
                <h1 className="w-40 flex  flex-row-reverse">Rank Score: </h1>
                <div className="flex gap-2">
                  <h1>{rankLevel}</h1>
                  <h1>{rankLevelCount}</h1>
                  <Image src="star.svg" height={24} width={24} />
                </div>
              </div>
              <div className="flex gap-4"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full  h-[500px] flex gap-8  justify-center items-center py-4 flex-wrap overflow-y-scroll">
        <div
          style={{ backgroundImage: `url(${mycollection1})` }}
          className="g-no-repeat bg-center bg-cover w-[400px] h-60 border-4 border-[#DAD9D9] rounded-xl max-w-[400px]"
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
          className="g-no-repeat bg-center bg-cover w-[1000px] h-60 border-4 border-[#DAD9D9] rounded-xl max-w-[400px]"
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
        <div
          style={{ backgroundImage: `url(${mycollection2})` }}
          className="g-no-repeat bg-center bg-cover w-[1000px] h-60 border-4 border-[#DAD9D9] rounded-xl max-w-[400px]"
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
        <div
          style={{ backgroundImage: `url(${mycollection2})` }}
          className="g-no-repeat bg-center bg-cover w-[1000px] h-60 border-4 border-[#DAD9D9] rounded-xl max-w-[400px]"
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
    </div>
  );
}

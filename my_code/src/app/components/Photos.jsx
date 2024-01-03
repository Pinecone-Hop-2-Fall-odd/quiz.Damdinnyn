import Image from "next/image";
export function Photos(props) {
  const { mycollection1, mycollection2, myCollection, myCollection2 } = props;
  return (
    <div className="w-3/6 h-full flex gap-2  items-center  ">
      <div className="w-full  h-full flex gap-2  items-center py-4 flex-col">
        <div className="text-3xl">Photos</div>
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
      </div>
      <div className="h-full w-8 bg-[#DAD9D9]"></div>
      <div></div>
    </div>
  );
}

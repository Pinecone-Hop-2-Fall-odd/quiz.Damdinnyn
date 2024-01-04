{
  /* <div className="flex w-full h-2/5">
        <div className="w-2/5 flex flex-col items-center py-2">
          <div className="w-full flex flex-row-reverse px-2">
            <Image
              onClick={() => settingsStatusDone()}
              src="gear.svg"
              height={24}
              width={24}
            />
          </div>
          {settingsStatus ? (
            <div className=" flex flex-col items-center justify-center">
              <div></div>
              <div></div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
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
          )}
        </div>
        <div className="h-full w-12 bg-[#DAD9D9]"></div>
        <div className="w-3/5 flex flex-col items-center">
          <div className="text-[60px]"> Таны зэрэглэл </div>
        </div>
      </div>
      <div className="w-full h-12 bg-[#DAD9D9]"></div>
      <div className="w-full h-3/5 flex">
        <div className="w-3/6 h-full flex gap-2 flex-col items-center py-4 ">
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
            Таны оруулсан зүйлс
          </h1>
          {myquizData?.map((e, index) => (
            <div className="w-full ">
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
                fetchMyquizIntoData={fetchMyquizIntoData}
              />
            </div>
          ))}
        </div>
      </div> */
}

//const [myFriends, setMyFriends] = useState([]);
// const MyUserId = async () => {
//     const url = "http://localhost:3002/token"
//     await axios.get(url, { headers: { "token": mytoken } }).then((res) => console.log("sss", res?.data))
// }

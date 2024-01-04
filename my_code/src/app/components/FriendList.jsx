import Image from "next/image";
export function FriendsList({
  searchUserData,
  reqFriend,
  searchPerson,
  usersInfo,
  allowReq,
  refuse,
}) {
  if (searchPerson) {
    return (
      <div className="w-full  text-black px-4 py-4 flex flex-col snap-x gap-4">
        {usersInfo?.map((e) => (
          <div className="text-black w-full flex gap-4  ">
            <div
              style={{ backgroundImage: `url(${e.profile})` }}
              className="bg-center bg-cover h-32 w-40 border-black border-8"
            ></div>
            <div className="flex gap-6">
              <h1 className="text-2xl text-black">{e.username}</h1>
              <h1 className="flex gap-4 mt-1">
                <Image
                  onClick={() => refuse(e._id)}
                  src="x.svg"
                  height={16}
                  width={12}
                  className="border-black border-2 rounded-[5px] w-8 h-6 bg-[red]"
                />
                <Image
                  onClick={() => allowReq(e._id)}
                  src="check.svg"
                  height={16}
                  width={16}
                  className="border-black border-2 rounded-[5px] w-8 h-6 bg-[green] "
                />
              </h1>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="w-full h-full text-black ">
      <div>
        {searchUserData.map((e) => (
          <div className="h-48 w-full flex px-3 py-3">
            <div
              style={{ backgroundImage: `url(${e.profile})` }}
              className=" w-3/6 h-full border-[8px] min-w-[200px] border-black bg-no-repeat bg-center  bg-cover "
            ></div>
            <div className="text-2xl px-3 flex items-center h-3/6 gap-4 text-black">
              {e.username}
              <button className="border-black border-2 px-1 py-1">
                <Image
                  onClick={() => reqFriend(e._id)}
                  src="user-plus.svg"
                  height={24}
                  width={24}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

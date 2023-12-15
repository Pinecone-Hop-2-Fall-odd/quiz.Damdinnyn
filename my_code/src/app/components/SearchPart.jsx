import Image from "next/image";
export function SearchPart(props) {
  const {
    friendsstatus,
    friendsstatusdone,
    currentRef,
    search,
    setSearch,
    searchUser,
    searchUserData,
    setSearchUserData,
    reqFriend,
    reqAllow,
    seeFriendsReq,
    searchPerson,
  } = props;

  if (!friendsstatus)
    return (
      <div
        className={`absolute ${
          friendsstatus
            ? `h-full w-[100vw] fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] z-10`
            : "h-2/5 w-3/6"
        }  px-4 py-6 `}
      >
        <div
          onClick={() => friendsstatusdone()}
          className="h-2/5 w-4/6 bg-white rounded-xl"
        ></div>
      </div>
    );

  return (
    <div
      className={`absolute ${
        friendsstatus
          ? `h-full w-[100vw] fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] z-10`
          : "h-2/5 w-3/6"
      }  px-4 py-6 `}
    >
      <div
        // style={{ background: " rgba(0, 0, 0, 0.2)" }}
        ref={currentRef}
        className=" w-full h-full bg-white rounded-xl min-w-[400px] max-w-[500px]"
        // style="width:100vw height:100vh position:fixed top:0 left:0 "
      >
        <div className="w-full h-[10%] bg-[#DAD9D9] rounded-t-xl flex px-1  items-center gap-8">
          <Image src="friends.svg" height={40} width={40} />
          <input
            className="w-4/6 py-1 px-3 text-black text-2xl"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button onClick={() => searchUser()} className="bg-white px-2 py-1">
            <Image src="search.svg" height={24} width={24} />
          </button>
          <button
            onClick={() => seeFriendsReq()}
            className={`${reqAllow ? "bg-white" : "bg-[red]"}  px-2 py-1`}
          >
            <Image src="bell.svg" height={24} width={24} />
          </button>
        </div>

        <FriendsList
          searchPerson={searchPerson}
          searchUserData={searchUserData}
          reqFriend={reqFriend}
        />
      </div>
    </div>
  );
}

const FriendsList = ({ searchUserData, reqFriend, searchPerson }) => {
  console.log(searchPerson);
  if (searchPerson) {
    return <div className="w-full h-full ">search</div>;
  }

  return (
    <div className="w-full h-full ">
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
  );
};

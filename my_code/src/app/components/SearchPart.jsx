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
  } = props;
  return (
    <div
      className={`absolute w-3/6 ${
        friendsstatus ? `h-full` : "h-2/5"
      }  px-4 py-6`}
    >
      {friendsstatus ? (
        <div ref={currentRef} className=" w-full h-full bg-white rounded-xl">
          <div className="w-full h-[10%] bg-[#DAD9D9] rounded-t-xl flex px-1  items-center gap-8">
            <Image src="friends.svg" height={40} width={40} />
            <input
              className="w-4/6 py-1 px-3"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button onClick={() => searchUser()} className="bg-white px-2 py-1">
              <Image src="search.svg" height={24} width={24} />
            </button>
          </div>
          <div>
            {/* {searchData.lenght > 1 ? (
              <div>{searchData.map((e) => e.username)}</div>
            ) : (
              <div>{searchData.username}</div>
            )} */}
            {/* {JSON.stringify(searchUserData)} */}
            {searchUserData.map((e) => (
              <div>
                <div
                  style={{ backgroundImage: `url(${e.profile})` }}
                  className="rounded-full w-80 h-80 border-[8px] border-black bg-no-repeat bg-center  bg-cover"
                ></div>
                <div>{e.username}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          onClick={() => friendsstatusdone()}
          className="h-2/5 w-4/6 bg-white rounded-xl"
        ></div>
      )}
    </div>
  );
}

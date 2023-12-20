import Image from "next/image";
import { useState } from "react";
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
    usersInfo,
    refuseReq,
    allowReq,
    myClosefrienddone,
    myFriendsData,
    liststatus,
    refuse,
  } = props;
  //console.log("hiii", friensData);
  if (!friendsstatus)
    return (
      <div
        className={`absolute ${
          friendsstatus
            ? `h-full w-[100vw] fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] z-10`
            : "h-96 w-3/6"
        }  px-4 py-6 `}
      >
        <div
          onClick={() => friendsstatusdone()}
          className="h-2/5 w-4/6 bg-white rounded-xl text-black py-2 px-4 flex gap-2 flex-col overflow-y-scroll"
        >
          {myFriendsData?.map((e) => (
            <div className="flex gap-6 ">
              <div
                onClick={() => visitToFriendProfile()}
                style={{ backgroundImage: `url(${e.profile})` }}
                className="h-16 w-16 bg-cover bg-center border-4 border-black "
              ></div>
              <div className="text-[20px]">{e.username}</div>
            </div>
          ))}
        </div>
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
        <div className="flex flex-col h-full">
          {/* <div className="text-black">hhhhh</div> */}
          {liststatus ? (
            <div className="text-black px-4 py-4 flex flex-col gap-5 overflow-y-scroll h-[85%]">
              {myFriendsData?.map((e) => (
                <div className="flex gap-8">
                  <div
                    style={{ backgroundImage: `url(${e.profile})` }}
                    className="h-36 w-2/5 bg-cover bg-center border-8 border-black"
                  ></div>
                  <div>
                    <h1 className="text-2xl">{e.username}</h1>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <FriendsList
              searchPerson={searchPerson}
              searchUserData={searchUserData}
              reqFriend={reqFriend}
              usersInfo={usersInfo}
              allowReq={allowReq}
              refuseReq={refuseReq}
              myClosefrienddone={myClosefrienddone}
              refuse={refuse}
            />
          )}
        </div>
      </div>
    </div>
  );
}
const FriendsList = ({
  searchUserData,
  reqFriend,
  searchPerson,
  usersInfo,
  allowReq,
  refuse,
}) => {
  if (searchPerson) {
    //console.log(usersInfo);
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
};

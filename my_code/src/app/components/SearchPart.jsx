import Image from "next/image";
import { useState } from "react";
import { FriendsList } from "./FriendList";
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
    visitToFriendProfile,
    jumpIntoAnotherUsersAccound,
    searchId,
    withPlayFriends,
    reqstatus,
    setReqstatus,
  } = props;
  //console.log("hiii", friensData);
  if (!friendsstatus)
    return (
      <div
        className={`absolute ${
          friendsstatus
            ? `h-full w-[100vw] fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] z-10`
            : "h-[400px] w-3/6"
        }  px-4 py-6 `}
      >
        <div
          onClick={() => friendsstatusdone()}
          className="h-2/5 w-96 bg-white rounded-xl text-black py-2 px-4 flex gap-2 flex-col overflow-hidden overflow-y-scroll"
        >
          {myFriendsData?.map((e) => (
            <div className="flex gap-6 ">
              <div
                style={{ backgroundImage: `url(${e.profile})` }}
                className="h-24 w-24 bg-cover bg-center border-4 border-black "
              ></div>
              <div className="text-[20px]">{e.username}</div>
            </div>
          ))}
        </div>
      </div>
    );
  return (
    <div
      className={` ${
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
        <div className="w-full h-[10%] bg-[#DAD9D9] rounded-t-xl flex px-1  items-center gap-4">
          <Image src="friends.svg" height={40} width={40} />
          <input
            className="w-4/6 py-1 px-3 text-black text-2xl"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button
            onClick={() => searchUser()}
            className="bg-white px-2 py-1 h-8"
          >
            <Image src="search.svg" height={24} width={24} />
          </button>
          <button
            onClick={() => searchId()}
            className="bg-white px-2  text-2xl"
          >
            ID
          </button>
          <button
            onClick={() => seeFriendsReq()}
            className={`${reqAllow ? "bg-white" : "bg-[red]"}  px-2 py-1 h-8`}
          >
            <Image src="bell.svg" height={24} width={24} />
          </button>
        </div>
        <div className="flex flex-col h-full">
          {liststatus ? (
            <div className="text-black px-4 py-4 flex flex-col gap-5 overflow-y-scroll h-[85%]">
              {myFriendsData?.map((e) => (
                <div className="flex gap-8">
                  <div
                    onClick={() => jumpIntoAnotherUsersAccound(e._id)}
                    style={{ backgroundImage: `url(${e.profile})` }}
                    className="h-36 w-2/5 bg-cover bg-center border-8 border-black"
                  ></div>
                  <div>
                    <div className="text-2xl mt-4 flex gap-4 items-center">
                      <h1 className="w-32 h-12 flex flex-wrap">{e.username}</h1>
                      <button className="h-8 w-8 border-black bg-[green]  border-2 flex justify-center items-center">
                        <Image
                          onClick={() => withPlayFriends(e._id)}
                          src="plus.svg"
                          height={24}
                          width={24}
                        />
                      </button>
                    </div>
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
              reqstatus={reqstatus}
              setReqstatus={setReqstatus}
            />
          )}
        </div>
      </div>
    </div>
  );
}

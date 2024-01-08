export function InviteFriend(props) {
  const { username, profile } = props;
  return (
    <div className=" w-4/6 flex flex-col items-center">
      <div className="flex gap-4">
        <div
          style={{ backgroundImage: `url(${profile})` }}
          className="w-20 h-20 bg-cover bg-center border-4 border-black"
        ></div>
        <div>
          <div>{username}</div>
          <button className="bg-green-500 px-2 rounded-xl">Play</button>
        </div>
      </div>
    </div>
  );
}

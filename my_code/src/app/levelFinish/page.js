"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
export default function Home() {
  const router = useRouter();
  const params = useSearchParams();
  const quizId = params.get("quizId");
  const id = Number(quizId) + 1;
  const back = () => {
    router.push(`./level`);
  };
  const nextLevel = () => {
    router.push(`hardproblem?quizId=${id}`);
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-blue-600 to-blue-600 flex justify-center items-center">
      <div className="bg-white h-4/6 w-4/6 border-[10px] border-black rounded-3xl">
        <div className="h-4/6 flex justify-center items-center">
          <img src="care.png" className="h-full w-full" />
        </div>
        <div className="h-2/6 flex gap-10 justify-center items-center">
          <div
            onClick={() => back()}
            className="bg-gradient-to-r from-green-500 to-yellow-500 text-2xl px-3 py-1 rounded-2xl border-4 border-black"
          >
            Back
          </div>
          <div
            onClick={() => nextLevel()}
            className="bg-gradient-to-r from-green-500 to-yellow-500 text-2xl px-3 py-1 rounded-2xl border-4 border-black"
          >
            Next Level
          </div>
        </div>
      </div>
    </div>
  );
}

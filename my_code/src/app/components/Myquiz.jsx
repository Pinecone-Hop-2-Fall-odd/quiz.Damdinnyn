"use client";
import { useState } from "react";
export function Myquiz(props) {
  const { question } = props;
  //alert(question);
  return (
    <div className="w-full flex justify-center">
      <div className="text-black w-4/6 border-black border-4 rounded-xl flex justify-center">
        {question}
      </div>
      <div></div>
    </div>
  );
}

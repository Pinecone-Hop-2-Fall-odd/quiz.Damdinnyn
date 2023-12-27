"use client";
import { useState, useContext } from "react";
import { UserDataContext } from "../layout";
import Image from "next/image";
import axios from "axios";

export function Myquiz(props) {
  const {
    question,
    a_answer,
    b_answer,
    c_answer,
    d_answer,
    DeleteQuiz,
    _id,
    index,
    correctAnswer,
  } = props;
  const { token } = useContext(UserDataContext);
  const [showAnswersStatus, setShowAnswersStatus] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [inputA_answer, setInputA_answer] = useState(a_answer);
  const [inputB_answer, setInputB_answer] = useState(b_answer);
  const [inputC_answer, setInputC_answer] = useState(c_answer);
  const [inputD_answer, setInputD_answer] = useState(d_answer);
  const [inputQuestion, setInputQuestion] = useState(question);
  const showAnswers = () => {
    setShowAnswersStatus(!showAnswersStatus);
  };
  const editQuiz = () => {
    setEditStatus(!editStatus);
  };
  const doneEditQuiz = async (id) => {
    try {
      const url = "http://localhost:3002/editQuiz";
      await axios.post(
        url,
        {
          id: id,
          question: inputQuestion,
          correctAnswer: correctAnswer,
          a_answer: inputA_answer,
          b_answer: inputB_answer,
          c_answer: inputC_answer,
          d_answer: inputD_answer,
        },
        {
          headers: { token: token },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full flex justify-center text-black">
      {showAnswersStatus ? (
        <div className="w-full flex flex-col items-center gap-2">
          {editStatus ? (
            <div className="w-full flex flex-col items-center gap-2">
              <div className="w-full flex justify-center">
                <input
                  onChange={(e) => setInputQuestion(e.target.value)}
                  value={inputQuestion}
                  className="text-black w-4/6 border-black border-4 rounded-xl flex justify-center px-2"
                />
                <div className="flex gap-4 ">
                  <Image
                    onClick={() => doneEditQuiz(_id)}
                    src="edit.svg"
                    height={20}
                    width={20}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col items-center gap-2 text-black">
                <div className="flex gap-4 w-full justify-center">
                  <input
                    onChange={(e) => setInputA_answer(e.target.value)}
                    value={inputA_answer}
                    className="w-2/6 border-black border-4 text-black  rounded-xl px-2"
                  />
                  <input
                    onChange={(e) => setInputB_answer(e.target.value)}
                    value={inputB_answer}
                    className="w-2/6 border-black border-4  rounded-xl px-2"
                  />
                </div>
                <div className="flex gap-4 w-full justify-center ">
                  <input
                    onChange={(e) => setInputC_answer(e.target.value)}
                    value={inputC_answer}
                    className="w-2/6 border-black border-4  rounded-xl px-2"
                  />
                  <input
                    onChange={(e) => setInputD_answer(e.target.value)}
                    value={inputD_answer}
                    className="w-2/6 border-black border-4  rounded-xl px-2"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center gap-2">
              <div className="w-full flex justify-center">
                <div
                  onClick={() => showAnswers()}
                  className="text-black w-4/6 border-black border-4 rounded-xl flex justify-center"
                >
                  {question}
                </div>
                <div className="flex gap-4 ">
                  <Image
                    onClick={() => DeleteQuiz(_id)}
                    src="trash.svg"
                    height={20}
                    width={20}
                  />
                  <Image
                    onClick={() => editQuiz()}
                    src="edit.svg"
                    height={20}
                    width={20}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col items-center gap-2">
                <div className="flex gap-4 w-full justify-center">
                  <div className="w-2/6 border-black border-4 rounded-xl px-2s">
                    A. {a_answer}
                  </div>
                  <div className="w-2/6 border-black border-4  rounded-xl px-2">
                    B.{b_answer}
                  </div>
                </div>
                <div className="flex gap-4 w-full justify-center ">
                  <div className="w-2/6 border-black border-4  rounded-xl px-2">
                    C.{c_answer}
                  </div>
                  <div className="w-2/6 border-black border-4  rounded-xl px-2">
                    D.{d_answer}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={() => showAnswers()}
          className="text-black w-4/6 border-black border-4 rounded-xl flex px-2 py-1"
        >
          <button className="w-8 h-8 border-2 border-black rounded-full">
            {index + 1}
          </button>
          <h1 className="w-5/6 flex justify-center text-wrap"> {question}</h1>
        </div>
      )}
      <div></div>
    </div>
  );
}

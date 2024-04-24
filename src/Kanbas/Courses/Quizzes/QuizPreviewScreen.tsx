import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FaExclamationCircle, FaPencilAlt } from "react-icons/fa";
import { findQuestionsForQuiz } from "./Questions/client";
import { findQuizzesForCourse } from "./client";
import { Box, Grid } from "@mui/material";
export default function QuizPreviewScreen() {
    const { pathname } = useLocation();
    const locationQuizId = pathname.split('/')[5];
    console.log(locationQuizId);
    const { courseId } = useParams();
    const [quiz, setQuiz] = useState<any | null>(null);
    const [question, setQuestion] = useState<any | null>(null);
    const [questionList, setQuestionList] = useState<any | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<{
        [key: string]: string;
    }>({});

    // populate question list for the specified quiz id
    useEffect(() => {
        findQuestionsForQuiz(locationQuizId)
            .then((questionList) => {
                if (questionList.length > 0) {
                    setQuestionList(questionList);
                    setQuestion(questionList[0]);
                } else {
                    setQuestionList([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching quiz questions:", error);
            });
    }, [locationQuizId]);

    // populate the quiz list for the specified course id
    useEffect(() => {
        findQuizzesForCourse(courseId)
            .then((quizList) => {
                setQuiz(quizList.find((quiz: any) => quiz._id === locationQuizId));
            })
            .catch((error) => {
                console.error("Error fetching quizzes:", error);
            });
    }, [locationQuizId]);

    console.log("Current question", question);
    console.log("All questions for this quiz", questionList);

    // get the next question when the user clicks next
    const handleNextQuestion = () => {
        if (questionList.length === 0) {
            console.error("There are no questions in the list");
            return;
        }
        const questionIdx = questionList.findIndex((q: any) => q._id === question._id);

        if (questionIdx >= 0 && questionIdx < questionList.length - 1) {
            setQuestion(questionList[questionIdx + 1]);
        }
    };

    const handlePreviousQuestion = () => {
        const questionIdx = questionList.findIndex((q: any) => q._id === question._id);
        if (questionIdx <= questionList.length - 1 && questionIdx > 0) {
            setQuestion(questionList[questionIdx - 1]);
        }
    };

    const changeAnswerChoice = (questionId: string, option: string) => {
        setSelectedOptions((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            [questionId]: option,
        }));
    };

    const handleSubmitQuiz = () => {
        const currentIndex = 0;
        setQuestion(questionList[currentIndex]);
    };

    return (
        <>
            <h2>{quiz?.title}</h2>
            <h5 className="bg-danger bg-gradient p-2 rounded" style={{ color: "white", width: "550px" }}>
                <FaExclamationCircle />&nbsp;This is a preview of the published version of the quiz.
            </h5>
            <h6>Started: Nov 29 at 8:19am</h6>
            <h2>Quiz Instructions</h2>
            <hr />
            <Grid item xs={12}>
                <Box
                    sx={{
                        backgroundColor: "lightgray",
                        border: "solid",
                        borderColor: "lightgray",
                        borderRadius: "18px",
                        padding: "8px",
                    }}
                >
                    <div>
                        <h5 style={{ color: "black" }}>
                            {question?.title}
                            <span className="float-end">1 pts</span>
                        </h5>
                        <hr />
                        <h6>{question?.content}</h6>

                        {(question?.questionType === "Multiple Choice" ||
                            question?.questionType === "True/False") &&
                            question?.options.map((option: string, index: number) => (
                                <div key={index}>
                                    <input
                                        type="radio"
                                        id={`option-${question._id}-${index}`}
                                        name="answer"
                                        checked={option === selectedOptions[question._id]}
                                        onChange={() => changeAnswerChoice(question._id, option)}
                                    />
                                    <label htmlFor={`option-${question._id}-${index}`}>
                                        {option}
                                    </label>
                                    <br />
                                    <hr />
                                </div>
                            ))}

                        {question?.questionType === "Fill In The Blank" &&
                            [...Array(question?.numOptions)].map((_, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        id={`box${index + 1}`}
                                        name="answer"
                                        value={selectedOptions[question._id] || ""}
                                        onChange={(e) =>
                                            changeAnswerChoice(question._id, e.target.value)
                                        }
                                    />
                                    <label htmlFor={`box${index + 1}`}></label>
                                    <br />
                                    <hr />
                                </div>
                            ))}
                    </div>
                </Box>
            </Grid>
            <Grid item xs={12} sx={{ paddingBottom: "20px" }}
            >
                <Box sx={{ paddingTop: "5px", paddingBottom: "10px" }}>
                    <button style={{ justifyContent: "left" }} className="btn btn-secondary" onClick={handlePreviousQuestion}>
                        Back
                    </button>
                    <button className="btn btn-secondary float-end" onClick={handleNextQuestion}>
                        Next
                    </button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{
                    backgroundColor: "lightgray",
                    border: "solid",
                    borderColor: "lightgray",
                    borderRadius: "18px",
                    padding: "8px",
                    height: "57px",
                }}>
                    <label>Quiz saved at 8:19am</label>
                    <button
                        style={{ marginRight: "10px" }}
                        className="btn btn-light float-end"
                        onClick={handleSubmitQuiz}
                    >
                        Submit Quiz
                    </button>
                </Box>
            </Grid>
            <br/>
            <Grid item xs={12}>
                <Box sx={{ 
                    backgroundColor: "lightgray",
                    border: "solid",
                    borderColor: "lightgray",
                    borderRadius: "18px",
                    padding: "8px",}}>
                        <FaPencilAlt />&nbsp; Keep Editing This Quiz
                    </Box>
            </Grid>
            <h4>Questions</h4>
            {questionList && questionList.length > 0 ? (
                <ul>
                    {questionList.map((q: any, index: any) => (
                        <li style={{color: "red"}} key={q._id}>
                            {`Question ${index + 1}`}
                        </li>
                    ))}
                </ul>
            ) : null}
        </>
    );
}


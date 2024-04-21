import React, { useEffect } from "react";
import "./index.css";
import {
    FaEllipsisV,
    FaTimesCircle,
    FaCheck,
    FaPencilAlt,
} from "react-icons/fa";
import { useParams, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    setQuizzes,
    publishQuiz
} from "./reducer";
import { KanbasState } from "../../store";
import * as client from "./client";

export default function QuizScreenList() {
    const { pathname } = useLocation();
    const location = pathname.split('/').pop();
    const { courseId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        client.findQuizzesForCourse(courseId)
            .then((quizzes) =>
                dispatch(setQuizzes(quizzes))
            );
    }, [courseId]);

    const quizzesList = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);
    console.log("QuizzesList here", quizzesList);
    const quiz = quizzesList.find((quiz) => quiz._id === location);
    console.log("Quiz here", quiz);

    const handlePublish = (quizId: any) => {
        client.publishQuiz(quizId).then((status) => {
            dispatch(publishQuiz(quizId));
        });
        client.findQuizzesForCourse(courseId).then((quizzes) => dispatch(setQuizzes(quizzes)));
    };

    return (
        <>
            <div className="float-end">
                {quiz.published ? (<button className="btn btn-danger" onClick={() => handlePublish(location)}>
                    <FaTimesCircle /> Unpublish
                </button>) : (<button type="button" className="btn btn-success" onClick={() => handlePublish(location)}>
                    <FaCheck /> Publish
                </button>)}&nbsp;
                <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Preview`} style={{ textDecoration: "none" }}>
                    <button className="btn btn-light">
                        Preview
                    </button>&nbsp;
                </Link>
                <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Edit/Details`} style={{ textDecoration: "none" }}>
                    <button className="btn btn-light">
                        <FaPencilAlt /> Edit
                    </button>&nbsp;
                </Link>
                <button className="btn btn-light">
                    <FaEllipsisV />
                </button>
            </div>
            <div>
                <h1>{quiz.title}</h1><br />
                <ul className="list-group">
                    <li style={{ fontSize: "18px" }}> <strong>Quiz Type</strong> {quiz.quizType}</li>
                    <li style={{ fontSize: "18px" }}> <strong>Points</strong> {quiz.points}</li>
                    <li style={{ fontSize: "18px" }}> <strong>Assignment Group</strong> {quiz.group}</li>
                    <li style={{ fontSize: "18px" }}> <strong>Shuffle Answers</strong> {quiz.shuffled ? "Yes" : "No"}</li>
                    <li style={{ fontSize: "18px" }}> <strong>Time Limit</strong> {quiz.timeLimit}</li>
                    <li style={{ fontSize: "18px" }}> <strong>Multiple Attempts</strong> {quiz.multipleAttempts ? "Yes" : "No"}</li>
                    <li style={{ fontSize: "18px" }}> <strong>View Responses</strong> {quiz.viewResponses}</li>
                    <li style={{ fontSize: "18px" }}> <strong>Show Correct Answers</strong> {quiz.showCorrect ? "Yes" : "No"}</li>
                    <li style={{ fontSize: "18px" }}> <strong>One Question at a Time</strong> {quiz.oneQuestionAtATime ? "Yes" : "No"}</li>
                    <li style={{ fontSize: "18px" }}> <strong>Require Respondus LockDown Browser</strong> {quiz.requireRespondusLockdownBrowser ? "Yes" : "No"}</li>
                    <li style={{ fontSize: "18px" }}> <strong>Required to View Quiz Results</strong> {quiz.requireViewQuizResults ? "Yes" : "No"}</li>
                    <li style={{ fontSize: "18px" }}> <strong>Webcam Required</strong> {quiz.webcamRequired ? "Yes" : "No"}</li>
                    <li style={{ fontSize: "18px" }}> <strong>Lock Questions After Answering</strong> {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</li>
                </ul>
            </div>
            <div style={{ justifyContent: "space-evenly", marginTop: "15px", display: "flex" }} >
                <div>
                    <strong>Due</strong>
                </div>
                <div>
                    <strong>For</strong>
                </div>
                <div>
                    <strong>Available From</strong>
                </div>
                <div>
                    <strong>Until</strong>
                </div>
            </div>
            <hr />
            <div style={{ justifyContent: "space-evenly", display: "flex" }}>
                <div>{new Date(quiz.dueDate).toLocaleString()}</div>
                <div>{quiz.for}</div>
                <div>{new Date(quiz.availableDate).toLocaleString()}</div>
                <div>{new Date(quiz.untilDate).toLocaleString()}</div>
            </div>
            <hr />

        </>
    );
}
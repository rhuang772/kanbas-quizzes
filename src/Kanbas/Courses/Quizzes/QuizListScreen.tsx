import React, { useState, useEffect, } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlus, FaSpaceShuttle, FaTimesCircle, FaCheck, FaPencilAlt } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz, deleteQuiz, updateQuiz, setQuizzes, publishQuiz } from "./reducer";
import { KanbasState } from "../../store";
import * as client from "./client"
export default function QuizScreenList() {
    const { courseId } = useParams();
    const [openPopupId, setOpenPopupId] = useState("");
    useEffect(() => {
        client.findQuizzesForCourse(courseId)
            .then((quizzes) =>
                dispatch(setQuizzes(quizzes))
            );
    }, [courseId]);

    const quizzesList = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);
    const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
    const dispatch = useDispatch();

    const handleAddQuiz = () => {
        client.createQuiz(courseId, quiz).then((courseId) => {
            dispatch(addQuiz(quiz));
        });
    };

    const handleDeleteQuiz = (quizId: string) => {
        client.deleteQuiz(quizId).then((status) => {
          dispatch(deleteQuiz(quizId));
        });
    };

    const handleUpdateQuiz = async () => {
        window.location.href = `/Kanbas/Courses/${courseId}/Quizzes/${quiz?._id}/Edit/Details`;
      };

    const handlePublish = (quizId: string) => {
        client.publishQuiz(quizId).then((status) => {
            dispatch(publishQuiz(quizId));
        });
        client.findQuizzesForCourse(courseId).then((quizzes) => dispatch(setQuizzes(quizzes)));
    };

    const handleOpenPopup = (quizId: any) => {
        setOpenPopupId(quizId === openPopupId ? null : quizId);
    };

    const getAvailability = (quiz: any) => {
        const currentDate = new Date()
        const availableDate = new Date(quiz.availableDate);
        const untilDate = new Date(quiz.untilDate);

        if (currentDate > untilDate) {
            return "Closed";
        } else if (currentDate >= availableDate && currentDate <= untilDate) {
            return "Available";
        } else if (currentDate < availableDate) {
            return `Not available until ${new Date(quiz.availableDate).toLocaleString()}`;
        }

    };

    return (
        <>
            <div className="input-group">
                <input className="form-control" placeholder="Search for Quiz" style={{ width: 100 }}></input>
                <button onClick={handleAddQuiz} className="btn btn-danger" type="button">
                    <FaPlus />&nbsp;Quiz
                </button>
                <button className="btn btn-light" type="button">
                    <FaEllipsisV />
                </button>
            </div>
            <hr />
            <ul className="list-group wd-modules">
                <li className="list-group-item">
                    <div>
                        <FaEllipsisV className="me-2" /> <label>Assignment Quizzes</label>
                    </div>
                    <ul className="list-group">
                        {quizzesList.map((quiz) => (
                            <li className="list-group-item">
                                <FaSpaceShuttle className="text-success" />&nbsp;
                                <Link style={{ color: "black", textDecoration: "none", fontSize: "17px" }} to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}>
                                    {quiz.title}
                                    <br />
                                    <span style={{ paddingLeft: "25px", color: "gray", fontSize: "14px" }}>
                                        {getAvailability(quiz)} |&nbsp;
                                    </span>
                                    <span style={{ color: "gray", fontSize: "14px" }}>
                                        Due at {new Date(quiz.untilDate).toLocaleString()} | {quiz.points} pts | 20 Questions
                                    </span>
                                </Link>&nbsp;

                                {openPopupId === quiz._id && (
                                    <>
                                    {quiz.published? ( <button className="btn btn-danger" onClick={() => handlePublish(quiz._id)}>
                                            <FaTimesCircle/> Unpublish
                                        </button>) : ( <button className="btn btn-success" onClick={() => handlePublish(quiz._id)}>
                                            <FaCheck/> Publish
                                        </button>)}&nbsp;
                                        <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz?._id}/Preview`}>
                                            <button className="btn btn-secondary">
                                                Preview
                                            </button>&nbsp;
                                        </Link>
                                        <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz?._id}/Edit/Details`}>
                                            <button className="btn btn-secondary">
                                                <FaPencilAlt/> Edit
                                            </button>&nbsp;
                                        </Link>
                                        <button className="btn btn-danger" onClick={() => handleDeleteQuiz(quiz._id)}>
                                            Delete
                                        </button>
                                    </>
                                )}
                                <span className="float-end">
                                    {quiz.published ? (<FaCheckCircle className="text-success" />) : (<FaTimesCircle className="text-danger" />)}
                                    <div onClick={() => handleOpenPopup(quiz._id)} className="ms-1">
                                        <FaEllipsisV />
                                    </div>
                                </span>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </>
    );
}
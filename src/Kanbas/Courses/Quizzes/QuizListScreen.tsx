import React, { useState, useEffect } from "react";
import "./index.css";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaPlus, FaAngleDoubleRight, FaSpaceShuttle} from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz, deleteQuiz, updateQuiz, setQuizzes, publishQuiz } from "./reducer";
import { KanbasState } from "../../store";
import * as client from "./client"
export default function QuizScreenList() {
    const { courseId } = useParams();
    useEffect(() => {
        client.findQuizzesForCourse(courseId)
            .then((quizzes) =>
                dispatch(setQuizzes(quizzes))
            );
    }, [courseId]);

    const quizzesList = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);
    const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
    const dispatch = useDispatch();

    // const modulesList = modules.filter((module) => module.course === courseId);
    // const [selectedModule, setSelectedModule] = useState(modulesList[0]);

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
        const status = await client.updateQuiz(quiz);
        dispatch(updateQuiz(quiz));
    };

    const handlePublish = (quizId: string) => {
        client.publishQuiz(quizId).then((status) => {
            dispatch(publishQuiz(quizId));
        });
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
                                <FaSpaceShuttle className="me-2"/>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </>

    );
}
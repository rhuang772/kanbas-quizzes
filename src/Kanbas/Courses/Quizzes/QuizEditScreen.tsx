import React, { useState } from "react";
import { FaEllipsisV, FaTimesCircle, FaCheck } from "react-icons/fa";
import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import { findQuizzesForCourse } from "./client";
import { Link } from "react-router-dom";
import {
  setQuizzes,
  updateQuiz,
  publishQuiz,
} from "./reducer";
import * as client from "./client";
import QuizEditorNav from "./QuizEditorNav";

const QuizEditor = () => {
  const { pathname } = useLocation();
  const location = pathname.split('/')[5];
  console.log("quiz location id: ", location);
  const { courseId } = useParams();
  useEffect(() => {
    findQuizzesForCourse(courseId).then((quizzes) =>
      dispatch(setQuizzes(quizzes))
    );
  }, [courseId]);

  const quizList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );

  const [quiz, setQuiz] = useState(
    quizList.find((quiz) => quiz._id === location)
  );

  const dispatch = useDispatch();
  const formattedDueDate = quiz?.dueDate ? quiz?.dueDate.split("T")[0] : "";
  const formattedAvailableDate = quiz?.availableDate ? quiz?.availableDate.split("T")[0] : "";
  const formattedUntilDate = quiz?.untilDate ? quiz?.untilDate.split("T")[0] : "";

  const handleSaveChanges = async () => {
    const status = await client.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };

  const handlePublish = (quizId: any) => {
    client.publishQuiz(quizId).then((status) => {
      dispatch(publishQuiz(quizId));
    });
    findQuizzesForCourse(courseId).then((quizzes) =>
      dispatch(setQuizzes(quizzes))
    );
  };

  const [timeLimitEnabled, setTimeLimitEnabled] = useState(quiz?.timeLimitBool || false);

  // handler for time limit toggler
  const toggleTimeLimit = (e: any) => {
    setTimeLimitEnabled(e.target.checked);
    setQuiz({
      ...quiz,
      timeLimitBool: e.target.checked,
      timeLimit: e.target.checked ? quiz?.timeLimit : 20,
    });
  };

  // state handler for enabling multiple attempts
  const [multipleAttemptsEnabled, setMultipleAttemptsEnabled] = useState(quiz?.multipleAttempts || false);

  // Handler for the checkbox to enable/disable multiple attempts
  const toggleMultipleAttempts = (e: any) => {
    const attemptsEnabled = e.target.checked;
    setMultipleAttemptsEnabled(attemptsEnabled);
    setQuiz({
      ...quiz,
      multipleAttempts: attemptsEnabled,
      numberOfAttempts: attemptsEnabled ? quiz?.numberOfAttempts : 5,
    });
  };

  const [showCorrectAnswersEnabled, setShowCorrectAnswersEnabled] = useState(
    quiz?.showCorrectAnswers || false
  );

  // Handler for the checkbox to show/hide correct answers
  const toggleShowCorrectAnswers = (e: any) => {
    const showAnswers = e.target.checked;
    setShowCorrectAnswersEnabled(showAnswers);
    setQuiz({ ...quiz, showCorrectAnswers: showAnswers });
  };

  return (
    <div>
      <div className="input-group" style={{ alignItems: "center", justifyContent: "flex-end" }}>
        <h6>Points {quiz?.points}</h6>&nbsp;&nbsp;&nbsp;
        {quiz?.published ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaCheck style={{ color: "green" }} />&nbsp; Published
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaTimesCircle style={{ color: "gray" }} />&nbsp; Not Published&nbsp;
          </div>
        )}
        <button className="btn btn-light" type="button">
          <FaEllipsisV />
        </button>
      </div>
      <hr />
      <QuizEditorNav />
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <form>
            <input
              className="form-control"
              placeholder="Title"
              value={quiz?.title}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            />

            <textarea
              className="form-control mb-3"
              placeholder="Description"
              value={quiz?.description}
              onChange={(e) =>
                setQuiz({ ...quiz, description: e.target.value })
              }
            />

            <div className="mb-3 ">
              <label>Quiz Type: </label>
              <select
                className="form-control"
                value={quiz?.quizType}
                onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
              >
                <option value="Graded Quiz">Graded Quiz</option>
                <option value="Practice Quiz">Practice Quiz</option>
                <option value="Graded Survey">Graded Survey</option>
                <option value="Ungraded Survey">Ungraded Survey</option>
              </select>

              <label>Assignment Group: </label>
              <select
                className="form-control"
                value={quiz?.assignmentGroup}
                onChange={(e) =>
                  setQuiz({ ...quiz, assignmentGroup: e.target.value })
                }
              >
                <option value="Quizzes">Quizzes</option>
                <option value="Exams">Exams</option>
                <option value="Assignments">Assignments</option>
                <option value="Project">Project</option>
              </select>
            </div>

            <div className="mb-3">
              <h5>Options:</h5>

              <label>
                <input
                  type="checkbox"
                  checked={quiz?.shuffleAnswers}
                  onChange={(e) =>
                    setQuiz({ ...quiz, shuffleAnswers: e.target.checked })
                  }
                />
                Shuffle Answers
              </label>
              <br></br>

              <label>
                <input
                  type="checkbox"
                  checked={quiz?.oneQuestionAtATime}
                  onChange={(e) =>
                    setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })
                  }
                />
                One Question at a Time?
              </label>
              <br></br>

              <label>
                <input
                  type="checkbox"
                  checked={quiz?.webcamRequired}
                  onChange={(e) =>
                    setQuiz({ ...quiz, webcamRequired: e.target.checked })
                  }
                />
                WebCam required
              </label>
              <br></br>

              <label>
                <input
                  type="checkbox"
                  checked={quiz?.lockQuestionsAfterAnswering}
                  onChange={(e) =>
                    setQuiz({
                      ...quiz,
                      lockQuestionsAfterAnswering: e.target.checked,
                    })
                  }
                />
                Lock Questions After Answering
              </label>
              <br></br>

              <label>
                <input
                  type="checkbox"
                  checked={multipleAttemptsEnabled}
                  onChange={toggleMultipleAttempts}
                />
                Enable Multiple Attempts
              </label>&nbsp;

              <label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Number of Attempts"
                  value={
                    multipleAttemptsEnabled ? quiz?.numberOfAttempts || 5 : 5
                  } // Show current value or default
                  onChange={(e) =>
                    setQuiz({
                      ...quiz,
                      numberOfAttempts: parseInt(e.target.value),
                    })
                  }
                  disabled={!multipleAttemptsEnabled} // Disable the input if the checkbox is not checked
                  style={{
                    opacity: multipleAttemptsEnabled ? 1 : 0.5,
                    width: "150px",
                  }} // Grey out the input when disabled
                />
              </label><br />

              <label htmlFor="showCorrectAnswersDate">
                <input
                  type="checkbox"
                  checked={showCorrectAnswersEnabled}
                  onChange={toggleShowCorrectAnswers}
                />
                Show Correct Answers On
              </label>&nbsp;

              <label>
                <input
                  id="showCorrectAnswersDate"
                  type="date"
                  className="form-control"
                  value={""}
                  onChange={(e) =>
                    setQuiz({ ...quiz, showCorrectAnswersDate: e.target.value })
                  }
                  disabled={!showCorrectAnswersEnabled} 
                  style={{ opacity: showCorrectAnswersEnabled ? 1 : 0.5 }}
                />
              </label><br/>

              <label>
                <input
                  type="checkbox"
                  checked={timeLimitEnabled}
                  onChange={toggleTimeLimit}
                />
                Enable Time Limit (min)
              </label>&nbsp;

              <label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Time Limit"
                  value={timeLimitEnabled ? quiz?.timeLimit : 20} // If not enabled, show the default value
                  onChange={(e) =>
                    setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) })
                  }
                  disabled={!timeLimitEnabled} // Disable the input if the checkbox is not checked
                  style={{
                    opacity: timeLimitEnabled ? 1 : 0.5,
                    width: "150px",
                  }} // Grey out the input when disabled
                />
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Access Code"
                value={quiz?.accessCode}
                onChange={(e) =>
                  setQuiz({ ...quiz, accessCode: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <div>
                <label htmlFor="dueDate">Due Date: </label>
                <input
                  id="dueDate"
                  type="date"
                  className="form-control"
                  value={formattedDueDate}
                  onChange={(e) =>
                    setQuiz({ ...quiz, dueDate: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="availableDate">Available Date: </label>
                <input
                  id="availableDate"
                  type="date"
                  className="form-control"
                  value={formattedAvailableDate}
                  onChange={(e) =>
                    setQuiz({ ...quiz, availableDate: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="untilDate">Until Date: </label>
                <input
                  id="untilDate"
                  type="date"
                  className="form-control"
                  value={formattedUntilDate}
                  onChange={(e) =>
                    setQuiz({ ...quiz, untilDate: e.target.value })
                  }
                />
              </div>
            </div>
          </form>

          <Link style={{ textDecoration: "none" }} to={`/Kanbas/Courses/${courseId}/Quizzes/${location}`}>
            <button className="btn btn-success" onClick={handleSaveChanges}>
              Save
            </button>&nbsp;
          </Link>

          <Link style={{ textDecoration: "none" }} to={`/Kanbas/Courses/${courseId}/Quizzes`}>
            <button
              className="btn btn-primary"
              onClick={() => {
                handleSaveChanges();
                handlePublish(location);
              }}
            >
              Save and Publish
            </button>&nbsp;
          </Link>

          <Link style={{ textDecoration: "none" }} to={`/Kanbas/Courses/${courseId}/Quizzes/${location}`}>
            <a className="btn btn-danger">Cancel</a>&nbsp;
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default QuizEditor;
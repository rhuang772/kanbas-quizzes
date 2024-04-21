import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import { findQuizzesForCourse } from "./client";
import { Link } from "react-router-dom";
import {
  addQuiz,
  setQuizzes,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  publishQuiz,
} from "./reducer";
import * as client from "./client";
import QuizEditorNav from "./QuizEditorNav";

const QuizEditor = () => {
  const { courseId } = useParams();
  const { quizId } = useParams();
  useEffect(() => {
    findQuizzesForCourse(courseId).then((quizzes) =>
      dispatch(setQuizzes(quizzes))
    );
  }, [courseId]);

  const quizList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );
  // const quiz1 = useSelector((state: KanbasState) => {
  //   const quizzes = state.quizzesReducer.quizzes;
  //   return quizzes.find((quiz) => quiz._id === quizId);
  // });
  // const quiz = useSelector(
  //   (state: KanbasState) => state.quizzesReducer.quiz
  // );

  const [quiz, setQuiz] = useState(
    quizList.find((quiz) => quiz._id === quizId)
  );

  const dispatch = useDispatch();

  // dispatch(setQuiz(quiz))}
  const formattedDueDate = quiz?.dueDate ? quiz?.dueDate.split("T")[0] : "";
  const formattedAvailableDate = quiz?.availableDate
    ? quiz?.availableDate.split("T")[0]
    : "";
  const formattedUntilDate = quiz?.untilDate
    ? quiz?.untilDate.split("T")[0]
    : "";
  // const formatShowCorrectAnswersDate = quiz?.showCorrectAnswersDate.split("T")[0]
  const handleSaveChanges = async () => {
    // Code to save changes and navigate to Quiz Details screen
    const status = await client.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };
  const handleSavePublishChanges = async () => {
    // Code to save changes and navigate to Quiz Details screen
    const status = await client.publishQuiz(quiz);
    // dispatch(updateQuiz(quiz));
    dispatch(publishQuiz(quiz));
  };

  const handlePublish = (quizId: any) => {
    client.publishQuiz(quizId).then((status) => {
      dispatch(publishQuiz(quizId));
    });
    findQuizzesForCourse(courseId).then((quizzes) =>
      dispatch(setQuizzes(quizzes))
    );
  };

  const [timeLimitEnabled, setTimeLimitEnabled] = useState(
    quiz?.timeLimitBool || false
  );

  // Handler for the checkbox change
  const toggleTimeLimit = (e: any) => {
    setTimeLimitEnabled(e.target.checked);
    // If disabling, set timeLimit to the default value; otherwise, keep the current value.
    setQuiz({
      ...quiz,
      timeLimitBool: e.target.checked,
      timeLimit: e.target.checked ? quiz?.timeLimit : 20,
    });
  };

  // Local state for handling if multiple attempts are enabled
  const [multipleAttemptsEnabled, setMultipleAttemptsEnabled] = useState(
    quiz?.multipleAttempts || false
  );

  // Handler for the checkbox to enable/disable multiple attempts
  const toggleMultipleAttempts = (e: any) => {
    const attemptsEnabled = e.target.checked;
    setMultipleAttemptsEnabled(attemptsEnabled);
    setQuiz({
      ...quiz,
      multipleAttempts: attemptsEnabled,
      numberOfAttempts: attemptsEnabled ? quiz?.numberOfAttempts : 5, // Assuming '1' is the default
    });
  };

  // Local state to handle if showing correct answers is enabled
  const [showCorrectAnswersEnabled, setShowCorrectAnswersEnabled] = useState(
    quiz?.showCorrectAnswers || false
  );

  // Handler for the checkbox to show/hide correct answers
  const toggleShowCorrectAnswers = (e: any) => {
    const showAnswers = e.target.checked;
    setShowCorrectAnswersEnabled(showAnswers);
    setQuiz({
      ...quiz,
      showCorrectAnswers: showAnswers,
      // Add additional logic here if you have a related state that needs to be updated when this checkbox is toggled
    });
  };

  return (
    <div>
      <QuizEditorNav />
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <form>
            <input
              // id="title2"
              // type="text"
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
              </label>

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
              </label>

              <label htmlFor="showCorrectAnswersDate">
                <input
                  type="checkbox"
                  checked={showCorrectAnswersEnabled}
                  onChange={toggleShowCorrectAnswers}
                />
                Show Correct Answers
              </label>

              <label>
                <input
                  id="showCorrectAnswersDate"
                  type="date"
                  className="form-control"
                  value={""}
                  onChange={(e) =>
                    setQuiz({ ...quiz, showCorrectAnswersDate: e.target.value })
                  }
                  disabled={!showCorrectAnswersEnabled} // Disable the input if the checkbox is not checked
                  style={{ opacity: showCorrectAnswersEnabled ? 1 : 0.5 }} // Grey out the input when disabled
                />
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={timeLimitEnabled}
                  onChange={toggleTimeLimit}
                />
                Enable Time Limit (min)
              </label>

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

          <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`}>
            <a className="btn btn-success" onClick={handleSaveChanges}>
              Save
            </a>
          </Link>

          <Link to={`/Kanbas/Courses/${courseId}/Quizzes`}>
            <button
              className="btn btn-primary"
              onClick={() => {
                handleSaveChanges();
                handlePublish(quizId);
              }}
            >
              Save and Publish
            </button>
          </Link>

          <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`}>
            <a className="btn btn-danger">Cancel</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default QuizEditor;
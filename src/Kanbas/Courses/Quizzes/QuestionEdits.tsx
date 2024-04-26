import { Link } from "react-router-dom";
import QuizEditorNav from "./QuizEditorNav";
//import QuizQuestionsEditor from "./QuizQuestionsAdder";
import {
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router";
import { findQuestionsForQuiz } from "./Questions/client";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../store";
import * as client from "./Questions/client";
import { addQuestion } from "./Questions/reducer";



function QuizQuestions() {
  const [showEditor, setShowEditor] = useState(false);
  const { quizId } = useParams();
  const [questionList2, setQuestionList2] = useState([]);
  const [question, setQuestion] = useState(null);
  const { courseId } = useParams();
  const quizList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );
  const dispatch = useDispatch();



  const fetchQuestions = (quizId: any) => {
    findQuestionsForQuiz(quizId)
      .then((questionList) => {
        if (questionList.length > 0) {
          setQuestionList2(questionList);
          setQuestion(questionList[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching quiz questions:", error);
      });
  };

  useEffect(() => {
    fetchQuestions(quizId);
  }, [quizId]);


  const handleAddQuestion = () => {
    client.createQuestion(quizId, question).then((quizId) => {
        dispatch(addQuestion(question));
    });
};

  // Renders the question and answer fields
  const renderQuestionFields = (question: any) => (
    <li key={question.id} className="list-group-item">
      <div>
        <strong>Q: </strong> {question.content}
        <div>
          {(question.questionType === "Multiple Choice" || question.questionType === "True/False")&& (
            <div className="mt-2">
              <strong>Options:</strong>
              {question.options.map((option: any, index: any) => (
                <div key={index} >
                  <input
                    type="radio"
                    name={`option-${question.id}`}
                    id={`option-${question.id}-${index}`}
                    value={option}
                    checked={question.answer === option}
                    onChange={() => fetchQuestions(quizId)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`option-${question.id}-${index}`}
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          )}

          {question.questionType === "Blank" && (
          <div className="mt-2">
            <strong>Fill in the blanks</strong>
            {question?.questionType === 'Blank' && [...Array(question?.numOptions)].map((_, index) => (
              <div key={index}>
                <input
                  type="text"
                  id={`box${index + 1}`}
                  name="answer"
                  value=''
                  style={{marginBottom: '10px'}}
                  onChange = {() => fetchQuestions(quizId)}
                />
                <label  htmlFor={`box${index + 1}`}></label>
                <br />
              </div>
            ))}
          </div>
        )}

        </div>
      </div>
      {/* Edit button goes here */}
      <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Edit/Details/${question._id}/Edit`}>
      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={() => { setShowEditor(true)}}
      >
        Edit
      </button>
      </Link>
    </li>
  );
  return (
    <>
      <QuizEditorNav />
      <div>
        {!showEditor ? (
          <div>
            <ul className="list-group">
              {questionList2.map(renderQuestionFields)}
            </ul>
            <div className="mt-3">
            <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Edit/Details/Add`}>

              <button
                type="button"
                className="btn btn-secondary"
              >
                + New Question
              </button>
            </Link>

            </div>
          </div>
        ) : (
          //<QuizQuestionsEditor />
          "abc"
        )}
        <hr></hr>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-danger me-2"
            onClick={() => {
              /* logic to handle cancel */
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={() => {
              /* logic to handle save and publish */
            }}
          >
            Save & Publish
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              /* logic to handle save */
            }}
          >
            Save
          </button>
        </div>
        <hr></hr>
      </div>
    </>
  );
}

export default QuizQuestions;
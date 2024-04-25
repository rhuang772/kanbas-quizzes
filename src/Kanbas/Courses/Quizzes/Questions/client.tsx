import axios from "axios";
const QUESTIONS_API = "http://localhost:4000/api/questions";
const QUIZZES_API = "http://localhost:4000/api/quizzes";

export const updateQuestion = async (question : any) => {
  const response = await axios
    .put(`${QUESTIONS_API}/${question._id}`, question);

  return response.data;
};
export const deleteQuestion = async (questionId : any) => {
  const response = await axios
    .delete(`${QUESTIONS_API}/${questionId}`);
  return response.data;
};
export const createQuestion = async (questionId: any, question : any) => {
  const response = await axios.post(
    `${QUIZZES_API}/${questionId}/questions`,
    question
  );
  return response.data;
};
export const findQuestionsForQuiz = async (quizId: any) => {
  const response = await axios
    .get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
};
export const publishQuestion = async (questionId : any) => {
  const response = await axios
    .put(`${QUESTIONS_API}/publish/${questionId}`);
  return response.data;
  
}
import axios from "axios";
const COURSES_API = "http://localhost:4000/api/courses";
const QUIZZES_API = "http://localhost:4000/api/quizzes";
export const deleteQuiz = async (quizId : any) => {
    const response = await axios
      .delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

export const createQuiz = async (courseId: any, quiz: any) => {
    const response = await axios.post(
        `${COURSES_API}/${courseId}/quizzes`,
        quiz
    );
    return response.data;
};

export const findQuizzesForCourse = async (courseId: any) => {
    const response = await axios
        .get(`${COURSES_API}/${courseId}/quizzes`);
    console.log(response.data);
    return response.data;
};

export const updateQuiz = async (quiz: any) => {
    const response = await axios
        .put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return response.data;
};

export const publishQuiz = async (quiz: any) => {
    const response = await axios
        .put(`${QUIZZES_API}/publish/${quiz}`);
    return response.data;
}


import { createSlice } from "@reduxjs/toolkit";

interface Quiz {
  _id: string;
  course: string;
  title: string;
  quizType: string;
  points: Number;
  group: string;
  shuffled: boolean;
  multipleAttempts: boolean;
  showCorrect: boolean;
  accessCode: string;
  oneQuestionAtATime: boolean;
  requireLockdownBroswer: boolean;
  requireViewQuizResults: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: any;
  availableDate: any;
  untilDate: any;
  published: boolean;
  timeLimit: Number;
  viewResponses: string;
  for: string;
}

const currentDate = new Date();
const formattedCurrentDate = currentDate.toISOString().split("T")[0];
const formattedDueDate = `${formattedCurrentDate}T23:59:59`;


const initialState: { quizzes: Quiz[]; quiz: Quiz; } = {
  quizzes: [],
  quiz: {
    _id: "",
    course: "",
    title: "Example Quiz",
    quizType: "Graded Quiz",
    points: 100,
    group: "Quizzes",
    shuffled: true,
    multipleAttempts: false,
    showCorrect: false,
    accessCode: "",
    oneQuestionAtATime: true,
    requireLockdownBroswer: false,
    requireViewQuizResults: false,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: formattedDueDate,
    availableDate: formattedDueDate,
    untilDate: formattedDueDate,
    published: false,
    timeLimit: 30,
    viewResponses: "Always",
    for: "Everyone"
  },
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, action) => {
      state.quizzes = [action.payload, ...state.quizzes];
    },

    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz._id !== action.payload
      );
    },
    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz._id === action.payload._id) {
          return action.payload;
        } else {
          return quiz;
        }
      });
    },
    publishQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz._id === action.payload) {
          return { ...quiz, published: true };
        } else {
          return quiz;
        }
      });
    },

    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
  },
});

export const {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  setQuizzes,
  publishQuiz,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;
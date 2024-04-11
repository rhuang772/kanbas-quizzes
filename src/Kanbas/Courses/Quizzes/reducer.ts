import { createSlice } from "@reduxjs/toolkit";

export interface Quiz {
  _id: string;
  name: string;
  description: string;
}

const initialState: {quizzes: Quiz[], quiz: Quiz} = {
  quizzes: [], 
  quiz: { _id: "1", name: "New Quiz 123", description: "New Description" },
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
                return { ...quiz, published: true}
            } else {
                return quiz;
            }
        })
    },

    setQuiz: (state, action) => {
      state.quiz = action.payload;
    }
  },
});

export const { addQuiz, deleteQuiz, updateQuiz, setQuiz, setQuizzes } = quizzesSlice.actions;
export default quizzesSlice.reducer;

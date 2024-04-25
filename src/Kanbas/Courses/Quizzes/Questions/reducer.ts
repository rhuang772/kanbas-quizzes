import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Question {
  _id: string;
  quizId: string;
  questionType: string;
  title: string;
  points: Number;
  content: string;
  answer: any;
  options: any;
  selectedOption: any;
  numOptions: Number;
}

const initialState: { questions: Question[]; question: Question; } = {
  questions: [],
  question: {
    _id: "20",
    quizId: "1",
    questionType: "Multiple Choice",
    title: "Question",
    points: 1,
    content: "Cheese is a fruit.",
    answer: ["No"],
    options: ["Yes", "No","Maybe"],
    selectedOption: "",
    numOptions: 2,
  },
};

const questionSlice = createSlice({
  name: "questions",
  initialState: initialState,
  reducers: {
    // updates the selectedOption property of a question when the user selects an option
    selectOption: (state, action: PayloadAction<{ questionId: string; selectedOption: string }>) => {
      state.questions = state.questions.map((question) => {
        if (question._id === action.payload.questionId) {
          return { ...question, selectedOption: action.payload.selectedOption };
        } else {
          return question;
        }
      });
    },
    addQuestion: (state, action) => {
      state.questions = [action.payload, ...state.questions];
    },
  },
});

export const { selectOption, addQuestion } = questionSlice.actions;
export default questionSlice.reducer;
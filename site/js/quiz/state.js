// Centralized quiz state
export const state = {
  questions: [],
  currentPage: 0,
  questionsPerPage: 4,
  userChoices: [],
  totalPages: 0
};

export function resetState() {
  state.questions = [];
  state.currentPage = 0;
  state.questionsPerPage = 4;
  state.userChoices = [];
  state.totalPages = 0;
}



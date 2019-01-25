const CHANGE_NOTE_INPUT = "notes/CHANGE_NOTE_INPUT";

// action
export const changeNoteInput = ({ value }) => ({
  type: CHANGE_NOTE_INPUT,
  payload: { value }
});

// Initial State
const initialState = {
  noteInput: ""
};

// Define Reducer & Export Reducer
export const notes = (state = initialState, action) => {
  switch (action.type) {
    // 변화가 있으면 noteInput를 업데이트
    case CHANGE_NOTE_INPUT:
      // Test Using localStorage func! Awesome!
      localStorage.setItem('noteInput',action.payload.value);
      return {
          ...state,
          noteInput: action.payload.value
      };
    // 기본적으로는 상태 유지
    default:
      return state;
  }
};

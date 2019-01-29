// 노트 리듀서 영역입니다.

// 노트 생성 구현을 위한 import
import { ajax } from 'rxjs/observable/dom/ajax';
import { of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { ofType } from 'redux-observable';

// ========== Define Actions ==========
// 노트값 변경
const CHANGE_NOTE_INPUT = "notes/CHANGE_NOTE_INPUT";

// 노트 토글
const TOGGLE_NOTE = 'notes/TOGGLE_NOTE';


// 노트 생성
const ADD_NOTE = 'notes/ADD_NOTE';
const ADD_NOTE_SUCCESS = 'notes/ADD_NOTE_SUCCESS';
const ADD_NOTE_FAILURE = 'notes/ADD_NOTE_FAILURE';


// 노트 리스트
const GET_NOTES = 'notes/GET_NOTES';
const GET_NOTES_SUCCESS = 'notes/GET_NOTES_SUCCESS';
const GET_NOTES_FAILURE = 'notes/GET_NOTES_FAILURE';


// 노트 업데이트
const UPDATE_NOTE = 'note/UPDATE_NOTE';
const UPDATE_NOTE_SUCCESS = 'note/UPDATE_NOTE_SUCCESS';
const UPDATE_NOTE_FAILURE = 'note/UPDATE_NOTE_FAILURE';


// 노트 삭제
const DELETE_NOTE = 'note/DELETE_NOTE';
const DELETE_NOTE_SUCCESS = 'note/DELETE_NOTE_SUCCESS';
const DELETE_NOTE_FAILURE = 'note/DELETE_NOTE_FAILURE';
// ========== ///Define Actions ==========



// ========== Create action ============
// 노트값 변경 + 토글(isEditing)
export const changeNoteInput = ({ value }, isEditing) => ({
  type: CHANGE_NOTE_INPUT,
  payload: { value, isEditing }
});

// 노트 생성
export const addNote = () => ({
  type: ADD_NOTE
});

export const addNoteSuccess = note => ({
  type: ADD_NOTE_SUCCESS,
  payload: {
    note
  }
});

export const addNoteFailure = error => ({
  type: ADD_NOTE_FAILURE,
  payload: {
    error
  }
});

// 노트 생성 - EPIC 함수 정의
const addNoteEpic = (action$, state$) => {
  return action$.pipe(
    ofType(ADD_NOTE),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      return ajax.post(`/api/notes/`, { text: state.notes.noteInput }).pipe(
        map(response => {
          const note = response.response;
          return addNoteSuccess(note);
        }),
        catchError(error =>
          of({
            type: ADD_NOTE_FAILURE,
            payload: error,
            error: true
          })
        )
      );
    })
  );
};


// 노트 리스트
export const getNotes = () => ({
  type: GET_NOTES
});
export const getNotesSuccess = ({ notes }) => ({
  type: GET_NOTES_SUCCESS,
  payload: {
    notes
  }
});
export const getNotesFailure = error => ({
  type: GET_NOTES_FAILURE,
  payload: {
    error
  }
});

// 노트 리스트 - EPIC 함수 정의
const getNotesEpic = (actions$, states$) => {
  return actions$.pipe(
    ofType(GET_NOTES),
    withLatestFrom(states$),
    mergeMap(([action, state]) => {
      return ajax
        .get('api/notes/')
        .pipe(
          map(response => {
            const notes = response.response;
            return getNotesSuccess({ notes });
          }),
          catchError(error =>
            of({
              type: GET_NOTES_FAILURE,
              payload: error,
              error: true
            })
          )
        );
    })
  );
};

// 노트 토글
export const toggleNote = ({ id, text }) => ({
  type: TOGGLE_NOTE,
  payload: {
    id,
    text
  }
});


// 노트 업데이트
export const updateNote = () => ({
  type: UPDATE_NOTE
});

export const updateNoteSuccess = ({ note }) => ({
  type: UPDATE_NOTE_SUCCESS,
  payload: {
    note
  }
});

export const updateNoteFailure = error => ({
  type: UPDATE_NOTE_FAILURE,
  payload: {
    error
  }
});

// 노트 업데이트 - EPIC 함수 정의
const updateNoteEpic = (action$, state$) => {
  return action$.pipe(
    ofType(UPDATE_NOTE),
    withLatestFrom(state$),

    mergeMap(([action, state]) => {
      return ajax
        .patch(`/api/notes/${state.notes.editing.id}/`, {
          text: state.notes.editing.text
        })
        .pipe(
          map(response => {
            const note = response.response;
            return updateNoteSuccess({ note });
          }),
          catchError(error =>
            of({
              type: UPDATE_NOTE_FAILURE,
              payload: error,
              error: true
            })
          )
        );
    })
  );
};

// 노트 삭제
export const deleteNote = ({ id }) => ({
  type: DELETE_NOTE,
  payload: {
    id
  }
});
export const deleteNoteSuccess = ({ id }) => ({
  type: DELETE_NOTE_SUCCESS,
  payload: {
    id
  }
});
export const deleteNoteFailure = error => ({
  type: DELETE_NOTE_FAILURE,
  payload: {
    error
  }
});

// 노트 삭제 - EPIC 함수 정의
const deleteNoteEpic = (action$, state$) => {
  return action$.pipe(
    ofType(DELETE_NOTE),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const token = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo")).token
        : null;
      return ajax
        .delete(`/api/notes/${action.payload.id}/`, {
          "Content-Type": "application/json",
          Authorization: `token ${token}`
        })
        .pipe(
          map(response => {
            return deleteNoteSuccess({ id: action.payload.id });
          }),
          catchError(error =>
            of({
              type: DELETE_NOTE_FAILURE,
              payload: error,
              error: true
            })
          )
        );
    })
  );
};
// ========== ///Create action ============

// ========== Initial State ==========
const initialState = {
  noteInput: "",
  notes: [],
  error: {
    triggered: false,
    message: ""
  },
  editing: {
    id: null,
    text: ""
  }
};
// ========== ///Initial State ==========


// ========== Define Reducer & Export Reducer ==========
export const notes = (state = initialState, action) => {
  switch (action.type) {

    // 노트값 변경
    case CHANGE_NOTE_INPUT:
      // Test Using localStorage func! Awesome!
      // localStorage.setItem('noteInput',action.payload.value);
      if (action.payload.isEditing) {
        return {
          ...state,
          editing: {
            ...state.editing,
            text: action.payload.value
          }
        }
      }
      return {
        ...state,
        noteInput: action.payload.value
      };


    // 노트 토글
    case TOGGLE_NOTE:
      return {
        ...state,
        editing: {
          id: parseInt(action.payload.id, 10),
          text: action.payload.text
        }
      };


    // 노트 생성
    case ADD_NOTE_SUCCESS:
      const { note } = action.payload;
      return {
        ...state,
        notes: [note].concat(state.notes),  // 기존 노트에 추가
        noteInput: '', // 노트 입력상태 초기화
        massage: '[SUCCESS] Note 생성이 정상적으로 처리되었습니다.',
        // 성공 시 state에 남아있던 error에 대한 내용 초기화
        error: {
          triggered: false,
          message: ""
        }
      }

    case ADD_NOTE_FAILURE:
      return {
        ...state,
        error: {
          triggered: true,
          message: '[ERROR] Note 생성에 실패했습니다.'  // 에러 메세지 출력
        }
      };


    // 노트 리스트
    case GET_NOTES_SUCCESS:
      return {
        ...state,
        notes: action.payload.notes
      };

    case GET_NOTES_FAILURE:
      return {
        ...state,
        error: {
          triggered: true,
          message: '[ERROR] 다시 시도해주세요.'
        }
      };


    // 노트 업데이트
    case UPDATE_NOTE_SUCCESS:
      const { id, text } = action.payload.note;
      let notes = state.notes;
      let index = notes.findIndex((note, i) => {
        return note.id === id;
      });
      notes[parseInt(index, 10)] = {
        id,
        text
      };
      return {
        ...state,
        editing: {
          id: null,
          note: ""
        },
        notes
      };

    case UPDATE_NOTE_FAILURE:
      return {
        ...state,
        error: {
          triggered: true,
          message: '[ERROR] 노트 업데이트에 실패했습니다.'
        }
      };

    // 노트 삭제
    case DELETE_NOTE_SUCCESS:
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload.id)
      };

    // 기본 리듀서 --> 저장 중인 state 반환
    default:
      return state;
  }
};
// ========== ///Define Reducer ==========


// ========== Export Reducer ==========
export const notesEpics = {
  addNoteEpic,
  getNotesEpic,
  updateNoteEpic,
  deleteNoteEpic
};
// ========== ///Export Reducer ==========



// 마지막으로, reducer를 손보고 epic에 추가 해준다.
// 노트 리듀서 영역입니다.

// 노트 생성 구현을 위한 import
import { ajax } from 'rxjs/observable/dom/ajax';
import { of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { ofType } from 'redux-observable';

// 노트 생성 관련 variable 정의
const ADD_NOTE = 'notes/ADD_NOTE';
const ADD_NOTE_SUCCESS = 'notes/ADD_NOTE_SUCCESS';
const ADD_NOTE_FAILURE = 'notes/ADD_NOTE_FAILURE';


// GET 액션 추가
const GET_NOTES = 'notes/GET_NOTES';
const GET_NOTES_SUCCESS = 'notes/GET_NOTES_SUCCESS';
const GET_NOTES_FAILURE = 'notes/GET_NOTES_FAILURE';


// redux-store 관련 variable 정의
const CHANGE_NOTE_INPUT = "notes/CHANGE_NOTE_INPUT";

// ==== Action ====

// ==== Create action ====
export const changeNoteInput = ({ value }) => ({
  type: CHANGE_NOTE_INPUT,
  payload: { value }
});

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

// 노트 생성 action 정의
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


// GET action
export const getNotes = () => ({
  type: GET_NOTES
});
export const getNotesSuccess = ({notes}) => ({
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

// API에 쓰일 EPIC 설정
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
            return getNotesSuccess({notes});
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

// ==== Initial State ====
const initialState = {
  noteInput: "",
  notes:[],
  // 에러 관련 State 등록.
  error: {
    triggered: false,
    message: ""
  }
};

// ==== Define Reducer & Export Reducer ====
export const notes = (state = initialState, action) => {
  switch (action.type) {
    // Updates note
    case CHANGE_NOTE_INPUT:
      // Test Using localStorage func! Awesome!
      // localStorage.setItem('noteInput',action.payload.value);
      return {
          ...state,
          noteInput: action.payload.value
      };
    // When note created success
    case ADD_NOTE_SUCCESS:
      const{ note } = action.payload;
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

    // When note created failed
    case ADD_NOTE_FAILURE:
      return {
        ...state,
        error: {
          triggered: true,
          message: '[ERROR] Note 생성에 실패했습니다.'  // 에러 메세지 출력
        }
      };
    // GET_NOTES 관련========>
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
    // ========>GET_NOTES 관련

    default:
      return state;
  }
};

// Export reducer
// export addNoteEpic reducer 
export const notesEpics = {
  addNoteEpic,
  getNotesEpic
};


// 마지막으로, reducer를 손보고 epic에 추가 해준다.
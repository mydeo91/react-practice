import { notes, notesEpics } from "./notes";
import { combineReducers } from "redux";    // redux store 관련 import
import { combineEpics } from 'redux-observable';    // 노트 생성 관련 import

// notes reducer 반영
export const rootReducers = combineReducers({ notes });

// 노트 생성 reducer 반영
// --> Epic 사용을 위해선 store/configure.js 에 반영 필요
export const rootEpics = combineEpics(notesEpics.addNoteEpic);
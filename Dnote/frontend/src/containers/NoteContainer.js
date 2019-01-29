import React, { Component } from "react";
import { connect } from "react-redux";
import InsertForm from "components/notes/InsertForm";
import NoteWrapper from "components/notes/NoteWrapper";

import * as noteActions from "store/modules/notes";


// Container
export class NoteContainer extends Component {
  
  // Event Handler와 비슷한 기능 같다.
  handleChange = ({ value }) => {
    const { changeNoteInput } = this.props;
    changeNoteInput({ value });
  };

  // EventHandler 추가 --> addNote
  addNote = () => {
    const { addNote } = this.props;
    addNote();
  }

  // GET_NOTES 를 위한 UI 랜더링 작업 ===>
  // React.ComponentLifeCycle.componentDidMount
  componentDidMount() {
    this.getNotes();
  }

  getNotes = () => {
    const { getNotes } = this.props;
    getNotes();
  }

  render() {
    const { noteInput, error } = this.props;
    const { handleChange, addNote } = this;
    return (
      <div>
        <NoteWrapper>
          <InsertForm 
            noteInput={noteInput} 
            onChangeInput={handleChange}
            onAdd={addNote}
            error={error}
          />
        </NoteWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  noteInput: state.notes.noteInput,
  notes: state.notes.notes,
  error: state.notes.error
});


const mapDispatchToProps = dispatch => {
  return {
    // CHANGE_NOTE_INPUT 추가
    changeNoteInput: ({ value }) => {
        dispatch(noteActions.changeNoteInput({ value }));
    },
    // ADD_NOTES 추가
    addNote: () => {
      dispatch(noteActions.addNote())
    },
    // GET_NOTES 추가
    getNotes: () => {
      dispatch(noteActions.getNotes())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteContainer);
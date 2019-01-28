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

  render() {
    const { noteInput } = this.props;
    const { handleChange, addNote } = this;
    return (
      <div>
        <NoteWrapper>
          <InsertForm 
            noteInput={noteInput} 
            onChangeInput={handleChange}
            onAdd={addNote}
          />
        </NoteWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  noteInput: state.notes.noteInput,
  notes: state.notes.notes
});

const mapDispatchToProps = dispatch => {
  return {
    changeNoteInput: ({ value }) => {
        dispatch(noteActions.changeNoteInput({ value }));
    },
    // addNote EveneHandler 추가에 따른 dispatcher 업데이트
    addNote: () => {
      dispatch(noteActions.addNote())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteContainer);
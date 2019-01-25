import React, { Component } from "react";
import { connect } from "react-redux";
import InsertForm from "components/notes/InsertForm";
import NoteWrapper from "components/notes/NoteWrapper";

import * as noteActions from "store/modules/notes";


// Container
export class NoteContainer extends Component {
  handleChange = ({ value }) => {
    console.log('NoteContainer.handleChange.value', {value});
    const { changeNoteInput } = this.props;
    changeNoteInput({ value });

  };

  render() {
    const { noteInput } = this.props;
    const { handleChange } = this;
    console.log('NoteContainer.render().noteInput', {noteInput});
    console.log('NoteContainer.render().handleChange', {handleChange});
    
    return (
      <div>
        <NoteWrapper>
          <InsertForm noteInput={noteInput} onChangeInput={handleChange} />
        </NoteWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  noteInput: state.notes.noteInput
});

const mapDispatchToProps = dispatch => {
  return {
    changeNoteInput: ({ value }) => {
        console.log('Running Dispatcher! ------>');
        dispatch(noteActions.changeNoteInput({ value }));
        console.log('Updated!')
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteContainer);
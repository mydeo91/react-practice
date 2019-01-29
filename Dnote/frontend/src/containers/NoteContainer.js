import React, { Component } from "react";
import { connect } from "react-redux";

// Importing Components
import InsertForm from "components/notes/InsertForm";
import NoteWrapper from "components/notes/NoteWrapper";
import NoteList from 'components/notes/NoteList/NoteList';

// Importing Reducers
import * as noteActions from "store/modules/notes";


// Container
export class NoteContainer extends Component {
  
  // =========== Event Handeling ===========
  handleChange = ({ value }, isEditing) => {
    const { changeNoteInput } = this.props;
    changeNoteInput({ value }, isEditing);
  };

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

  // TOGGLE
  handleToggle = ({ id, text }) => {
    const { toggleNote, editing } = this.props;

    // 이미 editing 중인 경우, 한 번 더 토글 시 초기화
    if (editing.id === id) {
      toggleNote({ id: null, text: "" });
    } else {
      // editing
      toggleNote({ id, text });
    }
  }

  // UPDATE
  updateNote = () => {
    const { updateNote } = this.props;
    updateNote();
  };
  // =========== ///Event Handeling ===========

  // ======== RENDERING =========
  render() {
    const { noteInput, error, notes, editing } = this.props;
    const { handleChange, addNote, handleToggle, updateNote } = this;
    return (
      <div>
        <NoteWrapper>
          <InsertForm 
            noteInput={noteInput} 
            onChangeInput={handleChange}
            onAdd={addNote}
            error={error}
          />
          {/* noteList RENDERING */}
          <NoteList 
            notes={notes}
            editing={editing}
            onToggle={handleToggle}
            // NoteList props에 onChange 추가
            onChange={handleChange}
            onUpdate={updateNote}
          />
        </NoteWrapper>
      </div>
    );
  }
}
// ======== ///RENDERING =========

const mapStateToProps = state => ({
  noteInput: state.notes.noteInput,
  notes: state.notes.notes,
  error: state.notes.error,
  editing: state.notes.editing
});


const mapDispatchToProps = dispatch => {
  return {
    // CHANGE_NOTE_INPUT 추가
    changeNoteInput: ({ value }, isEditing) => {
        dispatch(noteActions.changeNoteInput({ value }, isEditing));
    },
    // ADD_NOTES 추가
    addNote: () => {
      dispatch(noteActions.addNote())
    },
    // GET_NOTES 추가
    getNotes: () => {
      dispatch(noteActions.getNotes())
    },
    // TOGGLE
    toggleNote: ({ id, text }) => {
      dispatch(noteActions.toggleNote({ id, text }));
    },
    // UPDATE
    updateNote: () => {
      dispatch(noteActions.updateNote());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteContainer);
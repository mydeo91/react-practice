import React from "react";
import MainStructure from "components/structure/MainStructure";
// import NoteWrapper from 'components/notes/NoteWrapper';
// import InsertForm from "components/notes/InsertForm";
import NoteContainer from "containers/NoteContainer";

const Main = () => {
  return (
    <MainStructure>
      <NoteContainer />
    </MainStructure>
  )
};

export default Main;
import React from 'react';
import styles from './NoteList.module.scss';
import NoteItem from 'components/notes/NoteItem/NoteItem';


// NoteList 객체 정의
const NoteList = ({ notes, editing, onToggle, onChange }) => {
    // noteList 객체 정의
    const noteList = notes.map((note, i) => {
        return <NoteItem 
                    note={note} 
                    key={note.id} 
                    editing={editing}
                    onToggle={onToggle}
                    onChange={onChange}
                />;
    });

    // noteList 객체 랜더링
    return (
        <div className={styles.note_list}>
            <div className={styles.note_item}>Your Notes ...</div>
            {noteList}
        </div>
    );
}

export default NoteList;

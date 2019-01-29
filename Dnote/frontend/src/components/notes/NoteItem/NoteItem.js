import React from 'react';
import styles from './NoteItem.module.scss';


const NoteItem = ({ note }) => {
    return (
        <div className={styles.note_item}>
            <div className={styles.note}>{note.text}</div>
            <div className={styles.delete}>&times;</div>
        </div>
    );
};

export default NoteItem;
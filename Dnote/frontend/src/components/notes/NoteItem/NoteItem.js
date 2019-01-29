import React from 'react';
import styles from './NoteItem.module.scss';


const NoteItem = ({ note, editing, onToggle, onChange }) => {
    
    const handleToggle = () => {
        onToggle({ id: note.id, text: note.text });
    };

    const handleChange = event => {
        const {value} = event.target;
        onChange({value}, true);
    };
    
    return (
        <div 
            // className={styles.note_item}
            className={editing.id === note.id ? styles.note_item+' '+styles.editing : styles.note_item }
            onClick={handleToggle}
        >
            {editing.id === note.id ? (
                <input
                    type="text"
                    name="note"
                    value={editing.text}
                    autoFocus
                    onChange={handleChange}
                />
                ) : (
                    <div className={styles.note}>{note.text}</div>
                )
            }
            <div className={styles.delete}>&times;</div>
        </div>
    );
};

export default NoteItem;
import React from 'react';
import styles from './NoteItem.module.scss';


const NoteItem = ({ note, editing, onToggle, onChange, onUpdate, onDelete }) => {
    
    const handleToggle = () => {
        onToggle({ id: note.id, text: note.text });
    };

    const handleChange = event => {
        const {value} = event.target;
        onChange({value}, true);
    };
    
    const handleKeyPress = e => {
        if (e.key === "Enter") {
            console.log('UPDATE_NOTE!');
            onUpdate();
        }
    };

    const handleDelete = e => {
        // handleToggle이 되는것을 방지
        e.stopPropagation();
        onDelete({ id: note.id });
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
                    onKeyPress={handleKeyPress}
                />
                ) : (
                    <div className={styles.note}>{note.text}</div>
                )
            }
            <div className={styles.delete} onClick={handleDelete}>
                &times;
            </div>
        </div>
    );
};

export default NoteItem;
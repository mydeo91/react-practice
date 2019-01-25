import React from "react";
import styles from "./InsertForm.module.scss";


// const InsertForm = () => {
//   return (
//     <div className={styles.form}>
//       <div className={styles.title}>Insert Your Note Here...</div>
//       <input type="text" name="note" />
//     </div>
//   );
// };

// Component
const InsertForm = ({ noteInput, onChangeInput }) => {

  // event 발생 시 작동
  const handleChange = event => {
    const { value } = event.target;
    console.log('We will updating value: ', {value})
    
    console.log('InsertForm.handleChange : State Updating ...');
    // 실질적으로 state를 update하는 부분
    onChangeInput({value})
  }

  return (
    <div className={styles.form}>
      <div className={styles.title}>Insert Your Note Here...</div>
      <input 
          type="text" 
          name="note"
          // 변경된 값은 onChange 함수를 통해서 Update 된다.
          value={noteInput}
          onChange={handleChange}
      />
    </div>
  );
};

export default InsertForm;
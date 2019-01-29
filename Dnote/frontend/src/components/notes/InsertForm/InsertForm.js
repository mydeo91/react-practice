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

// Component --> Handler 추가 : addNote  --> error 추가
const InsertForm = ({ noteInput, onChangeInput, onAdd }) => {

  // event 발생 시 작동
  const handleChange = event => {
    const { value } = event.target;
    // 실질적으로 state를 update하는 부분
    onChangeInput({value})
  }

  const handleKeyPress = event => {
    // Enter 키 press시 onAdd() 실행
    if (event.key === 'Enter') {
      onAdd();
    }
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
          onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default InsertForm;
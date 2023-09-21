import { useContext, useState, useRef } from "react";
import { TodoDispatchContext } from "../App";
import "./TodoEditor.css";

const TodoEditor = ({}) => {
  const { onCreate } = useContext(TodoDispatchContext);

  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const inputRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  }

  const onSelectDate = (date) => {
    setSelectedDate(date);
  }

  const onSubmit = () => {
    if (!content || selectedDate === "") { 
      inputRef.current.focus();
      alert("과목 및 날짜를 선택해주세요");
      return;
    }
    onCreate({ content, selectedDate: new Date().getTime() }); 
    setContent("");
    setSelectedDate("");
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  }

  return (
    <div className="TodoEditor">
      <h4>중간고사 일정표</h4>
      <div>
        <div className="dayList">
          <button onClick={() => onSelectDate('9월 16')}>9월 16</button>
          <button onClick={() => onSelectDate('9월 17')}>9월 17</button>
          <button onClick={() => onSelectDate('9월 18')}>9월 18</button>
        </div>
      </div>
      <div className="editor_wrapper">
        선택한 날짜: {selectedDate && <p>{selectedDate}</p>}
        <select ref={inputRef} value={content} onChange={onChangeContent} onKeyDown={onKeyDown}>
          <option value="">과목을 선택해주세요.</option>
          <option value={"수학"}>수학</option>
          <option value={"국어"}>국어</option>
          <option value={"영어"}>영어</option>
          <option value={"사회"}>사회</option>
          <option value={"과학"}>과학</option>
        </select>
        <button className="SubButton" onClick={onSubmit}>추가</button>
      </div>
    </div>
  )
}

export default TodoEditor;

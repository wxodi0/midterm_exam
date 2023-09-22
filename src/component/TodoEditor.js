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
    onCreate(content, selectedDate);
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
          <button className="dayBtn" onClick={() => onSelectDate('2023/10/16')}><p>9월 16</p></button>
          <button className="dayBtn" onClick={() => onSelectDate('2023/10/17')}><p>9월 17</p></button>
          <button className="dayBtn" onClick={() => onSelectDate('2023/10/18')}><p>9월 18</p></button>
        </div>
      </div>
      <div className="editor_wrapper">
        <div className="daySection">선택한 날짜: {selectedDate && <p>{selectedDate}</p>}</div>
        <input ref={inputRef} value={content} onChange={onChangeContent} onKeyDown={onKeyDown} placeholder="과목을 추가하세요"></input>
        <button className="SubButton" onClick={onSubmit}>추가</button>
      </div>
    </div>
  )
}

export default TodoEditor;

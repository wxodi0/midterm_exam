import { useContext,useState, useRef } from "react";
import { TodoDispatchContext } from "../App";
import "./TodoEditor.css";

const TodoEditor = ({}) => {
  const {onCreate} = useContext(TodoDispatchContext);

  const [content, setContent] = useState("");
  const inputRef = useRef();
  
  const onChangeContent = (e) => {
    setContent(e.target.value);
  }
  
  const onSubmit = () => {
    if(!content){
      inputRef.current.focus();
      return;
    }
    onCreate(content);
    setContent("");
  }

  const onKeyDown = (e) => {
    if(e.keyCode === 13){
      onSubmit();
    }
  }

  return (
    <div className="TodoEditor">
      <h4>중간고사 일정표</h4>
      <div className="editor_wrapper">
        <select ref={inputRef} value={content} onChange={onChangeContent} onKeyDown={onKeyDown}>
          <option>과목을 선택해주세요.</option>
          <option value={"사과"}>사과</option>
          <option value={"바나나"}>바나나</option>
          <option value={"복숭아"}>복숭아</option>
          <option value={"eheh"}>포도</option>
        </select>
        <button onClick={onSubmit}>추가</button>
      </div>
    </div>
  )
}
export default TodoEditor;
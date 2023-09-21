import React, { useContext } from 'react';
import { TodoDispatchContext } from '../App';
import './TodoItem.css';

const TodoItem = ({ id, content, isDone, createDate, date }) => {
  const { onUpdate, onDelete } = useContext(TodoDispatchContext);

  const onChangeCheckbox = () => {
    onUpdate(id);
  };
  const onClickDelete = () => {
    onDelete(id);
  };

  const dateColClass = isDone ? 'title_col line' : 'title_col';

  return (
    <div className='TodoItem'>
      <div className='checkbox_col'>
        <input onChange={onChangeCheckbox} checked={isDone} type='checkbox'></input>
      </div>
      <div className={dateColClass}>{content}</div>
      <div className='date_col'>
        {date && <p>{date}</p>} {/* 선택한 날짜가 있을 때만 표시 */}
        <br />
        {new Date(createDate).toDateString()}
      </div>
      <div className='btn_col'>
        <button onClick={onClickDelete}>삭제</button>
      </div>
    </div>
  );
};

export default TodoItem;

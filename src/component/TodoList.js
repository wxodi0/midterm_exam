import { useContext,useMemo,useState } from "react";
import { TodoStateContext } from "../App";

import TodoItem from "./TodoItem";
import "./TodoList.css";

const TodoList = () => {
  const todo = useContext(TodoStateContext);

  const [search , setSearch] = useState("");
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearchResult = () => {
    return search === ""
    ? todo
    : todo.filter((it) => 
      it.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  const analyzeTodo = useMemo(() => {
    const totalCount = todo.length;
    const doneCount = todo.filter((it) => it.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todo]);

  const {totalCount , doneCount , notDoneCount } = analyzeTodo;
  
  return (
    <div className="TodoList">
      <h4>통계</h4>
      <div>총 과목 수 : {totalCount}</div>
      <div>시험 친 과목 수:{doneCount}</div>
      <div>시험치지 않은 과목: {notDoneCount}</div>
      <input
        value={search}
        onChange={onChangeSearch}
        className="searchbar"
        placeholder="검색어를 입력해주세요"
      />
      <div className="list_wrapper">
        {getSearchResult().map((it) => (
          <TodoItem key={it.id} {...it}/>
        ))}
      </div>
    </div>
  );
};

TodoList.defaultProps = {
  todo : [],
};

export default TodoList;
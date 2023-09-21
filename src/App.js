import './App.css';
import React,{useMemo ,useCallback, useReducer, useRef } from 'react';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';
import Header from './component/Header';

const mockTodo = [
  {
    id : "teayang06@gmail.com",
    content : "정태양",
    isDone : false,
    createDate : new Date().getTime(),
  }
];


function reducer(state, action) {
  switch(action.type){
    case "CREATE" : {
      return [action.newItem, ...state];
    }
    case "UPDATE" : {
      return state.map((it) => 
        it.id === action.targetId
          ?{
            ...it,
            isDone: !it.isDone,
          }
        : it
      );
    }
    case "DELETE" : {
      return state.filter((it) => it.id !== action.targetId);
    }
    default:{
      return state;
    }
  };
}

export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

function App() {
  const [todo, dispatch] = useReducer(reducer,mockTodo);
  const idRef = useRef(3);

  const onCreate = (content, selectedDate) => { 
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createDate: selectedDate, 
      }
    });
    idRef.current += 1;
  }

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type:"UPDATE",
      targetId,
    });
  },[]);

  const onDelete = useCallback((targetId) => {
    dispatch({
      type:"DELETE",
      targetId,
    });
  }, []);

  const memoizedDispatches = useMemo(() => {
    return {onCreate, onUpdate, onDelete };
  }, []);

  return (
    <div className='App'>
      <Header/>
      <TodoStateContext.Provider value={todo}>
        <TodoDispatchContext.Provider value={memoizedDispatches}>
          <TodoEditor/>
          <TodoList/>
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;

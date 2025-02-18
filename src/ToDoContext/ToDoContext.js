import React from 'react';
import { useHookLocalStorage } from './HookLocalStorage';

const ToDoContext = React.createContext();

function ToDoProvider(props){
  const {
    item: todos,
    changeItem,
    loading,
    error,
  } = useHookLocalStorage('todos', []);

  const {
    category: categories,
    changeCategory,
  } = useHookLocalStorage('categories', []);
  
  const [searchValue, setSearchValue] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);

  const completedTodos = todos.filter(todo => todo.completed === true).length;
  const totalTodos = todos.length;

  let searchedTodos = [];
  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  const complete = (text) => {
      const todoIndex = todos.findIndex(todo => todo.text === text);
      const newListTodo = [...todos];
      if(newListTodo[todoIndex].completed === true){
        newListTodo[todoIndex].completed = false;
      }else{
        newListTodo[todoIndex].completed = true;
      }
      changeItem(newListTodo);
  };

  const changeUrgent = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newListTodo = [...todos];
    if(newListTodo[todoIndex].urgent === true){
      newListTodo[todoIndex].urgent = false;
    }else{
      newListTodo[todoIndex].urgent = true;
    }
    changeItem(newListTodo);
  };

  const changeImportant = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newListTodo = [...todos];
    if(newListTodo[todoIndex].important === true){
      newListTodo[todoIndex].important = false;
    }else{
      newListTodo[todoIndex].important = true;
    }
    changeItem(newListTodo);
  };
      
    const deleteTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newListTodo = [...todos];
        newListTodo.splice(todoIndex, 1);
        changeItem(newListTodo);
    };

  const addToDo = (text, important, urgent, category) => {
    const newListTodo = [...todos];
    newListTodo.push({
      completed : false,
      important : important,
      urgent : urgent,
      text : text,
      category : category
    })
    changeItem(newListTodo);
  };

  const addCategory = (name) => {
    const newListcategory = [...categories];
    newListcategory.push({
      name : name,
    })
    changeCategory(newListcategory);
  };

    return(
        <ToDoContext.Provider value={{
            loading,
            error,
            totalTodos,
            complete,
            searchValue,
            setSearchValue,
            searchedTodos,
            completedTodos,
            deleteTodo,
            changeUrgent,
            changeImportant,
            addToDo,
            addCategory,
            categories,
            openModal,
            setOpenModal
        }}>
            {props.children}
        </ToDoContext.Provider>
    );
};
export { ToDoContext , ToDoProvider };
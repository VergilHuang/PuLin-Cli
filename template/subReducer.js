const todos = (state = [], action) => {

  const _generate_UUID = () => {
    function s4(){
      return ((1 + Math.random()*0x10000)|0).toString(16).substring(1);
    }
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  };

  const {type , id, title, description, todos} = action;
  
  switch (type) {
  case 'ADD_BATCH_TODO':
    return [
      ...state,
      ...todos
    ];
  case 'ADD_TODO':
    return [
      ...state,
      {
        id: _generate_UUID(),
        title: title,
        description: description === undefined ? '' : description,
        status: 'undone',
      }
    ];
  case 'DELETE_TODO':
    return state.map(todo => ( todo.id === id ? {...todo, status: 'deleted'} : todo ));
  case 'ACCOMPLISH_TODO':
    return state.map(todo => ( todo.id === id ? {...todo, status: 'completed'} : todo ));
  case 'MODIFY_DESC':
    return state.map(todo => ( todo.id === id ? {...todo, description: description} : todo));
  default :
    return state;
  }
};


export default todos;
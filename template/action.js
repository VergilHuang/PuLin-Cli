export const addTodo = (title) => ({
  type: 'ADD_TODO',
  title
});
export const addBatchTodo = (todos) => ({
  type: 'ADD_BATCH_TODO',
  todos
});

export const completeTodo = (id) => ({
  type: 'ACCOMPLISH_TODO',
  id
});

export const deleteTodo = (id) => ({
  type: 'DELETE_TODO',
  id
});

export const modifyUser = (motto) => ({
  type: 'MODIFY_USER',
  motto
});

export const modifyDesc = (id, description) => ({
  type: 'MODIFY_DESC',
  id,
  description
});

export const toggleVisibility = (commitVisibility) => ({
  type: 'TOGGLE_VISIBILITY',
  commitVisibility
});
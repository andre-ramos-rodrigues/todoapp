import './Components.css'

//função que cria as li's contendo nossos todo e adiciona dois botões, um de editar e um de deletar
export default function TodoItem({
    //props que vai receber o todo
    todo,
    //props que vai receber a função editClick de App
    onEditClick,
    //props que vai receber a função deleteClick de App
    onDeleteClick
  }) {
    return (
      //gerando a li
      <li
      className='liTodo'
      key={todo.id}><span className='todoText'>{todo.text}</span>
      <button className='btnLiTodo' onClick={() => onEditClick(todo)}>Edit</button>
      <button className='btnLiTodo' onClick={() => onDeleteClick(todo.id)}>Delete</button>
      </li>
    );
  }
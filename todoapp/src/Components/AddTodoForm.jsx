import './Components.css'

//função que cria o formulário de criar todo no modo acidionar
export default function AddTodoForm({
    // props que vai receber todo
    todo,
    //props que vai receber a função AddFormSubmit de App
    onAddFormSubmit,
    // props que vai receber a função AddInputChange de App
    onAddInputChange
  }) {
    return (
      //retornando o form
      <form onSubmit={onAddFormSubmit} className='formAdd'>
        <h1>Add Todo</h1>
        <div className='divForm'>
        <div>
        <input
          className='inputFormAdd'
          name="todo"
          type="text"
          placeholder="Create new todo"
          value={todo}
          onChange={onAddInputChange}
        />
        <button className='btnForm'>Add</button>
        </div>
        </div>
      </form>
    );
  }
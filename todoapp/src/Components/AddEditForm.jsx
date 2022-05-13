import './Components.css'

//função de editar todo no modo edição
export default function EditForm({
    //props que recebe o currentTodo
    currentTodo,
    //props que recebe setIsEditing
    setIsEditing,
    //props que recebe a função EditInputChange de App
    onEditInputChange,
    //props que recebe a função EditFormSubmit de App
    onEditFormSubmit
  }) {
    return (
      //retorna o form de edição
      <form onSubmit={onEditFormSubmit} className='formEditSubmit'>
        <h1>Edit Todo</h1>
        <div className='divForm'>
        <input
          className='inputFormAdd'
          name="updateTodo"
          type="text"
          placeholder="Update todo"
          value={currentTodo.text}
          onChange={onEditInputChange}
        />
        <button type="submit" onClick={onEditFormSubmit} className='btnForm'>
          Update
        </button>
        <button className='btnForm' onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </form>
    );
  }
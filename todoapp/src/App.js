import './App.css';
import { useState, useEffect } from "react";
import TodoItem from './Components/todoItem'
import AddTodoForm from './Components/AddTodoForm';
import AddEditForm from './Components/AddEditForm'

//A ideia do App é fazer um CRUD de tarefas (todos) usando o useState e armazenando o array de tarefas no LocalStorage(LS)
//Os formulários de acidionar todos, de editar todos e a estrutura do todo numa li serão componentizados
//a forma de captar os dados e adicioná-los é a seguinte:
//usaremos o UseState para termos nosso estado padrão da lista de todos, do que for escrito no input, do que for editado e se o modo edição estiver ativo
//o estado da lista é o que será exibido e armazenado de fato no LS, então os outros estados servirão como captadores de informação e depois terão
//seus dados tratados para que entrem no estado da lista (aqui chamado de todos)

function App() {

  //usando o useState para criar nossa listade todos
  const [todos, setTodos] = useState(() => {
    //iremos armazenar a informação da lista no localStorage(LS)
    //portanto, criamos savedTodos com o valor já salvo no LS com keyName 'todos'
    const savedTodos = localStorage.getItem("todos");
    //se já tiver algum dado salvo na LS, ou seja, se savedTodos for true:
    if (savedTodos) {
    //retorna o JSON.parse dos dados salvos
      return JSON.parse(savedTodos);
    } else {
    //caso contrário retorna um array vazio
      return [];
    }
  });

  //usando o UseState para manipularmos o que for escrito no input de criar todo
  const [todo, setTodo] = useState("");

  //usando o UseState para ligarmos ou não o modo edição
  //esse modo, se ligado, vai renderizar um formulário diferente, para que possamos editar um item já adicionado
  const [isEditing, setIsEditing] = useState(false);

  //usando o setState para idetificarmos o todo que está sendo manipulado
  const [currentTodo, setCurrentTodo] = useState({});

  //usando o UseEffect para mantermos o LS atualizado com a lista de todos
  useEffect(() => {
  //iremos enviar o valor da lista de todos sob a keyName 'todos'
    localStorage.setItem("todos", JSON.stringify(todos));
  //sempre que o diretório todos for modificado
  }, [todos]);

  //lida com modificaçõees do campo input no modo acidionar todo
  function handleAddInputChange(e) {
  //sempre que esse campo mudar, seu valor vai ser enviado para todo
    setTodo(e.target.value);
  }

  //lida com modificaçõees do campo input no modo edição
  function handleEditInputChange(e) {
  //sempre que esse campo mudar, CurrentTodo vai receber seu próprio coneteúdo (via spread operador) mais o valor do input
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }

  //lida com o envio do form no modo adicionar todo, feito para ser usado no onClick
  function handleAddFormSubmit(e) {
  //impede o comportamento padrão de atualizar o browser
    e.preventDefault();
  //o todo recebe o valor do input, então se este não estiver em branco
    if (todo !== "") {
  //todos recebe seu prórpio conteúdo (via spread operator) mais o novo item
      setTodos([
        ...todos,
        {
  //que como terá id a data que foi criado e como valor o que foi inputado no todo
          id: new Date(),
          text: todo.trim()
        }
      ]);
    }
  //após a adição, limpamos o input
    setTodo("");
  }

  //lida com a edição de um todo, recebendo como parâmetro a id e o novo texto do todo editado
  function handleUpdateTodo(id, updatedTodo) {
  //se existir algum todo com a id passada no parâmetro, updatedItem ganha o valor de updatedTodo, se não, ganha o valor de todo
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
  //desliga o modo edição
    setIsEditing(false);
  //acidiona o todo em todos
    setTodos(updatedItem);
  }

  //lida com o envio do form no modo edição, feito para ser usado no onClick
  function handleEditFormSubmit(e) {
  //impede o comportamento padrão de atualizar o browser
    e.preventDefault();
  //aciona a função handleUpdateTodo passando como parâmetro a id e o currentTodo
    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  //lida com o click no botão editar nas li's
  function handleEditClick(todo) {
  //liga o modo edição
    setIsEditing(true);
  //passa para currentTodos a lista todos (spread operator)
    setCurrentTodo({ ...todo });
  }

  //lida com o click no botão deletar nas li's
  function handleDeleteClick(id) {
  //cria uma const com a lista de todos, com exceção do elemento a ser deletado
    const removeItem = todos.filter((todo) => {
  //retorna todos os elementos que não tiverem id igual a passada no parâmetro
      return todo.id !== id;
    });
  //adiciona a nova lista em todos
    setTodos(removeItem);
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>ToDo task creator</h1>
      </header>
      
     {/* Teremos dois modos de formulários a depender do modo edição
     se isEditing for false, que é o padrão inicial, será renderizado um formulário de adicionar todos
     após o todo ser adicionado, ele contará com um botão de deletar todo e um de editar todo
     se o botão de editar for clicado, isEditing se torna true, e o formulário de edição será renderizado no lugar
     do formulário de acidionar todos */}
      {isEditing? ( //caso isEditing seja true:
        <AddEditForm  
        currentTodo={currentTodo}
        setIsEditing={setIsEditing}
        onEditInputChange={handleEditInputChange}
        onEditFormSubmit={handleEditFormSubmit}
        />
      ) : ( //caso seja false: (padrão inicial)
        <AddTodoForm
        todo={todo}
        onAddInputChange={handleAddInputChange}
        onAddFormSubmit={handleAddFormSubmit} 
        />
      )
    }
           

      {/* aqui fica a ul que vai receber as li's contendo os todos */}
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            todo={todo}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;

document.getElementById('formTask').addEventListener('submit', saveTask); //captura el evento submit (cuando se envia el formulario)


function saveTask(e){
  let title = document.getElementById('title').value; //captura el titulo ingresado
  let description = document.getElementById('description').value; //captura la descripcion ingresada
  console.log(description)

  //agregamos los datos a un objeto
  let task = {
    title,
    description
  };

  //comprobamos si hay algo en el localStorage
  if(localStorage.getItem('tasks') === null) {
    //en caso de no haber nada, agregamos la tarea nueva
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
  } else {
    //en caso de que ya hayan tareas, consultamos lo que haya en el local
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    //agregamos la nueva tarea
    tasks.push(task);
    //actualizamos
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }


  //llamamos la funcion mostrar, para que cada nueva tarea guardada se muestre
  getTasks();
  //reseteamos el formulario para que no se quede lo escrito
  document.getElementById('formTask').reset();
  e.preventDefault();
}


//Mostramos las tareas en el feed
const getTasks = () => {
    let tasks = JSON.parse(localStorage.getItem('tasks')); //consultamos el local
    let tasksView = document.getElementById('tasks'); //apuntamos el div vacio donde agregaremos las tareas
    tasksView.innerHTML = '';
    
    // recorremos las tareas guardadas en el localStorage
    tasks.forEach(task => {
        let title = task.title;
        let description = task.description;
        
        //vamos mostrando en el html cada tarea guardada en el local
        tasksView.innerHTML += `<div class="card mb-3">
        <div class="card-body">
        <p>${title} - ${description}
        <a href="#" onclick="deleteTask('${title}')" class="btn btn-danger ml-5">Delete</a>
        </p>
        </div>
        </div>`;
    });
}

//eliminando tareas
function deleteTask(title) { //recibe el titulo de la tarea como parametro
  console.log(title)
  let tasks = JSON.parse(localStorage.getItem('tasks')); //consultamos los datos en el local
  
  tasks.forEach((task, i) => {//recorremos las tareas
    if (task.title === title) {
        tasks.splice(i, 1); //una vez que el titulo coincida, eliminamos
    }
  })
 
  
  localStorage.setItem('tasks', JSON.stringify(tasks)); //actualizamos el local con la tarea eliminada
  getTasks();//mostramos el feed sin la tarea eliminada
}

//llamamos la funcion para mostrar
getTasks();
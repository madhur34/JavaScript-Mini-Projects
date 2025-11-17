//To interact with form submission
const formEl = document.querySelector('.form');
//To get the entered input
const inputEl = document.querySelector('.input');
//To add list elements in ul
const ulEl = document.querySelector('.list');

//To get the previous list data and convert to array
let list = JSON.parse(localStorage.getItem("list"));
console.log(list);

//sending each item to the list
list.forEach(task => {
  toDoList(task);
})

//inputEl.value gives the text entered.

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  toDoList(); 
})

function toDoList(task) {
  let newTask = inputEl.value; //Save entered value

  if(task) {
    newTask = task.name; //for adding the stored tasks
  }

  //Create an li element
  const listEl = document.createElement("li");

  if(task && task.checked) {
    listEl.classList.add("checked");
    
  }

  listEl.innerText = newTask;
  ulEl.appendChild(listEl);
  inputEl.value = ""; //for emptying the boxx

  //creating check button and appending it to list
  const checkbtnEl = document.createElement("div");
  checkbtnEl.innerHTML = `<i class="fas fa-check-square">`;
  listEl.appendChild(checkbtnEl);

  const trashbtnEl = document.createElement("div");
  trashbtnEl.innerHTML = `<i class="fas fa-trash">`;
  listEl.appendChild(trashbtnEl);

  //Changing the class to checked on click
  checkbtnEl.addEventListener("click", () => {
    listEl.classList.toggle("checked")
    updateLocal();
  });

  //Removing the list on click
  trashbtnEl.addEventListener("click", () => {
    listEl.remove();
    updateLocal();
  });

  updateLocal();
}

//To Store the tasks in local storage
function updateLocal() {
  //get all the list elements
  const liEls = document.querySelectorAll("li");
  let list = [];
  //store every liEl in the array
  liEls.forEach(liEl => {
    list.push({
      name: liEl.innerText,
      checked: liEl.classList.contains("checked")
    })
  })

  //Saving to Local Storage
  localStorage.setItem("list", JSON.stringify(list))
}
var cells = document.querySelectorAll("td");
var modal = document.querySelector("#modal");
var icons = document.querySelectorAll("i");
var dayNum = document.querySelectorAll("p");
var lastRow = document.querySelector("#lastRow");
var monthTitle = document.querySelector("#monthTitle");
var close = document.querySelector(".fa-times");
var plus = document.querySelector(".fa-plus");
var todoInput = document.querySelector("#todoInput");
var todoList = document.querySelector("#todoList");
var eventInput = document.querySelectorAll(".eventInput");
var pencil = document.querySelectorAll(".fa-pencil");
var eventContents = document.querySelectorAll(".eventContent");
var clickedCell;
var todos;
var months = [
  {name: "January", lastDay: 31, firstDay: 7, days: []}, {name: "February", lastDay: 28, firstDay: 10, days: []}, {name: "March", lastDay: 31, firstDay: 10, days: []}, {name: "April", lastDay: 30, firstDay: 13, days: []},
  {name: "May", lastDay: 31, firstDay: 8, days: []}, {name: "June", lastDay: 30, firstDay: 11, days: []}, {name: "July", lastDay: 31, firstDay: 13, days: []}, {name: "August", lastDay: 31, firstDay: 9, days: []},
  {name: "September", lastDay: 30, firstDay: 12, days: []}, {name: "October", lastDay: 31, firstDay: 7, days: []}, {name: "November", lastDay: 30, firstDay: 10, days: []}, {name: "December", lastDay: 31, firstDay: 12, days: []}
];
var currentMonth = months[0];

setup();

function setup() {
  clearAll();
  setDayNum();
  setupMonths();
  setupCells();
  toggleEventInput();
  editEvent();
  toggleInput();
  addTodo();
  closeModal();
  clearPills();
  makePills();
  changeMonth();
}

// clear dates from each table cell
function clearAll(){
  for (var x = 7; x < 49; x++){
    dayNum[x].innerHTML = "";
    cells[x].removeEventListener("click", toggleModal);
  }
}

//
function setDayNum(){
  for(var x = 0; x < currentMonth.lastDay; x++){
    dayNum[x + currentMonth.firstDay].innerHTML = x + 1;
  }
}

// create days obj for each day in each month
function setupMonths(){
  for(var i = 0; i < months.length; i++){
    for(var x = months[i].firstDay; x < months[i].lastDay + months[i].firstDay; x++){
      months[i].days.push({cell: {}, todos: [], events:[]});
    }
  }
}

// connect each visible cell to each corresponding day of the currentMonth, then add listeners to each
function setupCells(){
  for(var i = currentMonth.firstDay; i < currentMonth.lastDay + currentMonth.firstDay; i++){
    currentMonth.days[i - currentMonth.firstDay].cell = cells[i];
    cells[i].addEventListener("click", toggleModal);
  }
}

// fill modal with content and show modal
function toggleModal(){
  clickedCell = this;
  modal.classList.remove("hidden");
  modal.children[0].classList.remove("hidden");
  modal.children[1].classList.remove("hidden");
  for(var i = 0; i < currentMonth.days.length; i++){
    if(this === currentMonth.days[i].cell){
      currentMonth.days[i].todos.forEach(function(element){
        todoList.appendChild(element);
      });
      for(var z = 0; z < eventContents.length; z++){
        if(currentMonth.days[i].events[z] !== undefined){
          eventContents[z].innerHTML = currentMonth.days[i].events[z];
        } else {
          eventContents[z].innerHTML = "";
        }

      }
      break;
    }
  }
}

// toggle input box under each event
function toggleEventInput(){
  for(var i = 0; i < pencil.length; i++){
    pencil[i].addEventListener("click", function(){
      this.parentElement.nextElementSibling.classList.toggle("hidden");
    });
  }
}

//edit event workings for both the event list and the currentMonth.days obj
function editEvent(){
  for(var i = 0; i < eventInput.length; i++){
    eventInput[i].addEventListener("change", function(){
      this.previousElementSibling.lastElementChild.previousElementSibling.innerHTML = this.value;
      for(var i = 0; i < currentMonth.days.length; i++){
        if(clickedCell.firstChild.textContent === currentMonth.days[i].cell.firstChild.textContent){
          currentMonth.days[i].events.push(this.value);
          break;
        };
      }
    });
  }
}

// show.hide todo input box
function toggleInput(){
  plus.addEventListener("click", function(){
    todoInput.classList.toggle("hidden");
  });
}

// add todo workings both on screen and behind the scenes
function addTodo(){
  todoInput.addEventListener("change", function(){
    if(todoList.children.length < 12){
      var node = document.createElement("LI");
      var textnode = document.createTextNode(todoInput.value);
      node.innerHTML = "<span class='delete'><i class='fa fa-trash'></i></span>";
      node.appendChild(textnode);
      todoList.appendChild(node);
      for(var i = 0; i < currentMonth.days.length; i++){
        if(clickedCell.firstChild.textContent === currentMonth.days[i].cell.firstChild.textContent){
          currentMonth.days[i].todos.push(node);
          break;
        };
      }
      deleteTodo();
      completeTodo();
      todoInput.value = "";
    } else {
      alert("Too many TODOS!!! Try doing some!");
    }
  });
}

function deleteTodo(){
  var trash = document.querySelectorAll(".delete");
  for(var z = 0; z < trash.length; z++){
  trash[z].addEventListener("click", function(){
    for(var i = 0; i < currentMonth.days.length; i++){
      if(clickedCell.firstChild.textContent === currentMonth.days[i].cell.firstChild.textContent){
        var today = currentMonth.days[i];
        for(var j = 0; j < today.todos.length; j++){
          if(this.parentElement === today.todos[j]){
            today.todos.splice(j,1);
            break;
          }
        }
        break;
      };
    }
    for(var x = 0; x < todoList.children.length; x++){
      if(todoList.children[x] === this.parentElement){
        todoList.removeChild(todoList.children[x]);
        break;
      }
    }
  });
  }
}

// cross out todo to show completion
function completeTodo(){
  var todos = document.querySelectorAll("li");
  for(var z = 0; z < todos.length; z++){
    if(!todos[z].addEventListener("click", completed)){
      todos[z].addEventListener("click", completed);
    }
  }
}

function completed(){
  this.classList.toggle("completed");
}

// hide and clear modal
// refresh all data in visible aspect of calendar upon closing mdodal
function closeModal(){
  close.addEventListener("click", function(){
    modal.classList.add("hidden");
    modal.children[0].classList.add("hidden");
    modal.children[1].classList.add("hidden");
    while (todoList.firstChild) {
      todoList.removeChild(todoList.firstChild);
    }
    for(var x = 0; x < eventContents.length; x++){
      eventContents[x].innerHTML = "";
    }
    clearPills();
    makePills();
  });
}

// reset events and todo pills on each claendar cell
function clearPills(){
  for(var i = 7; i < 42; i++){
    cells[i].children[2].classList.add("hidden");
    cells[i].children[2].innerHTML = "";
    cells[i].children[4].classList.add("hidden");
    cells[i].children[4].innerHTML = "";
  }
}

// update and show events/todo pills for each calendar cell (needs to be refactored)
function makePills(){
  for(var i = 0; i < currentMonth.days.length; i++){
    switch(currentMonth.days[i].todos.length){
      case 0:
      break;

      case null:
      break;

      case undefined:
      break;

      default:
      cells[i + currentMonth.firstDay].children[2].innerHTML = "x " + currentMonth.days[i].todos.length;
      cells[i + currentMonth.firstDay].children[2].classList.remove("hidden");
      break;
    }

    switch(currentMonth.days[i].events.length){
      case 0:
      break;

      case null:
      break;

      case undefined:
      break;

      default:
      cells[i + currentMonth.firstDay].children[4].innerHTML = "x " + currentMonth.days[i].events.length;
      cells[i + currentMonth.firstDay].children[4].classList.remove("hidden");
      break;
    }

    if (currentMonth.days[i].events.length > 0 && currentMonth.days[i].todos.length > 0){
        cells[i + currentMonth.firstDay].children[0].classList.add("bothPills");
    }
  }
}

// reset calendar for next month or previous month
function changeMonth(){
  for(var i = 0; i < 2; i++){
    icons[i].addEventListener("click", function(){
      if(this === icons[0]){
        var y = -1;
      } else {
        var y = 1;
      }
      for(var x = 0; x < months.length; x++){
        if(months[x] == currentMonth){
          monthTitle.innerHTML = months[x + y].name;
          break;
        }
      }
      currentMonth = months[x + y];
      console.log(currentMonth.name);
      if (currentMonth.name === "April" || currentMonth.name === "July" || currentMonth.name === "December"){
        lastRow.classList.remove("hidden");
      } else {
        lastRow.classList.add("hidden");
      }
      clearAll();
      setDayNum();
      setupCells();
      clearPills();
      makePills();
    });
  }
}

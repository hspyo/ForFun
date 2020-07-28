// 요소를 받아온다.
var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTaskHolder = document.getElementById('incomplete-tasks');
var completeTaskHolder = document.getElementById('completed-tasks');

// New task list item
var createNewTaskElement=function(taskString){
  
  // 새로운 리스트를 요소 만들고
  var listItem = document.createElement("li"); 
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");

  label.innerText = taskString; // 

  // 속성지정
  checkBox.type = "checkbox"; 
  editInput.type = "text";

  editButton.innerText = "Edit";
  editButton.className = "edit"; // button 클래스이름 edit으로 지정하는 것.
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  // li에 담아준다.
  listItem.appendChild(checkBox); 
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  // 모든 값과 요소가 담긴 li값 리턴
  return listItem; 

}

var addTask = function() {
  console.log("Add Task...")
  var listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted); 
  taskInput.value="";
}

var editTask=function(){
  console.log("Edit Task..");
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode; // parentNode는 completetask 또는 incompletetask

  var editInput = listItem.querySelector("input[type=text]"); // 해당 li를 input을 읽어온후 editInput에 다시 담아준다.
  var label = listItem.querySelector("label");   // 해당 li의 label을 읽어온 후 label에 담는다.
  var containsClass = listItem.classList.contains("editMode"); // li에 editMode값이 존재하는지 확인 (true / false)

    if(containsClass){   // li에 edit모드가 있으면 (true면)
      label.innerText = editInput.value; // editInput(수정된 내용)을 담아주고
    }else {
      editInput.value = label.innerText; // 아니면 원래 내용을 담아준다.
    }

    listItem.classList.toggle("editMode"); // Class 가 존재하면 값을 추가하고 아니면 삭제한다.
}

var deleteTask = function() {
  console.log("Delete Task..");

  var listItem = this.parentNode; // 어느 부모의 속한 li 인지 지정
  var ul = listItem.parentNode;  // ul에 li가 속한 ul의 값을 담고

  ul.removeChild(listItem); // 해당 ul의 li를 제거한다.
}

var taskCompleted = function() {
  console.log("Complete Task ....");

  var listItem = this.parentNode;
  completeTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete); 
}

var taskIncomplete = function() {
  console.log("Incomplete Task...");

  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted); 
}

// var ajaxRequest = function() {
//   console.log("AJAX Request");
// }

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
// addButton.addEventListener("click", ajaxRequest);

// tasklistItem과 checkBoxEventHandler를 매개변수로 받아.
// incomplete와 complete 둘 중 하나로 분류한다.
var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");

  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

  for (var i=0; i<incompleteTaskHolder.children.length;i++){
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
  }

  for (var i = 0; i<completeTaskHolder.children.length; i++) {
    bindTaskEvents(completeTaskHolder.children[i], taskIncomplete);
  }


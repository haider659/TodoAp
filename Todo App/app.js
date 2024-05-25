
  const firebaseConfig = {
    apiKey: "AIzaSyC_KPPrmbudY2m7tolpizMGFvp-0N4-zEc",
    authDomain: "todoapp-9c685.firebaseapp.com",
    projectId: "todoapp-9c685",
    storageBucket: "todoapp-9c685.appspot.com",
    databaseURL: "https://todoapp-9c685-default-rtdb.firebaseio.com",
    messagingSenderId: "418510943156",
    appId: "1:418510943156:web:d2e58da469ce55585938e1"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

  
var list = document.getElementById("list");
firebase
  .database()
  .ref("todos")
  .on("child_added", function (data) {
    var liElement = document.createElement("li");
    var liText = document.createTextNode(data.val().todoVal);
    liElement.appendChild(liText);
    list.appendChild(liElement);
    var EditBtnELement = document.createElement("button");
    var EditBtnText = document.createTextNode("Edit");
    EditBtnELement.appendChild(EditBtnText);
    var DeleteBtnELement = document.createElement("button");
    var DeleteBtnText = document.createTextNode("Delete");
    DeleteBtnELement.appendChild(DeleteBtnText);
    liElement.appendChild(EditBtnELement);
    liElement.appendChild(DeleteBtnELement);
    EditBtnELement.setAttribute("class", "Editbtn");
    DeleteBtnELement.style.backgroundColor = "lightcoral";
    DeleteBtnELement.setAttribute("onclick", "deleteItem(this)");
    DeleteBtnELement.setAttribute("id", data.val().key);
    EditBtnELement.setAttribute("onclick", "EditItem(this)");
    EditBtnELement.setAttribute("id", data.val().key);
  });
function addTodo() {
  var input = document.getElementById("todoInput");
  var id = Date.now().toString(25);
  var todoObj = {
    todoVal: input.value,
    key: id,
  };
  firebase
    .database()
    .ref("todos/" + id)
    .set(todoObj);
}
function deleteAll() {
  firebase.database().ref("todos").remove();
  list.innerHTML = "";
}
function deleteItem(e) {
  firebase.database().ref(`todos/${e.id}`).remove();
  e.parentNode.remove();
}
function EditItem(e) {
  var updateValue = prompt(
    "Enter updated value",
    e.parentNode.firstChild.nodeValue
  );
  firebase.database().ref(`todos/${e.id}`).set({
    key: e.id,
    todoVal: updateValue,
  });
  e.parentNode.firstChild.nodeValue = updateValue;
}
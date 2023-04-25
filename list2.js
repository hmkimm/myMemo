const form = document.querySelector("form");
const input = document.querySelector("input");
const textarea = document.querySelector("textarea");
const ul = document.querySelector("ul");
const delAll = document.querySelector(".delAll");
const display = document.querySelector("display");

let todos = [];
const save = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const delItem = (event) => {
  const target = event.target.parentElement;

  todos = todos.filter((todo) => todo.id != target.id);

  // save();
  target.remove();
  save();
};

const addItem = (todo) => {
  if (todo.text !== "") {
    const liWrapper = document.createElement("div");
    const li = document.createElement("li");
    const button = document.createElement("button");
    const span = document.createElement("span");
    const span1 = document.createElement("span");
    const p = document.createElement("p");

    span.innerText = todo.text + " : ";
    button.innerHTML = "X";
    span1.innerHTML = todo.context;
    p.innerHTML = new Date().toLocaleDateString();

    button.addEventListener("click", delItem);
    delAll.addEventListener("click", delAllItem);

    ul.append(liWrapper);
    liWrapper.append(li, button);
    li.append(p, span, span1);
    li.id = todo.id;

    // li 스타일 적용
    li.classList.add("li-style");
    li.addEventListener("click", () => {
      li.classList.toggle("horizontal-line");
    });
    p.setAttribute("class", "date");
    liWrapper.setAttribute("class", "wrapper");
  } else if (todo.text === "") {
    // alert("할 일을 입력하세요!");
  }
};

const delAllItem = (event) => {
  const $liLists = document.querySelectorAll("div");
  const yes = confirm("정말 모두 삭제하시겠습니까?");

  if (yes) {
    for (let i = 0; i < $liLists.length; i++) {
      $liLists[i].remove();
    }
    localStorage.removeItem("todos");
  }
};

const handler = (event) => {
  event.preventDefault();

  const todo = {
    id: Date.now(),
    text: input.value,
    context: textarea.value,
  };

  todos.push(todo);
  addItem(todo);
  save();

  input.value = "";
  textarea.value = "";
  // display.prepend(ul);

  // 로컬스토리지에 todos 배열을 저장합니다.
  localStorage.setItem("todos", JSON.stringify(todos));
};

form.addEventListener("submit", handler);

const init = () => {
  const userTodos = JSON.parse(localStorage.getItem("todos"));
  //저장된 거 화면에 띄우기

  if (userTodos) {
    //userTodos가 있는 경우에 실행하게
    userTodos.forEach((todo) => {
      addItem(todo);
    });
    //가져온 배열을 전역에서 사용하는 배열 todos에도 대입
    todos = userTodos;
  }
};

init();

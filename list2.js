const form = document.querySelector("form");
const input = document.querySelector("input");
const textarea = document.querySelector("textarea");
const ul = document.querySelector("ul");
const delAll = document.querySelector(".delAll");
const display = document.querySelector("display");
// const getCurrentDateTime = () => {
//   const date = new Date();
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");
//   const hours = String(date.getHours()).padStart(2, "0");
//   const minutes = String(date.getMinutes()).padStart(2, "0");

//   return `${year}-${month}-${day} ${hours}:${minutes}`;
// };

let todos = [];
const save = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const delItem = (event) => {
  const target = event.target.parentElement;

  todos = todos.filter((todo) => todo.id != target.id);

  // 필터링 한 결과를 다시 로컬스토리지에 저장
  save();
  // 화면에서 li삭제
  target.remove();
};

const addItem = (todo) => {
  if (todo.text !== "") {
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

    ul.append(li);
    li.append(button, p, span, span1);
    // 개별 삭제를 정확히 하기 위해 li에 todo 객체의 id 부여
    li.id = todo.id;

    // display.prepend(li);

    // li 스타일 적용
    li.classList.add("li-style");
    li.addEventListener("click", () => {
      li.classList.toggle("horizontal-line");
    });
    p.setAttribute("class", "date");
  } else if (todo.text === "") {
    alert("할 일을 입력하세요!");
  }
};

const delAllItem = (event) => {
  const $liLists = document.querySelectorAll("li");
  const yes = confirm("정말 모두 삭제하시겠습니까?");

  if (yes) {
    for (let i = 0; i < $liLists.length; i++) {
      $liLists[i].remove();
    }
    localStorage.removeItem("todos");
  }
};

const handler = (event) => {
  // 엔터 누를때마다 submit(새로고침)되는거 방지
  event.preventDefault();

  // 내가 작성한 li를 todo객체에 저장
  const todo = {
    id: Date.now(),
    text: input.value,
    context: textarea.value,
  };

  // 위에서 생성된 객체를 todos배열에 입력
  todos.push(todo);

  // li 생성
  addItem(todo);
  // 생성한 li를 로컬스토리지에 todos 배열로 저장
  save();

  input.value = "";
  textarea.value = "";
  // ul.prepend("li");
};

form.addEventListener("submit", handler);

const init = () => {
  //로컬에서 저장된 배열 가져온 후, 그것을 다시 객체 문법으로 바꿔주기
  const userTodos = JSON.parse(localStorage.getItem("todos"));

  //userTodos가 있는 경우에 실행하게
  if (userTodos) {
    //위에서 가져온 배열 안에 있는 todo객체를 forEach로 순회하면서 다시 화면에 띄우기
    userTodos.forEach((todo) => {
      addItem(todo);
    });
    //가져온 배열을 전역에서 사용하는 배열 todos에도 대입
    todos = userTodos;
  }
};
init();

let goals = JSON.parse(localStorage.getItem("goals")) || [];

function addGoal() {
  const goalText = document.getElementById("goalInput").value.trim();
  const category = document.getElementById("category").value;

  if (goalText === "") {
    alert("Please enter a goal!");
    return;
  }

  const goal = {
    text: goalText,
    category: category,
    done: false
  };

  goals.push(goal);
  saveGoals();
  renderGoals();

  document.getElementById("goalInput").value = "";
}

function renderGoals() {
  const goalList = document.getElementById("goalList");
  goalList.innerHTML = "";

  let completed = 0;

  goals.forEach((goal, index) => {
    const li = document.createElement("li");
    const label = document.createElement("span");
    label.textContent = `[${goal.category}]`;

    li.textContent = goal.text;
    li.appendChild(label);

    if (goal.done) {
      li.classList.add("done");
      completed++;
    }

    li.onclick = () => toggleGoal(index);

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteGoal(index);
    };

    li.appendChild(delBtn);
    goalList.appendChild(li);
  });

  // Show progress
  document.getElementById("progressDisplay").textContent =
    `✅ ${completed} of ${goals.length} completed`;
}

function toggleGoal(index) {
  goals[index].done = !goals[index].done;
  saveGoals();
  renderGoals();
}

function deleteGoal(index) {
  goals.splice(index, 1);
  saveGoals();
  renderGoals();
}

function saveGoals() {
  localStorage.setItem("goals", JSON.stringify(goals));
}

renderGoals();



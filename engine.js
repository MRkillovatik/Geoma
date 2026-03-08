let ggb = null;
let taskData = null;
let step = 0;

let params = {
  appName: "geometry",
  width: 850,
  height: 600,
  showToolBar: false,
  showMenuBar: false,
  showAlgebraInput: false,
  appletOnLoad(api) {
    ggb = api;
    if (typeof api.setPerspective === "function") {
      api.setPerspective("G");
    }
    if (typeof api.setAlgebraVisible === "function") {
      api.setAlgebraVisible(false);
    }
    loadTask();
  },
};

let app = new GGBApplet(params, true);

window.addEventListener("load", () => {
  app.inject("ggb");
});

function loadTask() {
  fetch("triangle1.json")
    .then((res) => res.json())
    .then((data) => {
      taskData = data;
      step = 0;
      renderGiven();
      renderAnalysis();
      renderSteps();
    });
}

function renderGiven() {
  document.getElementById("given").innerHTML = taskData.given.join("<br>");
}

function renderAnalysis() {
  document.getElementById("analysis").innerHTML =
    taskData.analysis.join("<br>");
}

function renderSteps() {
  let container = document.getElementById("steps");
  container.innerHTML = "";
  taskData.steps.forEach((s, i) => {
    let div = document.createElement("div");
    div.id = "step" + i;
    div.className = "step";
    div.innerText = i + 1 + ". " + s.text;
    container.appendChild(div);
  });
}

function highlightStep() {
  document
    .querySelectorAll(".step")
    .forEach((e) => e.classList.remove("active"));
  if (step > 0)
    document.getElementById("step" + (step - 1)).classList.add("active");
}

function runStep(index) {
  if (!ggb || !taskData) return;
  let current = taskData.steps[index];
  if (!current) return;
  current.commands.forEach((cmd) => ggb.evalCommand(cmd));
  fixAllObjects();
}

function fixAllObjects() {
  if (!ggb) return;
  try {
    const count = ggb.getObjectNumber();
    for (let i = 0; i < count; i++) {
      const name = ggb.getObjectName(i);
      if (!name) continue;
      if (typeof ggb.setFixed === "function") {
        ggb.setFixed(name, true);
      }
    }
  } catch (e) {
    // игнорируем ошибки фиксации, чтобы не ломать сценарий шагов
  }
}

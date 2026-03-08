document.getElementById("nextBtn").addEventListener("click", () => {
  if (!ggb || !taskData) return;
  if (step < taskData.steps.length) {
    step++;
    highlightStep();
    runStep(step - 1);
  }
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (!ggb || !taskData) return;
  if (step > 0) {
    step--;
    ggb.reset();
    for (let i = 0; i < step; i++) runStep(i);
    highlightStep();
  }
});

document.getElementById("resetBtn").addEventListener("click", () => {
  if (!ggb || !taskData) return;
  step = 0;
  ggb.reset();
  highlightStep();
});

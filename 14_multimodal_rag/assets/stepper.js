/* Reusable step-through component.
   Markup contract:
     <div class="stepper" id="...">
       <div class="step-pane">…</div>  (one per step, in order)
       <div class="stepper-controls">
         <button class="ctl" data-act="back">◀ Back</button>
         <button class="ctl primary" data-act="next">Next ▶</button>
         <button class="ctl" data-act="reset">↺ Restart</button>
         <span class="stepper-progress"></span>
       </div>
     </div>
   Call initStepper(rootEl) or let the auto-init below find them. */

function initStepper(root) {
  const panes = Array.from(root.querySelectorAll(":scope > .step-pane"));
  const back = root.querySelector('[data-act="back"]');
  const next = root.querySelector('[data-act="next"]');
  const reset = root.querySelector('[data-act="reset"]');
  const progress = root.querySelector(".stepper-progress");
  let i = 0;

  function render() {
    panes.forEach((p, j) => p.classList.toggle("active", j === i));
    if (back) back.disabled = i === 0;
    if (next) next.disabled = i === panes.length - 1;
    if (progress) progress.textContent = `Step ${i + 1} of ${panes.length}`;
    root.dispatchEvent(new CustomEvent("stepchange", { detail: { index: i } }));
  }
  if (back) back.addEventListener("click", () => { if (i > 0) { i--; render(); } });
  if (next) next.addEventListener("click", () => { if (i < panes.length - 1) { i++; render(); } });
  if (reset) reset.addEventListener("click", () => { i = 0; render(); });
  render();
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".stepper").forEach(initStepper);
});

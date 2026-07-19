/* Reusable quiz component (retrieval practice with instant feedback).
   Markup contract:
     <div class="quiz-q">
       <p class="qtext">Question?</p>
       <button class="quiz-opt" data-good="1" data-why="Why this is right.">Option A</button>
       <button class="quiz-opt" data-why="Why this is wrong.">Option B</button>
       ...
       <div class="quiz-feedback"></div>
     </div>
   Keep every option the same word count — no formatting clues. */

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".quiz-q").forEach((q) => {
    const opts = q.querySelectorAll(".quiz-opt");
    const fb = q.querySelector(".quiz-feedback");
    opts.forEach((opt) => {
      opt.addEventListener("click", () => {
        const good = opt.dataset.good === "1";
        opts.forEach((o) => {
          o.disabled = true;
          if (o.dataset.good === "1") o.classList.add("correct");
        });
        if (!good) opt.classList.add("wrong");
        if (fb) {
          fb.textContent = (good ? "✓ Correct. " : "✗ Not quite. ") + (opt.dataset.why || "");
          fb.classList.add("show", good ? "good" : "bad");
        }
      });
    });
  });
});

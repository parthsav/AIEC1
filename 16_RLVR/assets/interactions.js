// Shared interactive behaviors for this workspace's lessons.
// Reuse these instead of inlining quiz/stepper/toggle logic in a new lesson.

// Quiz: any group of buttons wrapped in [data-quiz], each button with
// data-correct="true|false", followed by a sibling .feedback element.
function initQuizzes() {
  document.querySelectorAll('[data-quiz]').forEach(group => {
    const fb = group.parentElement.querySelector('.feedback');
    group.querySelectorAll('.choice').forEach(btn => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('.choice').forEach(b => b.classList.remove('correct', 'wrong'));
        const correct = btn.dataset.correct === 'true';
        btn.classList.add(correct ? 'correct' : 'wrong');
        if (fb) {
          fb.textContent = correct
            ? (btn.dataset.rightMsg || 'Correct.')
            : (btn.dataset.wrongMsg || group.dataset.wrongMsg || 'Not quite — try again.');
          fb.classList.add('show');
        }
      });
    });
  });
}

// Step-through: a container with class "stepper" holding ".step" children
// (first marked "active"), plus two buttons with data-stepper-prev /
// data-stepper-next pointing at the stepper's id via data-target, and an
// element with data-stepper-count="targetId" for the "Step X of N" label.
function initSteppers() {
  document.querySelectorAll('.stepper').forEach(stepper => {
    const id = stepper.id;
    const steps = stepper.querySelectorAll('.step');
    const prev = document.querySelector(`[data-stepper-prev="${id}"]`);
    const next = document.querySelector(`[data-stepper-next="${id}"]`);
    const count = document.querySelector(`[data-stepper-count="${id}"]`);
    let i = Array.from(steps).findIndex(s => s.classList.contains('active'));
    if (i < 0) i = 0;
    function render() {
      steps.forEach((s, idx) => s.classList.toggle('active', idx === i));
      if (count) count.textContent = `Step ${i + 1} of ${steps.length}`;
      if (prev) prev.disabled = i === 0;
      if (next) next.disabled = i === steps.length - 1;
    }
    if (prev) prev.addEventListener('click', () => { if (i > 0) { i--; render(); } });
    if (next) next.addEventListener('click', () => { if (i < steps.length - 1) { i++; render(); } });
    render();
  });
}

// Toggle group: buttons with data-toggle="panelId" show exactly one panel
// (by id) inside a shared container at a time; panels start with the
// first one visible via the "active" class.
function initToggleGroups() {
  document.querySelectorAll('[data-toggle-group]').forEach(group => {
    const buttons = group.querySelectorAll('[data-toggle]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const panelId = btn.dataset.toggle;
        group.querySelectorAll('.toggle-panel').forEach(p => {
          p.classList.toggle('active', p.id === panelId);
        });
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initQuizzes();
  initSteppers();
  initToggleGroups();
});

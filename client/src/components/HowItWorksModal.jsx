import React from 'react';

const steps = [
  {
    title: '1. Sign up or log in',
    desc: 'Create an account with your name, email, and password. Your tasks are private — only you can see them.',
  },
  {
    title: '2. Add a task',
    desc: 'Use the form at the top to give your task a title and description. It\'s saved instantly and shows up in your task list below.',
  },
  {
    title: '3. Track progress',
    desc: 'Every task starts as "Pending". Update it to "In Progress" once you start, and "Completed" once you\'re done.',
  },
  {
    title: '4. Edit or delete anytime',
    desc: 'Click into any task card to edit its details, change its status, or remove it entirely.',
  },
  {
    title: '5. Your tasks stay yours',
    desc: 'Every task is tied to your account. No other user can ever see, edit, or delete your tasks — and you can\'t see theirs.',
  },
];

const HowItWorksModal = ({ onClose }) => {
  return (
    <div className="how-it-works-overlay" onClick={onClose}>
      <div className="how-it-works-modal" onClick={(e) => e.stopPropagation()}>
        <div className="how-it-works-header">
          <h2>📘 How Task Manager Works</h2>
          <button className="how-it-works-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="how-it-works-steps">
          {steps.map((step) => (
            <div className="how-it-works-step" key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>

        <button className="btn" style={{ width: '100%' }} onClick={onClose}>
          Got it, let's go!
        </button>
      </div>
    </div>
  );
};

export default HowItWorksModal;

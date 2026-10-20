import SectionHeading from './SectionHeading';
import './WorkflowSection.css';

const STEPS = [
  {
    title: 'Pick a tool',
    text: 'Each tool implements one provision, and says which one.',
  },
  {
    title: 'Enter the facts',
    text: 'Only the essential inputs are required; everything else has a sensible default.',
  },
  {
    title: 'Calculate and verify',
    text: 'See the amount with its full working, laid out for checking.',
  },
  {
    title: 'Use it in the order',
    text: 'Copy the draft paragraph in English or Hindi, print a report or share it.',
  },
];

export default function WorkflowSection() {
  return (
    <section aria-labelledby="workflow-heading">
      <SectionHeading
        id="workflow-heading"
        eyebrow="How it works"
        title="From facts to order in four steps"
      />
      <ol className="workflow">
        {STEPS.map((step, index) => (
          <li key={step.title} className="workflow__step">
            <span className="workflow__number">{index + 1}</span>
            <h3 className="workflow__title">{step.title}</h3>
            <p className="workflow__text">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

import { Button, Card } from '@/shared/ui';
import { toolPath } from '@/tools/registry';
import SectionHeading from './SectionHeading';
import './ToolGuideSection.css';

/** User manual and legal basis for one tool, generated from its `guide` content. */
export default function ToolGuideSection({ tool }) {
  const { guide } = tool;
  const headingId = `guide-${tool.id}`;

  return (
    <section aria-labelledby={headingId} className="tool-guide">
      <SectionHeading
        id={headingId}
        eyebrow="User manual & legal basis"
        title={tool.fullName}
        lead={guide.purpose}
      />

      <ol className="tool-guide__procedure">
        {guide.procedure.map((step, index) => (
          <li key={step.title}>
            <span className="tool-guide__procedure-index">{index + 1}</span>
            <div>
              <p className="tool-guide__procedure-title">{step.title}</p>
              <p className="tool-guide__muted">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="tool-guide__grid">
        <Card title="How to use">
          <ol className="tool-guide__steps">
            {guide.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <Button to={toolPath(tool)} icon="arrowRight" className="tool-guide__open">
            Open the calculator
          </Button>
        </Card>

        <Card title="Key rules applied">
          <dl className="tool-guide__rules">
            {guide.rules.map((rule) => (
              <div key={rule.term}>
                <dt>{rule.term}</dt>
                <dd>{rule.text}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>

      <Card title="Legal basis" className="tool-guide__authorities">
        <ul>
          {guide.authorities.map((authority) => (
            <li key={authority.title}>
              <p className="tool-guide__authority-title">{authority.title}</p>
              <p className="tool-guide__muted">{authority.text}</p>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}

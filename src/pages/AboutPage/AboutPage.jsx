import { DISCLAIMER, PRINCIPLES, SITE } from '@/config/site';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { Card, PageHeader } from '@/shared/ui';
import { TOOLS } from '@/tools/registry';
import './AboutPage.css';

export default function AboutPage() {
  useDocumentTitle('About');

  return (
    <div className="about">
      <PageHeader
        eyebrow={`About ${SITE.name}`}
        title={
          <>
            {SITE.name} <span lang="hi">({SITE.nameHindi})</span>
          </>
        }
        description={`${SITE.name} — “${SITE.meaning}” — brings together the calculations and references that come up every day in court work, so that figures in an order are quick to arrive at and easy to verify.`}
      />

      <div className="about__grid">
        <Card title="Principles">
          <ul className="about__list">
            {PRINCIPLES.map((principle) => (
              <li key={principle.title}>
                <strong>{principle.title}.</strong> {principle.text}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Available tools">
          <ul className="about__list">
            {TOOLS.map((tool) => (
              <li key={tool.id}>
                <strong>{tool.fullName}</strong>
                <br />
                <span className="about__muted">{tool.statute}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card title="Disclaimer" className="about__disclaimer">
        <p>{DISCLAIMER}</p>
      </Card>
    </div>
  );
}

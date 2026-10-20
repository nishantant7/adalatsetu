import { Card, PageHeader } from '@/shared/ui';
import { SITE } from '@/config/site';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
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
        description="AdalatSetu — “a bridge to the court” — brings together the calculations and references that come up every day in court work, so that figures in an order are quick to arrive at and easy to verify."
      />

      <div className="about__grid">
        <Card title="Principles">
          <ul className="about__list">
            <li>
              <strong>Statute first.</strong> Every tool cites the provision it implements and shows
              its working.
            </li>
            <li>
              <strong>Transparent.</strong> Each figure can be traced step by step, ready for the
              order sheet.
            </li>
            <li>
              <strong>Private.</strong> Nothing you enter leaves your device; saved calculations
              stay in your browser.
            </li>
            <li>
              <strong>Bilingual.</strong> Drafts are available in English and Hindi.
            </li>
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
        <p>
          {SITE.name} is an aid to calculation and drafting. It is not legal advice and does not
          replace judicial application of mind. Verify every figure against the statute, the
          applicable rate of duty and the facts of the case before relying on it.
        </p>
      </Card>
    </div>
  );
}

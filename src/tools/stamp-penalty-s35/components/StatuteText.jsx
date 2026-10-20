import { Card } from '@/shared/ui';
import {
  GAZETTE_REFERENCE,
  RELATED_AMENDMENTS,
  SECTION_35_EN,
  SECTION_35_HI,
} from '../content/statute';

export default function StatuteText() {
  return (
    <div className="stamp-tool__prose">
      <p className="stamp-tool__muted">{GAZETTE_REFERENCE}</p>

      <Card title="Section 35, proviso, clause (a) — as substituted">
        <blockquote className="stamp-tool__quote">
          {SECTION_35_EN.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </blockquote>
        <blockquote className="stamp-tool__quote" lang="hi">
          {SECTION_35_HI.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </blockquote>
      </Card>

      <Card title="Related changes by the same Act">
        <dl className="stamp-tool__related">
          {RELATED_AMENDMENTS.map((item) => (
            <div key={item.section}>
              <dt>{item.section}</dt>
              <dd>{item.text}</dd>
            </div>
          ))}
        </dl>
      </Card>
    </div>
  );
}

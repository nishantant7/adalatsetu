import { Button, Card } from '@/shared/ui';
import { GUIDE } from '../content/guide';

export default function HowItWorks({ onLoadExample }) {
  return (
    <div className="stamp-tool__prose">
      <Card title="When is this used?">
        <p>{GUIDE.purpose}</p>
        <ol>
          {GUIDE.procedure.map((step) => (
            <li key={step.title}>
              <strong>{step.title}.</strong> {step.text}
            </li>
          ))}
        </ol>
      </Card>

      <Card title="Formula">
        <div className="stamp-tool__formula">
          <p>Deficit (A) = (Market value × Rate %) − Stamp duty paid</p>
          <p>Months (M) = whole months date to date + remaining days ÷ 30</p>
          <p>Penalty (B) = A × 1% × M, but never more than A</p>
          <p>Interest (C) = A × 1% × M, with no upper limit</p>
          <p>
            <strong>Total = A + B + C</strong> — each amount rounded up to the next rupee
          </p>
        </div>
        <dl className="stamp-tool__rules">
          {GUIDE.rules.map((rule) => (
            <div key={rule.term}>
              <dt>{rule.term}</dt>
              <dd>{rule.text}</dd>
            </div>
          ))}
        </dl>
      </Card>

      <Card
        title="Worked example"
        actions={
          <Button variant="secondary" size="sm" icon="sparkle" onClick={onLoadExample}>
            Load into calculator
          </Button>
        }
      >
        <p>
          Market value ₹6,50,000, stamp duty paid ₹1,000, rate 5% → proper duty ₹32,500, so the
          deficit is <strong>₹31,500</strong>. Executed 20-07-2017, hearing on 20-04-2026: exactly
          105 months. The penalty works out to ₹33,075, more than the deficit, so it is restricted
          to <strong>₹31,500</strong>. Interest is <strong>₹33,075</strong>. Total payable ={' '}
          <strong>₹96,075</strong> (₹63,000 if interest is excluded).
        </p>
      </Card>

      <Card title="Counting the period">
        <ul>
          <li>The execution day is counted; the hearing day is not.</li>
          <li>Executed 15-Jan, hearing 15-Feb → 1 month (15-Jan to the end of 14-Feb).</li>
          <li>Executed 15-Jan, hearing 20-Feb → 1 month + 5 days (15–19 Feb) = 1 + 5/30 months.</li>
          <li>Executed 31-Jan → the first month ends with 27-Feb (28-Feb in a leap year).</li>
        </ul>
      </Card>
    </div>
  );
}

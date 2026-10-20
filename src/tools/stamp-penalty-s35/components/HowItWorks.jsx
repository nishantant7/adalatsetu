import { Card } from '@/shared/ui';

export default function HowItWorks() {
  return (
    <div className="stamp-tool__prose">
      <Card title="When is this used?">
        <p>
          During a proceeding, a party tenders an instrument — an agreement to sell, sale deed,
          lease and so on — that is not duly stamped. The Court:
        </p>
        <ol>
          <li>
            <strong>Impounds</strong> the instrument under <strong>Section 33</strong> of the Indian
            Stamp Act, 1899.
          </li>
          <li>
            Admits it in evidence under <strong>clause (a) of the proviso to Section 35</strong>{' '}
            only on payment of the deficit duty, penalty and interest.
          </li>
          <li>
            Sends the instrument, or an authenticated copy, to the{' '}
            <strong>Collector under Section 38</strong> after the amount is realised.
          </li>
        </ol>
      </Card>

      <Card title="Formula">
        <div className="stamp-tool__formula">
          <p>Deficit (A) = (Market value × Rate %) − Stamp duty paid</p>
          <p>Months (M) = months from execution to payment; any part of a month counts as full</p>
          <p>Penalty (B) = A × 1% × M, but never more than A</p>
          <p>Interest (C) = A × 1% × M, with no upper limit</p>
          <p>
            <strong>Total = A + B + C</strong> — each amount rounded up to the next rupee
          </p>
        </div>
      </Card>

      <Card title="Worked example">
        <p>
          Market value ₹6,50,000, stamp duty paid ₹1,000, rate 5% → proper duty ₹32,500, so the
          deficit is <strong>₹31,500</strong>. Over 105 months the penalty works out to ₹33,075,
          which is more than the deficit, so it is restricted to <strong>₹31,500</strong>. Interest
          is <strong>₹33,075</strong>. Total payable = <strong>₹96,075</strong> (₹63,000 if interest
          is excluded).
        </p>
      </Card>

      <Card title="Counting months">
        <ul>
          <li>Executed 15-Jan, calculated 15-Jan → 1 month.</li>
          <li>Executed 15-Jan, calculated 14-Feb → 1 month.</li>
          <li>Executed 15-Jan, calculated 15-Feb → 2 months (the extra day is a part month).</li>
          <li>Executed 31-Jan → one month ends on 28/29-Feb.</li>
        </ul>
      </Card>
    </div>
  );
}

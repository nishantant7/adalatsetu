import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { formatINR } from '@/shared/lib/currency';
import { Card } from '@/shared/ui';
import { getTool } from '@/tools/registry';
import { listRecords } from '../services/historyService';
import './RecentCalculations.css';

/** The latest saved calculations, with a link to the full history. Renders nothing when empty. */
export default function RecentCalculations({ limit = 3 }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    listRecords().then((all) =>
      setRecords(all.filter((record) => getTool(record.toolId)).slice(0, limit)),
    );
  }, [limit]);

  if (records.length === 0) return null;

  return (
    <section aria-labelledby="recent-heading" className="recent">
      <div className="recent__head">
        <h2 id="recent-heading" className="recent__title">
          Recent calculations
        </h2>
        <Link to={ROUTES.history} className="recent__link">
          View all
        </Link>
      </div>
      <Card className="recent__card">
        <ul className="recent__list">
          {records.map((record) => (
            <li key={record.id}>
              <Link to={ROUTES.toolRecord(record.toolId, record.id)} className="recent__item">
                <span>
                  <span className="recent__item-title">{record.title}</span>
                  <span className="recent__item-meta">{getTool(record.toolId).name}</span>
                </span>
                <span className="recent__amount">{formatINR(record.amount)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}

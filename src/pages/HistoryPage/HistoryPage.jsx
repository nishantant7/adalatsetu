import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { Button, Card, EmptyState, PageHeader, SearchInput, useToast } from '@/shared/ui';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { formatINR } from '@/shared/lib/currency';
import { clearRecords, deleteRecord, listRecords } from '@/features/history';
import { getTool } from '@/tools/registry';
import './HistoryPage.css';

const dateTimeFormatter = new Intl.DateTimeFormat('en-IN', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export default function HistoryPage() {
  useDocumentTitle('History');
  const showToast = useToast();
  const [records, setRecords] = useState([]);
  const [query, setQuery] = useState('');
  const [isConfirmingClear, setConfirmingClear] = useState(false);

  useEffect(() => {
    listRecords().then(setRecords);
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return records;
    return records.filter((record) =>
      [record.title, record.subtitle, getTool(record.toolId)?.name]
        .join(' ')
        .toLowerCase()
        .includes(needle),
    );
  }, [records, query]);

  const handleDelete = async (id) => {
    await deleteRecord(id);
    setRecords(await listRecords());
    showToast('Calculation deleted.');
  };

  const handleClear = async () => {
    await clearRecords();
    setRecords([]);
    setConfirmingClear(false);
    showToast('History cleared.');
  };

  return (
    <div>
      <PageHeader
        eyebrow="Workspace"
        title="Calculation history"
        description="Calculations you save are kept in this browser on this device only."
      />

      <Card>
        <div className="history__toolbar">
          <SearchInput
            className="history__search"
            label="Search history"
            placeholder="Search by case number, title or instrument"
            value={query}
            onChange={setQuery}
          />
          {records.length > 0 &&
            (isConfirmingClear ? (
              <div className="history__confirm">
                <span>Delete all saved calculations?</span>
                <Button variant="danger" size="sm" onClick={handleClear}>
                  Yes, delete all
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setConfirmingClear(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                icon="trash"
                onClick={() => setConfirmingClear(true)}
              >
                Clear all
              </Button>
            ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon="history" title={query ? 'No matches' : 'No saved calculations yet'}>
            {query ? (
              'Try a different search.'
            ) : (
              <>
                Use <strong>Save</strong> on any tool’s result to keep it here.
              </>
            )}
          </EmptyState>
        ) : (
          <ul className="history__list">
            {filtered.map((record) => {
              const tool = getTool(record.toolId);
              return (
                <li key={record.id} className="history__item">
                  <div className="history__info">
                    <p className="history__title">{record.title}</p>
                    <p className="history__meta">
                      {[
                        tool?.name,
                        record.subtitle,
                        dateTimeFormatter.format(new Date(record.savedAt)),
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  </div>
                  <div className="history__actions">
                    <span className="history__amount">{formatINR(record.amount)}</span>
                    {tool && (
                      <Button
                        variant="secondary"
                        size="sm"
                        to={ROUTES.toolRecord(tool.id, record.id)}
                      >
                        Open
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      icon="trash"
                      aria-label={`Delete ${record.title}`}
                      onClick={() => handleDelete(record.id)}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      <p className="history__hint">
        Looking for a tool? <Link to={ROUTES.home}>Browse all tools</Link>.
      </p>
    </div>
  );
}

import { formatINR } from '@/shared/lib/currency';
import { Button, Card, EmptyState, Icon } from '@/shared/ui';
import CalculationSteps from './CalculationSteps';
import OrderDraft from './OrderDraft';
import ResultSummary from './ResultSummary';
import './ResultPanel.css';

export default function ResultPanel({
  result,
  isStale,
  details,
  onLoadExample,
  onRecalculate,
  onSave,
  onPrint,
  onShare,
}) {
  if (!result) {
    return (
      <Card className="result-panel">
        <EmptyState icon="scale" title="Amount payable will appear here">
          <p>Fill in the instrument details and press Calculate.</p>
          <div className="result-panel__example">
            <p>New here? See how it works with a sample instrument.</p>
            <Button variant="secondary" size="sm" icon="sparkle" onClick={onLoadExample}>
              Try the worked example
            </Button>
          </div>
        </EmptyState>
      </Card>
    );
  }

  const staleNotice = isStale && (
    <div className="result-panel__stale" role="status">
      <Icon name="alert" size={16} />
      <span>Inputs have changed since this calculation.</span>
      <Button variant="secondary" size="sm" onClick={onRecalculate}>
        Recalculate
      </Button>
    </div>
  );

  if (result.deficit === 0) {
    return (
      <Card className="result-panel">
        {staleNotice}
        <EmptyState icon="check" title="No deficit — instrument is duly stamped">
          Stamp duty paid ({formatINR(result.dutyPaid)}) is not less than the proper duty (
          {formatINR(result.properDuty)}). No penalty or interest is payable under Section 35.
        </EmptyState>
      </Card>
    );
  }

  return (
    <Card
      className={`result-panel ${isStale ? 'is-stale' : ''}`.trim()}
      title="Amount payable"
      actions={
        <>
          <Button variant="primary" size="sm" icon="save" onClick={onSave} disabled={isStale}>
            Save
          </Button>
          <Button variant="secondary" size="sm" icon="print" onClick={onPrint} disabled={isStale}>
            Print
          </Button>
          <Button variant="secondary" size="sm" icon="share" onClick={onShare} disabled={isStale}>
            WhatsApp
          </Button>
        </>
      }
    >
      {staleNotice}
      <div className="result-panel__body">
        <ResultSummary result={result} />

        <details className="result-panel__working" open>
          <summary>
            <Icon name="calculator" size={16} /> Step-by-step working
          </summary>
          <CalculationSteps result={result} />
        </details>

        <OrderDraft result={result} details={details} />
      </div>
    </Card>
  );
}

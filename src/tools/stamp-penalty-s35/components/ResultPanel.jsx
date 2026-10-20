import { Button, Card, EmptyState, Icon } from '@/shared/ui';
import { formatINR } from '@/shared/lib/currency';
import CalculationSteps from './CalculationSteps';
import OrderDraft from './OrderDraft';
import ResultSummary from './ResultSummary';

export default function ResultPanel({ result, details, onSave, onPrint, onShare }) {
  if (!result) {
    return (
      <Card className="stamp-tool__result">
        <EmptyState icon="scale" title="Amount payable will appear here">
          Enter the market value, stamp duty paid and date of execution.
        </EmptyState>
      </Card>
    );
  }

  if (result.deficit === 0) {
    return (
      <Card className="stamp-tool__result">
        <EmptyState icon="check" title="No deficit — instrument is duly stamped">
          Stamp duty paid ({formatINR(result.dutyPaid)}) is not less than the proper duty (
          {formatINR(result.properDuty)}). No penalty or interest is payable under Section 35.
        </EmptyState>
      </Card>
    );
  }

  return (
    <Card
      className="stamp-tool__result"
      title="Amount payable"
      actions={
        <>
          <Button variant="primary" size="sm" icon="save" onClick={onSave}>
            Save
          </Button>
          <Button variant="secondary" size="sm" icon="print" onClick={onPrint}>
            Print
          </Button>
          <Button variant="secondary" size="sm" icon="share" onClick={onShare}>
            WhatsApp
          </Button>
        </>
      }
    >
      <ResultSummary result={result} />

      <details className="stamp-tool__working" open>
        <summary>
          <Icon name="calculator" size={16} /> Step-by-step working
        </summary>
        <CalculationSteps result={result} />
      </details>

      <OrderDraft result={result} details={details} />
    </Card>
  );
}

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Badge, PageHeader, Tabs, useToast } from '@/shared/ui';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { shareOnWhatsApp } from '@/shared/lib/share';
import { addMonths, formatDate, toISODate, today } from '@/shared/lib/dates';
import { getRecord, saveRecord } from '@/features/history';
import HowItWorks from './components/HowItWorks';
import InstrumentForm from './components/InstrumentForm';
import PrintReport from './components/PrintReport';
import ResultPanel from './components/ResultPanel';
import StatuteText from './components/StatuteText';
import { useStampPenaltyForm } from './hooks/useStampPenaltyForm';
import { ACT_IN_FORCE_FROM } from './logic/constants';
import { buildShareSummary } from './logic/shareSummary';
import './StampPenaltyTool.css';

const TABS = [
  { id: 'calculator', label: 'Calculator' },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'statute', label: 'Statute' },
];

/** The worked example: 104 complete months + a part month = 105 chargeable months. */
function exampleValues() {
  const calculationDate = today();
  return {
    marketValue: '6,50,000',
    dutyPaid: '1,000',
    dutyRate: '5',
    calculationDate: toISODate(calculationDate),
    executionDate: toISODate(addMonths(calculationDate, -104)),
    instrumentType: 'Agreement to Sell',
  };
}

export default function StampPenaltyTool({ tool }) {
  useDocumentTitle(tool.name);
  const showToast = useToast();
  const [activeTab, setActiveTab] = useState('calculator');
  const [searchParams, setSearchParams] = useSearchParams();
  const { values, setField, reset, load, error, result } = useStampPenaltyForm();

  const recordId = searchParams.get('record');

  // Re-open a saved calculation from history (?record=<id>).
  useEffect(() => {
    if (!recordId) return;
    getRecord(recordId).then((record) => {
      if (record?.toolId === tool.id) load(record.inputs);
      setSearchParams({}, { replace: true });
    });
  }, [recordId, tool.id, load, setSearchParams]);

  const details = {
    instrumentType: values.instrumentType.trim(),
    caseNumber: values.caseNumber.trim(),
    caseTitle: values.caseTitle.trim(),
    court: values.court.trim(),
  };

  const handleSave = async () => {
    const title =
      [details.caseNumber, details.caseTitle].filter(Boolean).join(' — ') ||
      details.instrumentType ||
      'Stamp penalty calculation';
    try {
      await saveRecord({
        toolId: tool.id,
        title,
        subtitle: `Executed ${formatDate(result.executionDate)} · ${result.months} months`,
        amount: result.total,
        inputs: values,
      });
      showToast('Saved to history.');
    } catch {
      showToast('Could not save — browser storage is unavailable.', 'error');
    }
  };

  return (
    <div className="stamp-tool">
      <PageHeader
        eyebrow="Stamp & Revenue"
        title={tool.fullName}
        description="In accordance with the Indian Stamp (Madhya Pradesh Second Amendment) Act, 2025."
      >
        <Badge tone="primary">Penalty 1% p.m. · capped at deficit</Badge>
        <Badge tone="primary">Interest 1% p.m.</Badge>
        <Badge>In force from {ACT_IN_FORCE_FROM}</Badge>
      </PageHeader>

      <Tabs label="Tool sections" tabs={TABS} value={activeTab} onChange={setActiveTab} />

      <div className="stamp-tool__panel">
        {activeTab === 'calculator' && (
          <div className="stamp-tool__layout">
            <InstrumentForm
              values={values}
              setField={setField}
              error={error}
              onReset={reset}
              onLoadExample={() => load(exampleValues())}
            />
            <ResultPanel
              result={result}
              details={details}
              onSave={handleSave}
              onPrint={() => window.print()}
              onShare={() => shareOnWhatsApp(buildShareSummary(result, details))}
            />
          </div>
        )}
        {activeTab === 'how-it-works' && <HowItWorks />}
        {activeTab === 'statute' && <StatuteText />}
      </div>

      {result && result.deficit > 0 && <PrintReport result={result} details={details} />}
    </div>
  );
}

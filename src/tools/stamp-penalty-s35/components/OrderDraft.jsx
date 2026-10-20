import { useState } from 'react';
import { Button, SegmentedControl, useToast } from '@/shared/ui';
import { copyText } from '@/shared/lib/clipboard';
import { buildOrderDraft } from '../logic/orderDraft';
import './OrderDraft.css';

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिंदी', lang: 'hi' },
];

export default function OrderDraft({ result, details }) {
  const [language, setLanguage] = useState('en');
  const showToast = useToast();
  const text = buildOrderDraft(result, details, language);

  const handleCopy = async () => {
    const copied = await copyText(text);
    showToast(
      copied ? 'Paragraph copied.' : 'Could not copy — select the text manually.',
      copied ? 'success' : 'error',
    );
  };

  return (
    <div className="order-draft">
      <div className="order-draft__head">
        <h3 className="order-draft__title">Draft order-sheet paragraph</h3>
        <SegmentedControl
          label="Draft language"
          options={LANGUAGES}
          value={language}
          onChange={setLanguage}
        />
      </div>
      <p className="order-draft__text" lang={language}>
        {text}
      </p>
      <Button variant="secondary" size="sm" icon="copy" onClick={handleCopy}>
        Copy paragraph
      </Button>
    </div>
  );
}

import { formatINR } from '@/shared/lib/currency';
import { formatDate } from '@/shared/lib/dates';
import { rupeesInWords } from '@/shared/lib/numberToWords';

/**
 * Builds a draft order-sheet paragraph for the impounding and admission of an
 * insufficiently stamped instrument.
 *
 * @param {ReturnType<import('./calculateStampPenalty').calculateStampPenalty>} result
 * @param {{ instrumentType?: string }} details
 * @param {'en' | 'hi'} language
 */
export function buildOrderDraft(result, details, language) {
  return language === 'hi' ? buildHindi(result, details) : buildEnglish(result, details);
}

function buildEnglish(r, { instrumentType }) {
  const instrument = instrumentType || 'instrument';
  const penalty = r.isPenaltyCapped
    ? `penalty @ 1% per month for ${r.months} months works out to ${formatINR(r.penaltyBeforeCap)}, which is restricted to the principal amount of deficit stamp duty, i.e. ${formatINR(r.penalty)}`
    : `penalty @ 1% per month for ${r.months} months is ${formatINR(r.penalty)}`;
  const interest = r.includeInterest
    ? `; and in terms of the proviso thereto, interest @ 1% per month from the date of execution till the date of payment for ${r.months} months is ${formatINR(r.interest)}`
    : '';

  return [
    `The ${instrument} dated ${formatDate(r.executionDate)} is found to be insufficiently stamped and is hereby impounded under Section 33 of the Indian Stamp Act, 1899.`,
    `The market value of the instrument is ${formatINR(r.marketValue)}, on which proper stamp duty @ ${r.dutyRate}% is ${formatINR(r.properDuty)}, whereas stamp duty of ${formatINR(r.dutyPaid)} has been paid; the deficit stamp duty is therefore ${formatINR(r.deficit)}.`,
    `Under clause (a) of the proviso to Section 35, as substituted by the Indian Stamp (Madhya Pradesh Second Amendment) Act, 2025, ${penalty}${interest}.`,
    `The concerned party is directed to deposit a total sum of ${formatINR(r.total)} (${rupeesInWords(r.total)}), upon which the instrument shall be admitted in evidence.`,
    'An authenticated copy of the instrument be sent to the Collector under Section 38.',
  ].join(' ');
}

function buildHindi(r, { instrumentType }) {
  const instrument = instrumentType || 'लिखत';
  const penalty = r.isPenaltyCapped
    ? `1% प्रतिमाह की दर से ${r.months} माह की शास्ति ${formatINR(r.penaltyBeforeCap)} होती है, जो कमी वाले स्टाम्प शुल्क की मूल राशि से अधिक न होने के कारण ${formatINR(r.penalty)} तक सीमित की जाती है`
    : `1% प्रतिमाह की दर से ${r.months} माह की शास्ति ${formatINR(r.penalty)}`;
  const interest = r.includeInterest
    ? `, तथा परन्तुक अनुसार निष्पादन दिनांक से भुगतान दिनांक तक 1% प्रतिमाह की दर से ${r.months} माह का ब्याज ${formatINR(r.interest)}`
    : '';

  return [
    `प्रस्तुत ${instrument} दिनांक ${formatDate(r.executionDate)} अपर्याप्त रूप से स्टाम्पित पाई जाने से भारतीय स्टाम्प अधिनियम, 1899 की धारा 33 के अंतर्गत परिबद्ध की जाती है।`,
    `लिखत का बाजार मूल्य ${formatINR(r.marketValue)} है, जिस पर ${r.dutyRate}% की दर से उचित स्टाम्प शुल्क ${formatINR(r.properDuty)} देय है, जबकि ${formatINR(r.dutyPaid)} का स्टाम्प शुल्क अदा किया गया है; अतः कमी वाला स्टाम्प शुल्क ${formatINR(r.deficit)} है।`,
    `भारतीय स्टाम्प (मध्यप्रदेश द्वितीय संशोधन) अधिनियम, 2025 द्वारा प्रतिस्थापित धारा 35 के परन्तुक के खण्ड (क) के अनुसार ${penalty}${interest}।`,
    `अतः संबंधित पक्षकार को कुल ${formatINR(r.total)} (${rupeesInWords(r.total)}) जमा करने का निर्देश दिया जाता है। उक्त राशि जमा होने पर लिखत साक्ष्य में ग्राह्य होगी।`,
    'लिखत की अधिप्रमाणित प्रति धारा 38 के अंतर्गत कलेक्टर को प्रेषित की जावे।',
  ].join(' ');
}

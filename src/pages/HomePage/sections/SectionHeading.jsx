export default function SectionHeading({ id, eyebrow, title, lead }) {
  return (
    <header className="home-section__head">
      {eyebrow && <p className="home-section__eyebrow">{eyebrow}</p>}
      <h2 id={id} className="home-section__title">
        {title}
      </h2>
      {lead && <p className="home-section__lead">{lead}</p>}
    </header>
  );
}

import Icon from "./Icon";

/** Question list built on <details>, so it works without JavaScript and stays crawlable. */
export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details className="faq-item" key={item.q}>
          <summary className="faq-q">
            <span>{item.q}</span>
            <Icon name="plus" size={18} className="faq-icon" />
          </summary>
          <p className="faq-a">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

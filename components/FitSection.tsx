import { fit } from "../content/home";
import Icon from "./Icon";

/** "Works with what you have": how Nexaio sits between systems and team, and honest connection status. */
export default function FitSection({ id }: { id?: string }) {
  const { layers } = fit;
  return (
    <section className="section section--dark" id={id} aria-labelledby="fit-title">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow">{fit.eyebrow}</p>
          <h2 className="h2" id="fit-title">
            {fit.title}
          </h2>
          <p className="lede">{fit.lede}</p>
        </div>

        <div
          className="layers reveal"
          role="group"
          aria-label="How Nexaio sits between your systems and your team"
        >
          <div className="layer">
            <p className="layer-title">{layers.systems.title}</p>
            <ul>
              {layers.systems.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
          <div className="layer-link" aria-hidden="true">
            <Icon name="handoff" size={22} />
          </div>
          <div className="layer layer--nexaio">
            <p className="layer-title">{layers.nexaio.title}</p>
            <ul>
              {layers.nexaio.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
          <div className="layer-link" aria-hidden="true">
            <Icon name="handoff" size={22} />
          </div>
          <div className="layer">
            <p className="layer-title">{layers.team.title}</p>
            <ul>
              {layers.team.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="fit-cols">
          {fit.columns.map((col) => (
            <div className={`fit-col fit-col--${col.tone} reveal`} key={col.title}>
              <h3 className="fit-col-title">{col.title}</h3>
              {col.note ? <p className="fit-col-note">{col.note}</p> : null}
              <ul>
                {col.items.map((item) => (
                  <li key={item}>
                    <Icon
                      name={col.tone === "yes" ? "check" : col.tone === "no" ? "minus" : "sliders"}
                      size={16}
                      className="fit-icon"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

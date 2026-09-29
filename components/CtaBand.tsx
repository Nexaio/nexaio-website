import { BookButton, CtaPair } from "./Cta";

/**
 * Closing call-to-action band used at the end of each main page.
 * `bookOnly` drops the demo button (used on the demo page itself).
 */
export default function CtaBand({
  title,
  body,
  bookOnly = false,
}: {
  title: string;
  body: string;
  bookOnly?: boolean;
}) {
  return (
    <section className="section section--dark">
      <div className="wrap">
        <div className="cta-band reveal">
          <h2 className="h2">{title}</h2>
          <p className="lede">{body}</p>
          {bookOnly ? (
            <div className="cta-row cta-row--center">
              <BookButton variant="primary" withArrow />
            </div>
          ) : (
            <CtaPair centered />
          )}
        </div>
      </div>
    </section>
  );
}

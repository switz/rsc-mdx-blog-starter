import { footnotes } from './Footnote';

export default function FootnotesFooter() {
  const foot = footnotes();

  if (foot.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 border-t-2 border-white/25 pt-4 xl:hidden">
      {foot.map((footnote) => (
        <div key={footnote.index} className="text-sm italic">
          <a href={`#footnote-${footnote.index}`} className="hover:no-underline">
            <span className="footnote-index">{footnote.index}</span>
          </a>
          . {footnote.content}
        </div>
      ))}
    </div>
  );
}

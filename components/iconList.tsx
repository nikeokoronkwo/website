import { FC } from "#client";
import { RedirectObject } from "~/lib/links.ts";

const Icons: FC<{ list: RedirectObject[]; iconSize?: string }> = (
  { list, iconSize },
) => (
  <>
    {list.map((l) => (
      <a href={l.email ? `mailto:${l.url}` : l.url} target="_blank">
        <img
          src={`/assets/svg/${l.id === "pub" ? "dart" : l.id}.svg`}
          className={"aspect-square " + (iconSize ?? "h-10")}
          alt={l.id}
        />
      </a>
    ))}
  </>
);

export default Icons;

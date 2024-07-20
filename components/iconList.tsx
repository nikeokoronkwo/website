import { FC } from "#client";

export interface RedirectObject {
  name?: string;
  id: string;
  url: string;
}

const Icons: FC<{ list: RedirectObject[]; iconSize?: string }> = ({ list, iconSize }) => (
  <>
    {list.map((l) => (
      <a href={l.url} target="_blank">
        <img src={`/assets/svg/${l.id}.svg`} className={"aspect-square " + (iconSize ?? "h-10")} />
      </a>
    ))}
  </>
);

export default Icons;
// @ts-ignore
import childbluehappy from '../img/child_blue_happy.png';
// @ts-ignore
import childgreenhappy from '../img/child_green_happy.png';
// @ts-ignore
import childyellowhappy from '../img/child_yellow_happy.png';
// @ts-ignore
import styles from './Sprite.module.css';

type Color = 'green' | 'blue' | 'yellow';
type Status = 'happy';
type Age = 'child';
const PETS: Record<Color, Record<Status, Record<Age, any>>> = {
  green: {
    happy: {
      child: childgreenhappy,
    },
  },
  blue: {
    happy: {
      child: childbluehappy,
    },
  },
  yellow: {
    happy: {
      child: childyellowhappy,
    },
  },
} as const;

export type SpriteProps = { color: Color; status: Status; age: Age };
export function Sprite({ color, status, age }: SpriteProps) {
  const src = PETS[color][status][age];
  return (
    <div
      className={styles.sprite}
      style={{
        backgroundImage: `url(${src})`,
      }}
    />
  );
}

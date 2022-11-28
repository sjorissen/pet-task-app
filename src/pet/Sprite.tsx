import { PetColor, PetStage, PetStatus } from '../api/models';
import adultbluehappy from '../img/adult_blue_happy.png';
import adultgreenhappy from '../img/adult_green_happy.png';
import adultredhappy from '../img/adult_red_happy.png';
import adultvoidhappy from '../img/adult_void_happy.png';
import adultyellowhappy from '../img/adult_yellow_happy.png';
import childbluehappy from '../img/child_blue_happy.png';
import childgreenhappy from '../img/child_green_happy.png';
import childredhappy from '../img/child_red_happy.png';
import childvoidhappy from '../img/child_void_happy.png';
import childyellowhappy from '../img/child_yellow_happy.png';
import teenbluehappy from '../img/teen_blue_happy.png';
import teengreenhappy from '../img/teen_green_happy.png';
import teenredhappy from '../img/teen_red_happy.png';
import teenvoidhappy from '../img/teen_void_happy.png';
import teenyellowhappy from '../img/teen_yellow_happy.png';
import styles from './Sprite.module.css';

// @ts-ignore
const PETS: Record<PetColor, Record<PetStatus, Record<PetStage, any>>> = {
  green: {
    happy: {
      child: childgreenhappy,
      teen: teengreenhappy,
      adult: adultgreenhappy,
    },
  },
  blue: {
    happy: {
      child: childbluehappy,
      teen: teenbluehappy,
      adult: adultbluehappy,
    },
  },
  yellow: {
    happy: {
      child: childyellowhappy,
      teen: teenyellowhappy,
      adult: adultyellowhappy,
    },
  },
  red: {
    happy: {
      child: childredhappy,
      teen: teenredhappy,
      adult: adultredhappy,
    },
  },
  void: {
    happy: {
      child: childvoidhappy,
      teen: teenvoidhappy,
      adult: adultvoidhappy,
    },
  },
} as const;

export type SpriteProps = { color: PetColor; status: PetStatus; stage: PetStage };
export function Sprite({ color, status, stage }: SpriteProps) {
  const src = PETS[color][status][stage];
  return (
    <div
      className={styles.sprite}
      style={{
        backgroundImage: `url(${src})`,
      }}
    />
  );
}

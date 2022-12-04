import { PetColor, PetStage, PetStatus } from '../api/models';
import adultbluehappy from '../img/adultbluehappy.png';
import adultbluesad from '../img/adultbluesad.png';
import adultgreenhappy from '../img/adultgreenhappy.png';
import adultgreensad from '../img/adultgreensad.png';
import adultredhappy from '../img/adultredhappy.png';
import adultredsad from '../img/adultredsad.png';
import adultvoidhappy from '../img/adultvoidhappy.png';
import adultvoidsad from '../img/adultvoidsad.png';
import adultyellowhappy from '../img/adultyellowhappy.png';
import adultyellowsad from '../img/adultyellowsad.png';
import childbluehappy from '../img/childbluehappy.png';
import childbluesad from '../img/childbluesad.png';
import childgreenhappy from '../img/childgreenhappy.png';
import childgreensad from '../img/childgreensad.png';
import childredhappy from '../img/childredhappy.png';
import childredsad from '../img/childredsad.png';
import childvoidhappy from '../img/childvoidhappy.png';
import childvoidsad from '../img/childvoidsad.png';
import childyellowhappy from '../img/childyellowhappy.png';
import childyellowsad from '../img/childyellowsad.png';
import deadpet from '../img/deadpet.png';
import teenbluehappy from '../img/teenbluehappy.png';
import teenbluesad from '../img/teenbluesad.png';
import teengreenhappy from '../img/teengreenhappy.png';
import teengreensad from '../img/teengreensad.png';
import teenredhappy from '../img/teenredhappy.png';
import teenredsad from '../img/teenredsad.png';
import teenvoidhappy from '../img/teenvoidhappy.png';
import teenvoidsad from '../img/teenvoidsad.png';
import teenyellowhappy from '../img/teenyellowhappy.png';
import teenyellowsad from '../img/teenyellowsad.png';
import styles from './Sprite.module.css';

// @ts-ignore
const PETS: Record<PetColor, Record<PetStatus, Record<PetStage, any>>> = {
  green: {
    happy: {
      child: childgreenhappy,
      teen: teengreenhappy,
      adult: adultgreenhappy,
    },
    sad: {
      child: childgreensad,
      teen: teengreensad,
      adult: adultgreensad,
    },
    dead: {
      child: deadpet,
      teen: deadpet,
      adult: deadpet,
    },
  },
  blue: {
    happy: {
      child: childbluehappy,
      teen: teenbluehappy,
      adult: adultbluehappy,
    },
    sad: {
      child: childbluesad,
      teen: teenbluesad,
      adult: adultbluesad,
    },
    dead: {
      child: deadpet,
      teen: deadpet,
      adult: deadpet,
    },
  },
  yellow: {
    happy: {
      child: childyellowhappy,
      teen: teenyellowhappy,
      adult: adultyellowhappy,
    },
    sad: {
      child: childyellowsad,
      teen: teenyellowsad,
      adult: adultyellowsad,
    },
    dead: {
      child: deadpet,
      teen: deadpet,
      adult: deadpet,
    },
  },
  red: {
    happy: {
      child: childredhappy,
      teen: teenredhappy,
      adult: adultredhappy,
    },
    sad: {
      child: childredsad,
      teen: teenredsad,
      adult: adultredsad,
    },
    dead: {
      child: deadpet,
      teen: deadpet,
      adult: deadpet,
    },
  },
  void: {
    happy: {
      child: childvoidhappy,
      teen: teenvoidhappy,
      adult: adultvoidhappy,
    },
    sad: {
      child: childvoidsad,
      teen: teenvoidsad,
      adult: adultvoidsad,
    },
    dead: {
      child: deadpet,
      teen: deadpet,
      adult: deadpet,
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

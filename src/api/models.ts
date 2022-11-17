export type Species = 'cat' | 'dog' | 'pika';
export type PetStatus = 'happy' | 'sad' | 'dead';
export type PetAge = 'child' | 'teen' | 'adult';
export type Accessories = 'tophat' | 'bowtie' | 'glasses';
export type PetColor = 'red' | 'blue' | 'polkadot';

export type PetType = {
  id: number;
  userid: number;
  name: string;
  species: Species;
  color: PetColor;
  age: PetAge;
  health: number;
  status: PetStatus;
  accessories: Accessories[];
  // check tasks & edit health at certain time
};

export type TaskType = {
  id: number;
  userid: number;
  name: string;
  description: string;
  repeat: boolean;
  done: boolean;
  date: string;
};

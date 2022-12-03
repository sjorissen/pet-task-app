export type Species = 'cat' | 'dog' | 'pika';
export type PetStatus = 'happy' | 'sad' | 'dead';
export type PetStage = 'child' | 'teen' | 'adult';
export type Accessories = 'tophat' | 'bowtie' | 'glasses';
export type PetColor = 'red' | 'blue' | 'yellow' | 'green' | 'void';

export type PetType = {
  name: string;
  species: Species;
  color: PetColor;
  stage: PetStage;
  birthday: string;
  health: number;
  status: PetStatus;
  accessories: Accessories[];
  // check tasks & edit health at certain time
  nextUpdate: string;
};

export type TaskType = {
  id: string;
  name: string;
  description: string;
  penalized?: boolean;
  done?: boolean;
  date: string;
};

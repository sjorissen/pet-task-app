export type Species = 'cat' | 'dog' | 'pika';
export type PetStatus = 'happy' | 'sad' | 'dead';
export type PetStage = 'child' | 'teen' | 'adult';
export type Accessories = 'tophat' | 'bowtie' | 'glasses';
export type PetColor = 'red' | 'blue' | 'yellow' | 'green' | 'void';

export type PetType = {
  id: string;
  userid: string;
  name: string;
  species: Species;
  color: PetColor;
  stage: PetStage;
  health: number;
  status: PetStatus;
  accessories: Accessories[];
  // check tasks & edit health at certain time
};

export type TaskType = {
  id: string;
  userid: string;
  name: string;
  description: string;
  repeat: boolean;
  done: boolean;
  date: string;
};

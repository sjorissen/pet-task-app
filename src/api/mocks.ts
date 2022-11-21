/*
Placeholder data for API functions to grab.
 */

import { PetType, TaskType } from './models';

export const getPet: PetType = {
  id: '-aslkfjepa',
  userid: 'xEctZj50XFE34XzJD18LYVtO5hIb',
  name: 'Billy',
  health: 100,
  species: 'cat',
  color: 'red',
  status: 'happy',
  age: 'adult',
  accessories: ['tophat', 'bowtie'],
};

export const updatePet: PetType = getPet;

export const createPet: PetType = getPet;

export const getTask: TaskType = {
  id: 1,
  userid: 1,
  name: 'Wash dishes',
  description: 'Put dirty dishes in dishwasher, then run it.',
  repeat: false,
  done: false,
  date: '2022-31-10',
};

export const createTask: TaskType = getTask;

export const getUser: { password: string; name: string; id: number } = {
  id: 1,
  name: 'usermcuserface',
  password: 'superstrongpw69',
};

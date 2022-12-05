/* eslint-disable */
import {
  Database,
  orderByKey,
  get,
  push,
  ref,
  set,
  update,
  startAt,
  endAt,
  query,
  remove,
} from 'firebase/database';
import { PET_COLORS, PetType, TaskType } from './models';
import { omitBy } from 'lodash';

export default class Api {
  private readonly _db?: Database;

  get db(): Database {
    if (!this._db) throw new Error('db was not passed to Api constructor');
    return this._db;
  }

  constructor(
    { db }: { db?: Database } = { db: undefined }
  ) {
    this._db = db;
  }

  randomPet(name: string): PetType {
    const birthday = new Date()
    return {
      name,
      species: 'cat',
      color: PET_COLORS[Math.round(Math.random()*(PET_COLORS.length - 1))],
      stage: 'child',
      health: 50,
      status: 'happy',
      birthday: birthday.toISOString(),
      accessories: [],
      nextUpdate: new Date(birthday.getTime() + 24*3600*1000).toISOString()
    };
  }

  /**
   * Gets a pet from the database based on ID
   * @param userid
   */
  async getPet(userid: string): Promise<PetType> {
    const snap = await get(ref(this.db, `users/${userid}/pet/`));
    if (snap.exists()) {
      return snap.val() as PetType;
    } else {
      throw new Error("couldn't get data");
    }
  }

  /**
   * Creates a new pet with the passed data and returns the newly created pet data
   * @param userid
   * @param pet
   */
  async createPet(userid: string, pet: { color: string; stage: string; species: string; accessories: any[]; name: string; health: number; status: string }): Promise<void> {
    await set(ref(this.db, `users/${userid}/pet/`), {
      ...pet,
      userid: userid,
    });
  }

  /**
   * Updates the pet in the database with the given payload
   * @param userid
   * @param pet
   */
  async updatePet(userid: string, pet: Partial<PetType>): Promise<void> {
    await update(ref(this.db, `users/${userid}/pet/`), {
      ...pet,
    });
  }

  async deletePet(userid: string): Promise<void> {
    await remove(ref(this.db, `users/${userid}/pet/`));
  }

  /**
   * Adds a new task to the database.
   * @param userid
   * @param task
   */
  async addTask(userid: string, task: Omit<TaskType, "id">) {
    push(ref(this.db, `users/${userid}/tasks/${task.date}/`), {
      ...task,
    });
  }

  /**
   * Retrieve a single task from the database
   * @param userid User the task belongs to.
   * @param date Date for the task.
   * @param id Task's ID in the database
   */
  // getTask(userid, task.date, task.id)
  async getTask(userid: string, date: string, id: string): Promise<TaskType> {
    const path = `users/${userid}/tasks/${date}/${id}/`;

    const snap = await get(ref(this.db, path));
    if (snap.exists()) {
      return {...snap.val(), id} as TaskType;
    } else {
      throw new Error("couldn't get data");
    }
  }

  /***
   * Returns an array of tasks by their date. All date formats are strings in the
   * form 'YYYY-MM-DD'.
   * @param userid User who owns the tasks.
   * @param start The start date of the range you want to fetch. If you leave the last parameter
   *    blank, only this day will be returned. ex: getTasksByDate(uid, '2022-02-03') will return
   *    only the tasks set for February 3, 2022.
   * @param end (optional) If you want to search within a specific date range, you can include a
   *    second date. Ex: getTasksByDate(uid, '2022-02-03', '2022-02-12') will return an array of
   *    dates between Feb 2, 2022 and Feb 12, 2022.
   */
  async getTasksByDate(userid: string, start: string, end?: string): Promise<TaskType[]> {
    const path = `users/${userid}/tasks/`;
    const q = await get(query(ref(this.db, path), orderByKey(), startAt(start),
      endAt(end ? end : start)));
    const snap = q.val();

    if (snap) {
      return Object.keys(snap).reduce((accum, date) => {
        return accum.concat(Object.keys(snap[date]).map(taskid => ({ ...snap[date][taskid], id: taskid })))
      }, [] as TaskType[])
    } else {
      return [];
    }
  }

  /***
   * Overwrites the respective task in the database with its new information.
   * @param userid User who the task belongs to.
   * @param task The updated task.
   */
  async editTask(userid: string, task: Partial<TaskType> & Pick<TaskType, "id" | "date">): Promise<void> {
    await update(ref(this.db, `users/${userid}/tasks/${task.date}/${task.id}/`), omitBy({
      ...task,
    }, v => v === undefined));
  }

  /***
   * Removes a task and its children from the database
   * @param userid
   * @param task
   */
  async deleteTask(userid: string, task: TaskType): Promise<void> {
    await remove(ref(this.db, `users/${userid}/tasks/${task.date}/${task.id}/`));
  }
}
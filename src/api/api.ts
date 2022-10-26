import * as mock from "./mocks";
import {PetType, TaskType} from "./models";

export default class Api {
    private mocked = false;

    constructor({ mocked } = { mocked: false }) {
        this.mocked = mocked;
    }

    /**
     * Gets a pet from the database based on ID
     * @param id
     */
    async getPet(id: number): Promise<PetType> {
        return mock.getPet;
    }

    /**
     * Updates the pet in the database with the given payload
     * @param id
     * @param pet
     */
    async updatePet(id: string, pet: Partial<PetType>): Promise<PetType> {
        return mock.updatePet;
    }

    /**
     * Creates a new pet with the passed data and returns the newly created pet data
     * @param pet
     */
    async createPet(pet: Omit<PetType, 'id'>): Promise<PetType> {
        return mock.createPet;
    }

    /**
     * Retrieve the task from the database
     * @param id
     */
    async getTask(id: number): Promise<TaskType> {
        return mock.getTask;
    }
}
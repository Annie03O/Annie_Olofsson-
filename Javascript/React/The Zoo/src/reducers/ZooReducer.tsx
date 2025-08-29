import type { ZooType } from "../models/Zoo";

export enum ActionType {
    FEED,
    SET_ZOO
}

type Action = 
    | { type: ActionType.FEED; payload: string }
    | { type: ActionType.SET_ZOO; payload: ZooType[] };

export const ZooReducer = (zoo: ZooType[], action: Action): ZooType[] => {
    switch (action.type) {
        case ActionType.FEED:
            return zoo.map(animal =>
                animal.id.toString() === action.payload
                    ? { ...animal, isFed: true, lastFed: new Date().toISOString() }
                    : animal
            )

        case ActionType.SET_ZOO:
            return action.payload;
        default:
            return zoo;
    }
} 
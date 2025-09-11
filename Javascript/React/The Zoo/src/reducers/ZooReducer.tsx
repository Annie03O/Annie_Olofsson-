import type { ZooType } from "../models/Zoo";

// Define action types for the reducer
export enum ActionType {
    FEED,
    SET_ZOO
}

// Define the shape of actions that can be dispatched to the reducer
type Action = 
    | { type: ActionType.FEED; payload: string }
    | { type: ActionType.SET_ZOO; payload: ZooType[] };

// Reducer function to manage the state of the zoo
export const ZooReducer = (zoo: ZooType[], action: Action): ZooType[] => {
    // Handle different action types
    switch (action.type) {
        // Type to feed an animal
        case ActionType.FEED:
            // Map through the zoo array and update the specific animal's feeding status
            return zoo.map(animal =>
                // If the animal's id matches the payload, update its isFed status and lastFed time
                animal.id.toString() === action.payload
                    ? { ...animal, isFed: true, lastFed: new Date().toISOString() }
                    // Else, return the animal unchanged
                    : animal
            )
        // Type to set the entire zoo state
        case ActionType.SET_ZOO:
            // Replace the current zoo state with the new payload
            return action.payload;
        default:
            return zoo;
    }
} 
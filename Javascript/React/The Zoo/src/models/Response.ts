import type { ZooType } from "./Zoo";

// Model type for API response containing a list of ZooType animals
export type Response = {
    Search: ZooType[];
}
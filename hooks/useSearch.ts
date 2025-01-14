// Zustand is a global state management tool that helps us update the state
// of the search and filter functionality

import { create } from "zustand";

interface UseSearchInterface {
    search: { searcTerm: string };
    setSearchTerm: (term: string) => void;
    removeSearchTerm: () => void;
}

export const useSearch = create<UseSearchInterface>(
    (set, get) => ({
        search: {
            searcTerm: ""
        },
        setSearchTerm(term) {
            set({search: {searcTerm: term}})
        },
        removeSearchTerm(){
            set({search: {searcTerm: ""}})
        }
    })
);


// Just a global input placeholder
export const useSearchPlaceholder = create<UseSearchInterface>(
    (set, get) => ({
        search: {
            searcTerm: ""
        },
        setSearchTerm(term) {
            set({search: {searcTerm: term}})
        },
        removeSearchTerm(){
            set({search: {searcTerm: ""}})
        }
    })
);


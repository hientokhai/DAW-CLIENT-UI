import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const updateSearchQuery = (query) => setSearchQuery(query);
    const resetSearchQuery = () => setSearchQuery("");

    return (
        <SearchContext.Provider value={{ searchQuery, updateSearchQuery, resetSearchQuery }}>
            {children}
        </SearchContext.Provider>
    );
};

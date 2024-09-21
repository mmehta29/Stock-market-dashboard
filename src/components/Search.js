import { useContext, useState } from "react";
import { XIcon, SearchIcon } from "@heroicons/react/solid";
import SearchResults from "./SearchResults";
import ThemeContext from "../context/ThemeContext";
//import { fetchSearchResults } from "../api/stock-api"; // Updated import for API call
//import { fetchSearchResults } from "../api/stock-api";

const fetchSearchResults = async (query) => {
    const apiKey = "GSwSpCr2j5CVcSUoAyOpa6BtWy1iqOV7";
    const url = `https://api.polygon.io/v3/reference/tickers?search=${query}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching search results: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch Search Results Error:', error);
    }
};

const Search = () => {
    const { darkMode } = useContext(ThemeContext);
    const [input, setInput] = useState("");
    const [bestMatches, setBestMatches] = useState([]);

    // Clear input and search results
    const clear = () => {
        setInput("");
        setBestMatches([]);
    };


    // Update search results based on input
    const updateSearchResults = async () => {
        try {
            if (input) {
                const searchResults = await fetchSearchResults(input);// Use the API function
                console.log(searchResults);
                const { results } = searchResults; // Access 'results' if it's in the API response
                setBestMatches(results); // Set the bestMatches state
            }
        } catch (error) {
            setBestMatches([]);
            console.log("Error fetching search results:", error);
        }
    };

    return (
        <div
            className={`flex items-center my-4 border-2 rounded-md relative z-50 w-96 
                ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"}`}
        >
            <input
                type="text"
                value={input}
                className={`w-full px-4 py-2 focus-outline-none rounded-md ${darkMode ? "bg-gray-900" : null
                    }`}
                placeholder="Search stocks..."
                onChange={(event) => setInput(event.target.value)}
                onKeyPress={(event) => {
                    if (event.key === "Enter") {
                        updateSearchResults();
                    }
                }}
            />
            {input && (
                <button onClick={clear} className="m-1">
                    <XIcon className="h-4 w-4 fill-gray-500" />
                </button>
            )}
            <button
                onClick={updateSearchResults}
                className="h-8 w-8 bg-indigo-600 rounded-md flex justify-center m-1 p-2"
            >
                <SearchIcon className="h-4 w-4 fill-gray-500" />
            </button>
            {input && bestMatches.length > 0 ? <SearchResults results={bestMatches} /> : null}
        </div>
    );
};

export default Search;





































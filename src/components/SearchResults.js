

import { useContext } from "react";
import StockContext from "../context/StockContext";
import ThemeContext from "../context/ThemeContext";

const SearchResults = ({ results }) => {
    const { darkMode } = useContext(ThemeContext);
    const { setStockSymbol } = useContext(StockContext);

    return (
        <ul
            className={`absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll 
            ${darkMode ? "bg-gray-900 border-gray-800 custom-scrollbar custom-scrollbar-dark" : "bg-white border-neutral-200"}`}
        >
            {results.map((item, index) => {
                const symbol = item.ticker;  // Updated to match Polygon.io API's response structure
                const description = item.name;  // Updated to match Polygon.io API's response structure

                return (
                    <li
                        key={`${symbol}-${index}`}
                        className={`cursor-pointer p-4 m-2 flex items-center justify-between rounded-md  ${darkMode ? "hover:bg-indigo-600" : "hover:bg-indigo-200"
                            }`}
                        onClick={() => {
                            setStockSymbol(symbol);  // Set the selected stock symbol
                        }}
                    >
                        <span>{symbol}</span>
                        <span>{description}</span>
                    </li>
                );
            })}
        </ul>
    );
};

export default SearchResults;

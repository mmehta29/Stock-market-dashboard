import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import Card from "./Card";

const Details = ({ details }) => {
    const { darkMode } = useContext(ThemeContext);
    const detailsList = {
        name: "Name",
        hq_country: "Country",
        exchange: "Exchange",
        ceo: "CEO",
        marketcap: "Market Cap",
        description: "Description",
    };

    const convertMillionsToBillions = (number) => {
        return (number / 1000).toFixed(2);
    }

    return (
        <Card>
            <ul className={`w-full h-full flex flex-col justify-between divide-y-1 ${darkMode ? "divide-gray-800" : ""}`}>
                {Object.keys(detailsList).map((item) => {
                    return (
                        <li key={item} className="flex-1 flex justify-between items-center">
                            <span>{detailsList[item]}</span>
                            <span>
                                {item === "marketCapitalization"
                                    ? details && details[item]
                                        ? `${convertMillionsToBillions(details[item])}B`
                                        : "N/A"
                                    : details && details[item] ? details[item] : "N/A"
                                }
                            </span>
                        </li>
                    );
                })}
            </ul>
        </Card>
    );
}

export default Details;

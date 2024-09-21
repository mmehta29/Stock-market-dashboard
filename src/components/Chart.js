import { useContext, useEffect, useState } from "react";
import Card from "./Card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ThemeContext from "../context/ThemeContext";
import StockContext from "../context/StockContext";

const apiKey = 'GSwSpCr2j5CVcSUoAyOpa6BtWy1iqOV7'; // Replace with your actual API key

// Function to fetch weekly time series data
const fetchTimeSeriesWeekly = async (symbol, startDate, endDate) => {
    const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/week/${startDate}/${endDate}?apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching time series weekly: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Fetch Time Series Weekly Error:', error);
        return null;
    }
};


const Chart = () => {
    const { darkMode } = useContext(ThemeContext);
    const { stockSymbol } = useContext(StockContext);
    const [data, setData] = useState([]);

    // Function to format the data for recharts
    const formatData = (data) => {
        return data.map(item => ({
            value: item.c, // Assuming 'c' is the close price
            date: new Date(item.t).toISOString().split('T')[0], // Converts Unix timestamp to 'YYYY-MM-DD'
        }));
    };

    useEffect(() => {
        const getChartData = async () => {
            const startDate = '2024-01-01'; // Set your desired start date
            const endDate = '2024-08-01';   // Set your desired end date
            const result = await fetchTimeSeriesWeekly(stockSymbol, startDate, endDate);
            if (result && result.results) {
                const formattedData = formatData(result.results);
                setData(formattedData);
            } else {
                setData([]);
            }
        };

        if (stockSymbol) {
            getChartData();
        }
    }, [stockSymbol]);

    return (
        <Card>
            <ResponsiveContainer>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#312e81"
                        fillOpacity={1}
                        strokeWidth={0.5}
                        fill="url(#chartColor)"
                    />
                    <Tooltip
                        contentStyle={darkMode ? { backgroundColor: "#111827" } : null}
                        itemStyle={darkMode ? { color: "#818cf8" } : null}
                    />
                    <XAxis
                        dataKey="date"
                        tickFormatter={(date) => new Date(date).toLocaleDateString()} // Formats date as locale string
                    />
                    <YAxis domain={["dataMin", "dataMax"]} />
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    );
}

export default Chart;

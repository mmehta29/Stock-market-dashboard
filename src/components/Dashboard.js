
// import Header from "./Header";
// import Details from "./Details";
// import Chart from "./Chart";
// import { useContext, useEffect, useState } from "react";
// import ThemeContext from "../context/ThemeContext";
// import StockContext from "../context/StockContext";
// //import { fetchCompanyDetails, fetchQuote } from "../api/stock-api";

// const fetchCompanyOverview = async (symbol) => {
//     const apiKey = "GSwSpCr2j5CVcSUoAyOpa6BtWy1iqOV7";
//     const url = `https://api.polygon.io/v1/meta/symbols/${symbol}/company?apiKey=${apiKey}`;

//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`Error fetching company overview: ${response.statusText}`);
//         }
//         const data = await response.json();
//         console.log(data);
//         return data;

//     } catch (error) {
//         console.error('Fetch Company Overview Error:', error);
//     }
// };

// const Dashboard = () => {

//     const { darkMode } = useContext(ThemeContext);
//     const { stockSymbol } = useContext(StockContext);

//     const [stockDetails, setStockDetails] = useState({});
//     //const [stockQuote, setStockQuote] = useState({});


//     // Fetch stock details and quote data whenever stockSymbol changes
//     useEffect(() => {


//         const updateStockDetails = async () => {
//             try {
//                 const details = await fetchCompanyOverview(stockSymbol);
//                 setStockDetails(details);
//                 console.log(details);
//             } catch (error) {
//                 setStockDetails({});
//                 console.log("Error fetching company details:", error);
//             }
//         };

//         if (stockSymbol) {
//             updateStockDetails();
//             // updateStockSeries();
//         }
//     }, [stockSymbol]);

//     return (
//         <div
//             className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8
//             md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand  
//             ${darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"}`}
//         >
//             {/* Header showing the stock name */}
//             <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
//                 <Header name={stockDetails?.name} />
//             </div>

//             {/* Chart area */}
//             <div className="md:col-span-2 row-span-4">
//                 <Chart />
//             </div>

//             {/* Overview with price and stock quote data */}
//             {/* <div>
//                 <Overview
//                     symbol={stockSymbol}
//                     price={stockQuote?.open || "N/A"}
//                     high={stockQuote?.high || "N/A"}
//                     low={stockQuote?.low || "N/A"}
//                     close={stockQuote?.close || "N/A"}
//                     currency={stockDetails?.currency || "N/A"}
//                 />
//             </div> */}

//             {/* Detailed information about the stock */}
//             <div className="row-span-2 xl:row-span-3">
//                 <Details details={stockDetails} />
//             </div>
//         </div>
//     );
// };

// export default Dashboard;































// // import Header from "./Header";
// // import Details from "./Details";
// // import Overview from "./Overview";
// // import Chart from "./Chart";
// // import { useContext, useEffect, useState } from "react";
// // import ThemeContext from "../context/ThemeContext";
// // import StockContext from "../context/StockContext";
// // import { fetchCompanyDetails, fetchQuote } from "../api/stock-api";
// // const Dashboard = () => {
// //     const { darkMode } = useContext(ThemeContext);
// //     const { stockSymbol } = useContext(StockContext);

// //     const [stockDetails, setStockDetails] = useState({});
// //     const [stockQuote, setStockQuote] = useState({});

// //     useEffect(() => {
// //         const updateStockDetails = async () => {
// //             try {
// //                 const result = await fetchCompanyDetails(stockSymbol);
// //                 setStockDetails(result);
// //             }
// //             catch (error) {
// //                 setStockDetails({});
// //                 console.log(error);
// //             }
// //         }
// //         const updateStockOverview = async () => {
// //             try {
// //                 const result = await fetchQuote(stockSymbol);
// //                 setStockQuote(result);
// //             }
// //             catch (error) {
// //                 setStockQuote({});
// //                 console.log(error);
// //             }
// //         }

// //         updateStockDetails();
// //         updateStockOverview();
// //     }, [stockSymbol])
// //     return (
// //         <div className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8
// //         md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand  
// //         ${darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"}`}>
// //             <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
// //                 <Header name={stockDetails.name} />
// //             </div>
// //             <div className="md:col-span-2 row-span-4">
// //                 <Chart />
// //             </div>
// //             <div>
// //                 <Overview
// //                     symbol={stockSymbol}
// //                     price={stockQuote.pc}
// //                     change={stockQuote.d}
// //                     changePercent={stockQuote.dp}
// //                     currency={stockDetails.currency}
// //                 />
// //             </div>
// //             <div className="row-span-2 xl:row-span-3">
// //                 <Details details={stockDetails} />
// //             </div>
// //         </div>
// //     );
// // }

// // export default Dashboard;








import { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import StockContext from "../context/StockContext";
import Header from "./Header";
import Details from "./Details";
import Chart from "./Chart";

const fetchCompanyOverview = async (symbol) => {
    const apiKey = "GSwSpCr2j5CVcSUoAyOpa6BtWy1iqOV7";
    const url = `https://api.polygon.io/v1/meta/symbols/${symbol}/company?apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching company overview: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch Company Overview Error:', error);
        throw error; // Re-throw error for handling in component
    }
};

const Dashboard = () => {
    const { darkMode } = useContext(ThemeContext);
    const { stockSymbol } = useContext(StockContext);

    const [stockDetails, setStockDetails] = useState({});
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const updateStockDetails = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                const details = await fetchCompanyOverview(stockSymbol);
                setStockDetails(details);
            } catch (error) {
                setStockDetails({});
                console.log("Error fetching company details:", error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        if (stockSymbol) {
            updateStockDetails();
        }
    }, [stockSymbol]);

    return (
        <div className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand ${darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"}`}>
            <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
                <Header name={loading ? "Loading..." : stockDetails?.name} />
            </div>

            <div className="md:col-span-2 row-span-4">
                <Chart />
            </div>

            <div className="row-span-2 xl:row-span-3">
                {loading ? (
                    <div>Loading...</div> // Show loading message
                ) : (
                    <Details details={stockDetails} />
                )}
            </div>
        </div>
    );
};

export default Dashboard;

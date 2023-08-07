"use client"

import React, {useEffect, useState} from "react";
import axios from "axios";
import Navbar from "@/app/components/ui/Navbar";
import Footer from "@/app/components/ui/Footer";

export default function ERC721Tokens() {
    const [documentList, setDocumentList] = useState([]);
    const [inputAddress, setInputAddress] = useState("");


    const fetchERC721Tokens = async () => {
        const apiKey = process.env.NEXT_PUBLIC_POLYGONSC_KEY;
        const polygonScanApiUrl = `https://api-testnet.polygonscan.com/api?module=account&action=tokennfttx&address=${inputAddress}&startblock=1&endblock=999999999&sort=asc&apikey=${apiKey}`;

        try {
            const response = await axios.get(polygonScanApiUrl);
            return response.data.result;
        } catch (error) {
            console.error("Error fetching data from PolygonScan:", error);
            return [];
        }
    };

    const fetchDocumentList = async () => {
        try {
            const documents = await fetchERC721Tokens();
            setDocumentList(documents);

        } catch (error) {
            console.error("Error fetching document list:", error);
            setDocumentList([]);
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toISOString();
    };



    return (<main className="min-h-screen flex-col items-center justify-between p-0">
        {/* Navbar component */}
        <Navbar/>

        <div
            className="min-h-screen flex-col items-center justify-between pt-20 pl-20 pr-20 pb-40 bg-transparent">
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-400 pb-5">Search documents by address</h2>
            <div className="mb-4 flex items-center pb-10">
                <label className="block">
                    Enter Address:
                    <input
                        type="text"
                        className="border border-gray-300 rounded p-2 ml-2"
                        value={inputAddress}
                        onChange={(e) => setInputAddress(e.target.value)}
                    />
                </label>
                <button
                    className="ml-2 px-4 py-2 bg-indigo-300 text-white rounded hover:bg-blue-600"
                    onClick={fetchDocumentList} type="submit"
                >
                    Search
                </button>
            </div>

            <table className="text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="bg-gray-100">
                    <th className="py-2 px-4 border">token ID</th>
                    <th className="py-2 px-4 border">date generated</th>
                    <th className="py-2 px-4 border">Smart Contract</th>
                    {/* Add other table header columns if needed */}
                </tr>
                </thead>
                <tbody>
                {Array.isArray(documentList) && documentList.length > 0 ? (
                    documentList.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                            <td className="py-2 px-4 border">{item.tokenID}</td>
                            <td className="py-2 px-4 border">{formatDate(item.timeStamp)}</td>
                            <td className="py-2 px-4 border">{item.contractAddress}</td>
                            {/* Add other table data cells based on the returned data */}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="py-2 px-4 border">
                            No data available.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
        </div>
            {/* Footer component */}
            <Footer />
        </main>
    );
}
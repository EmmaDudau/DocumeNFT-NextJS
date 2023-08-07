"use client"
import React from 'react';
import Footer from "@/app/components/ui/Footer";
import Navbar from "@/app/components/ui/Navbar";
import Hero from "@/app/components/ui/Hero";
import {useState, useEffect} from "react";
import axios from "axios";

export default function Dashboard() {

    const contractAddress = process.env.NEXT_PUBLIC_DOCUMENT_ADDRESS;
    const [documentList, setDocumentList] = useState([]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        fetchDocumentList();
    }, []);

    const fetchDocumentsFromContract = async (contractAddress) => {
        const apiKey = process.env.NEXT_PUBLIC_POLYGONSC_KEY; // Replace with your PolygonScan API key
        const polyScanUrl = `https://api-testnet.polygonscan.com/api?module=account&action=tokennfttx&contractaddress=${contractAddress}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=${apiKey}`;

        try {
            const response = await axios.get(polyScanUrl);
            return response.data.result;
        } catch (error) {
            console.error("Error fetching data from PolygonScan:", error);
            return [];
        }
    };

    const fetchDocumentList = async () => {
        try {
            const documents = await fetchDocumentsFromContract(contractAddress);
            setDocumentList(documents);
        } catch (error) {
            console.error("Error fetching document list:", error);
            setDocumentList([]);
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert to milliseconds
        return date.toISOString(); // Format the date as a string (you can customize the format if needed)
    };

    return (
        <main className="min-h-screen flex-col items-center justify-between p-0">
            {/* Navbar component */}
            <Navbar/>

            <div className="p-20">
                <Hero/>
                <h2 className="text-2xl mb-4 text-gray-500 dark:text-gray-400 pb-5">Minted documents on {contractAddress}</h2>

                <table className="text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border">tokenID</th>
                        <th className="py-2 px-4 border">tokenName</th>
                        <th className="py-2 px-4 border">date generated</th>
                        <th className="py-2 px-4 border">block number</th>
                        <th className="py-2 px-4 border">recipient</th>
                        {/* Add other table header columns if needed */}
                    </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(documentList) && documentList.length > 0 ? (
                        documentList.map((document, index) => (
                            <tr
                                key={index}
                                className={index % 2 === 0 ? "bg-gray-50" : ""}
                            >
                                <td className="py-2 px-4 border">{document.tokenID}</td>
                                <td className="py-2 px-4 border">{document.tokenName}</td>
                                <td className="py-2 px-4 border">{formatDate(document.timeStamp)}</td>
                                <td className="py-2 px-4 border">{document.blockNumber}</td>
                                <td className="py-2 px-4 border">{document.to}</td>
                                {/* Add other table data cells based on the document object */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="py-2 px-4 border">
                                Fetching documents...
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            {/* Footer component */}
            <Footer/>
        </main>
    );
}

"use client"
import { useState, useEffect } from "react";
import axios from "axios";




export default function Header() {

    const contractAddress = process.env.NEXT_PUBLIC_DOCUMENT_ADDRESS;
    const [documentList, setDocumentList] = useState([]);

    const links = [
        { name: 'Create Metamask account', href: 'https://metamask.io/' },
    ]
    const stats = [
        { name: 'GDPR Compliant documents', value: 'ERC-721 NFTs' },
        { name: 'Issued documents', value: documentList.length },
    ]




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
            Array.isArray(documentList)

        } catch (error) {
            console.error("Error fetching document list:", error);
            setDocumentList([]);
        }
    };






    return (
        <div className="relative isolate overflow-hidden py-24 sm:py-32">
            <div
                className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                aria-hidden="true"
            >
            </div>
            <div
                className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
                aria-hidden="true"
            >
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-4xl font-bold tracking-tight text-white hover:text-gray-800 sm:text-6xl">DocumeNFTs</h2>
                    <p className="mt-6 text-lg leading-8 text-white hover:text-black">
                        Transforming Documents into immutable
                        NFTs
                        <br/>
                        for enhanced security and ownership
                    </p>
                </div>
                <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                        {links.map((link) => (
                            <a key={link.name} href={link.href}>
                                {link.name} <span aria-hidden="true">&rarr;</span>
                            </a>
                        ))}
                    </div>
                    <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.name} className="flex flex-col-reverse">
                                <dt className="text-base leading-7 text-white">{stat.name}</dt>
                                <dd className="text-2xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}

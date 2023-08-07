"use client"

import Footer from "@/app/components/ui/Footer";
import Navbar from "@/app/components/ui/Navbar";
import React, {useState, useEffect} from "react";
import {ethers} from "ethers";
import {PhotoIcon} from '@heroicons/react/24/solid';
import axios from "axios";
import abi from "@/app/utils/Document.json";


export default function MintDoc() {
    require("dotenv").config()
    const {ethers} = require("ethers");
    const [fileUrl, setFileUrl] = useState(null);
    const [formInput, updateFormInput] = useState({title: "", name: "", details: "", fileUrl: ""});
    const [signer, setSigner] = useState(null);
    const [userAddress, setUserAddress] = useState(null);


    useEffect(() => {
        fetchSigner();
    }, []);


    const fetchSigner = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const _signer = await provider.getSigner();
        let _userAddress = await _signer.getAddress();
        setSigner(_signer);
        setUserAddress(_userAddress);
    };


    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            // Create a URL for the uploaded image
            setFileUrl(URL.createObjectURL(file));
            // Upload the image to IPFS
            const fileCID = await uploadToIPFS(file)
            const url = 'https://gateway.pinata.cloud/ipfs/' + fileCID
        }
    }


    const PINATA_API_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
    const PINATA_API_URL2 = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

    const uploadToIPFS = async (file) => {
        const apiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY
        const apiSecret = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(PINATA_API_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    pinata_api_key: apiKey,
                    pinata_secret_api_key: apiSecret,
                },
            });

            if (response.status === 200) {
                return response.data.IpfsHash;
            } else {
                console.log('Error uploading file to IPFS:', response.data);
                return null;
            }
        } catch (error) {
            console.log('Error uploading file to IPFS:', error.message);
            return null;
        }
    };

    const uploadMetadataToIPFS = async (metadataString) => {
        const apiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY
        const apiSecret = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY


        try {
            const response = await axios.post(PINATA_API_URL2, metadataString, {
                headers: {
                    'Content-Type': 'application/json',
                    pinata_api_key: apiKey,
                    pinata_secret_api_key: apiSecret,
                },
            });

            if (response.status === 200) {
                return response.data.IpfsHash;
            } else {
                console.log('Error uploading metadata to IPFS:', response.data);
                return null;
            }
        } catch (error) {
            console.log('Error uploading metadata to IPFS:', error.message);
            return null;
        }
    };


    const onMint = async (event) => {
        event.preventDefault(); // Prevent form submission from causing page reload

        const {title, name, details, recipient} = formInput;
        if (!title || !name || !details || !recipient || !fileUrl) {
            window.alert("Please fill in all fields");
            return;
        }
        if (!ethers.utils.isAddress(recipient)) {
        window.alert("Invalid recipient");
        return;
        }

        const documentData = {
            title: formInput.title,
            name: formInput.name,
            details: formInput.details
        }

        const metadataString = JSON.stringify(documentData);
        const uploaded = await uploadMetadataToIPFS(metadataString);
        const url = 'https://gateway.pinata.cloud/ipfs/' + uploaded;
        const metadataHash = ethers.utils.id(metadataString); // Calculate the metadataHash
        const Document = new ethers.Contract(process.env.NEXT_PUBLIC_DOCUMENT_ADDRESS, abi.abi, signer);

        const transaction = await Document.mint(recipient, url, metadataHash);
        await transaction.wait();
        window.alert("Your Document has been minted");
    }

    // clear form after minting
    const clearForm = () => {
        updateFormInput({
            title: "",
            name: "",
            details: "",
            fileUrl: ""
        });
        setFileUrl(null);
    }

    return (
        <main style={{ backgroundColor: "#F3F4F6", height: "100vh"
        }}
            className="min-h-screen flex-col items-center justify-between p-0">
            <Navbar/>
            <div
                className="min-h-screen flex-col items-center justify-between pt-20 pl-20 pr-20 pb-40 bg-white">
                <form>
                    <div className="pl-10 pr-10">
                        <h2 className="pb-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">                            Mint your document</h2>
                        <p className="m-2 text-sm text-gray-600 pb-3">
                            Upload your document to the IPFS network and mint it as an NFT.
                        </p>
                    </div>
                    <div className="space-y-8 pl-10 pr-10">
                        <div>
                            <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-8">
                                <label htmlFor="file-upload"
                                       className="cursor-pointer rounded-lg bg-transparent border border-dashed border-gray-900/25 p-4 items-center ">
                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true"/>
                                    <div className="mt-4 text-sm text-gray-600 items-center">
                                        <span>Upload document PNG, JPG, GIF up to 10MB</span>
                                    </div>
                                </label>

                                {fileUrl && (
                                    <div className="float-right items-center">
                                        <img src={fileUrl} alt="Uploaded"
                                             className="mt-2 rounded-md shadow-md max-h-56"/>
                                    </div>
                                )}

                            </div>
                            <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                onChange={handleFileChange}
                            />
                        </div>


                        <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-8">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-900">
                                    Document title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    onChange={e => updateFormInput({...formInput, title: e.target.value})}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                                    Recipient name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={e => updateFormInput({...formInput, name: e.target.value})}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="details" className="block text-sm font-medium text-gray-900">
                                    Document details
                                </label>
                                <input
                                    type="text"
                                    name="details"
                                    id="details"
                                    onChange={e => updateFormInput({...formInput, details: e.target.value})}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>


                        <div className="bg-transparent">
                            <label htmlFor="recipient" className="block text-sm font-medium text-gray-900">
                                Recipient address
                            </label>
                            <input
                                type="text"
                                name="recipient"
                                id="recipient"
                                placeholder="Recipient Public Key"
                                onChange={e => updateFormInput({...formInput, recipient: e.target.value})}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="bg-transparent">
                            <p className="text-sm text-gray-600">
                                Please ensure all the details are correct before you proceed to mint.
                            </p>
                        </div>

                        <div className="justify-end bg-transparent">
                            <button
                                onClick={(event) => onMint(event)} type="submit"
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                            >
                                Mint document
                            </button>
                            <button
                                className="float-right justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                                onClick={clearForm} type="reset">
                                Clear form
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <Footer/>
        </main>
    );
}
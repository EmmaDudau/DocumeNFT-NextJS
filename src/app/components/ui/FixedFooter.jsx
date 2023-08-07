import React from 'react';

const FixedFooter = () => {
    return (
        <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-transparent backdrop-blur text-white h-15 flex items-center justify-center">
            <div className="container mx-auto px-5">
                <h3 className="text-center font-800 mr-8 text-gray-200 hover:text-indigo-500">
                    &copy; {new Date().getFullYear()} DocumeNFTs. Emanuela Dudau x19180675.
                </h3>
            </div>
        </footer>
    );
};

export default FixedFooter;

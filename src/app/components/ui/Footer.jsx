import React from 'react';

const Footer = () => {
    return (
        <footer
            className="fixed bottom-0 left-0 z-20 w-full p-4 bg-gray-800 dark:bg-gray-900 text-white h-10 flex items-center justify-center">
            <div className="container mx-auto px-4">
                <h3 className="text-center font-medium mr-8  text-gray-500 hover:text-white">
                    &copy; {new Date().getFullYear()} DocumeNFTs. Emanuela Dudau x19180675.
                </h3>
            </div>
        </footer>
    );
};

export default Footer;
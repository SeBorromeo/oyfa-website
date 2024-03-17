import { Suspense, useState } from 'react';
import { useLoaderData, useOutletContext } from 'react-router';
import { defer, Await } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import HalfTitle from './../../../components/layout/HalfTitle/HalfTitle';
import MerchCarousel from './MerchCarousel';
import MerchGallery from './MerchGallery';
import MerchItemPopUp from './MerchItemPopUp';

import axiosClient from '../../../utils/axiosClient';

const IMAGE_DIR = 'images/merch/'

export default function Merch() {
    const {setTransition, setLeaveGap} = useOutletContext();
    const [currentItem, setCurrentItem] = useState(null);

    const loaderData = useLoaderData();

    const setMerchItem = (item) => {setCurrentItem(item); setTransition(false); setLeaveGap(false)}
    const closeItem = () => {setCurrentItem(null); setTransition(true);};

    var networklessItemList = [
        {category: "Unisex T-Shirt, S-L", name: "2022 Barrio T-Shirt", price: 25.01, stock: 20, images: ['seb2.jpg']},
        {category: 'me', name: 'Basty', price: 2, stock: 1, images: ['realseb.jpg']},
        {category: "Unisex Hoodie, XS-XL", name: "Super duper awesome hoodie", price: 35, stock: 20, images: ['megathrowback.jpg']},
        {category: "Holographic Sticker", name: "35th OYFA Decal", price: 3, stock: 0, images: ['throwback.jpg']},
        {category: "Unisex T-Shirt, S-L", name: "2022 Barrio T-Shirt", price: 25.078, stock: 0, images: ['OYFABuddy.JPG']},
        {category: "Unisex T-Shirt, S-L", name: "2023 Barrio T-Shirt", price: 25.078, stock: 0, images: ["SamExample.JPG", "SamExample.JPG", "SamExample.JPG"]}]
    
    const GALLERY_IMAGES = ['/images/merch/seb1.jpg', '/images/merch/seb1.jpg' , '/images/merch/seb1.jpg'];

    return(
        <>
            <Helmet><title>Merch</title></Helmet>
            <HalfTitle header = 'Merch' imgSrc = {'/images/merch/OyfaBuddyBanner.JPG'} brightness={75} position={55} caption='Order Now!'/>
            <MerchCarousel images={GALLERY_IMAGES}/>

            <Suspense
                fallback={<p>Loading merchandise...</p>}
            >
                <Await
                    resolve={loaderData.merch}
                    errorElement={
                        <p>Error loading merchanise</p>
                    }
                >
                    {(merch) => (
                        <MerchGallery merch={merch} setCurrentItem={setMerchItem} imageDir={IMAGE_DIR}/>
                    )}
                </Await>
            </Suspense>

            <AnimatePresence
                initial={false}
                mode="wait"
            >
                {currentItem && <MerchItemPopUp item={currentItem} handleClose={closeItem} imageDir={IMAGE_DIR}/>}
            </AnimatePresence>
        </>
    );  
}

export async function merchLoader() {
    try {
        const merchPromise = axiosClient.get('/merch').then((response) => response.data);
        return defer({merch: merchPromise});
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
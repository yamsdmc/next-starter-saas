import React from "react";
import Head from "next/head";
import {Inter, Inter_Tight} from 'next/font/google';
import {useAuthUser} from "@/hooks/useAuthUser";
import Navbar from "@/components/organisms/Navbar";
import SubscriptionSection from "@/features/payment/components/SubscriptionSection";
import InvoicesSection from "@/features/payment/components/InvoicesSection";

const inter = Inter({subsets: ["latin"]});
const inter_tight = Inter_Tight({
    weight: ['500', '600', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--font-inter-tight',
    display: 'swap'
});

export default function HomeContainer() {
    const {user} = useAuthUser();

    return (
        <>
            <Head>
                <title>SaaS Starter Kit</title>
                <meta name="description" content="A powerful starting point for your next SaaS project"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className={`${inter.className} ${inter_tight.variable}`}>
                <Navbar user={user}/>
                {user ? (
                    <>
                        <div>Product</div>
                        <div>1 chaussure</div>

                        <SubscriptionSection />
                        <InvoicesSection />
                    </>
                ) : (
                    <div>Vous devez être connecté pour voir les produits</div>
                )}
            </div>
        </>
    );
}

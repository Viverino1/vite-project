import { Outlet } from "react-router-dom";
import EvidenceCard from "../../components/EvidenceCard";
import QuoteCard from "../../components/QuoteCard";
import RebuttalCard from "../../components/RebuttalCard";
import { useAppSelector } from "../../utils/redux/hooks";
import { useEffect, useState } from "react";
import { Search } from "react-bootstrap-icons";
import { getValue } from "../../utils/helpers";

export default function Cards(){
    const evidences = useAppSelector((state) => state.cards.evidences);
    const rebuttals = useAppSelector((state) => state.cards.rebuttals);
    const quotes = useAppSelector((state) => state.cards.quotes);

    const [searchQuery, setSearchQuery] = useState("");

    const [displayEvidences, setDisplayEvidences] = useState(evidences);
    const [displayRebuttals, setDisplayRebuttals] = useState(rebuttals);
    const [displayQuotes, setDisplayQuotes] = useState(quotes);

    useEffect(() => {
        const query = searchQuery.toLowerCase();

        setDisplayEvidences([]);
        evidences.forEach((card) => {
            if(
                card.title.toLowerCase().includes(query) ||
                card.text.toLowerCase().includes(query) ||
                card.reasoning.toLowerCase().includes(query) ||
                card.sourceName.toLowerCase().includes(query) ||
                card.sourceLink.toLowerCase().includes(query)
                
            ){
                setDisplayEvidences(oldArray => [...oldArray, card]);
            }
        })

        setDisplayRebuttals([]);
        rebuttals.forEach((card) => {
            if(
                card.title.toLowerCase().includes(query) ||
                card.text.toLowerCase().includes(query) ||
                card.reasoning.toLowerCase().includes(query) ||
                card.sourceName.toLowerCase().includes(query) ||
                card.sourceLink.toLowerCase().includes(query) ||
                card.rebuttalTo.toLowerCase().includes(query)
                
            ){
                setDisplayRebuttals(oldArray => [...oldArray, card]);
            }
        })

        setDisplayQuotes([]);
        quotes.forEach((card) => {
            if(
                card.title.toLowerCase().includes(query) ||
                card.text.toLowerCase().includes(query) ||
                card.reasoning.toLowerCase().includes(query) ||
                card.sourceName.toLowerCase().includes(query) ||
                card.sourceLink.toLowerCase().includes(query) ||
                card.quotee.toLowerCase().includes(query)
            ){
                setDisplayQuotes(oldArray => [...oldArray, card]);
            }
        })
        
    }, [evidences, rebuttals, quotes, searchQuery]);
    
    return(
        <div className="relative w-full h-screen p-4 overflow-scroll">
            <div className="z-30 fixed left-25 right-4 top-4 h-16 rounded-lg p-2 bg-primary text-background shadow-primary shadow-md hover:shadow-sm hover:shadow-primary transition-all duration-300">
                <div className="flex items-center space-x-2 w-full h-full">
                <Search className="w-12" size={30}/>
                    <input type="text" id="search" placeholder="Search" className="text-xl w-full h-full outline-none bg-primary"
                    onChange={() => {
                        setSearchQuery(getValue("search", ""));
                    }}/>
                </div>
            </div>
            <div className="h-20 w-full"/>
            <div className="lg:grid-cols-3 md:grid-cols-2 inline-grid w-full gap-4">
                {displayEvidences.map((card, index) => (
                    <EvidenceCard key={index} data={card} isPreview={false}/>
                ))}
                {displayRebuttals.map((card, index) => (
                    <RebuttalCard key={index} data={card} isPreview={false}/>
                ))}
                {displayQuotes.map((card, index) => (
                    <QuoteCard key={index} data={card} isPreview={false}/>
                ))}
            </div>
            <Outlet />
        </div>
    )
}
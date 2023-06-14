import { Outlet } from "react-router-dom";
import EvidenceCard from "../../components/EvidenceCard";
import QuoteCard from "../../components/QuoteCard";
import RebuttalCard from "../../components/RebuttalCard";
import { useAppSelector } from "../../utils/redux/hooks";

export default function Cards(){
    const evidences = useAppSelector((state) => state.cards.evidences);
    const rebuttals = useAppSelector((state) => state.cards.rebuttals);
    const quotes = useAppSelector((state) => state.cards.quotes);
    
    return(
        <div className="relative w-full h-screen p-4 overflow-scroll">
            <div className="z-30 fixed left-25 right-4 top-4 h-16 rounded-lg bg-primary shadow-primary shadow-md hover:shadow-sm hover:shadow-primary transition-all duration-300"></div>
            <div className="h-20 w-full"/>
            <div className="lg:grid-cols-3 md:grid-cols-2 inline-grid w-full gap-4">
                {evidences.map((card, index) => (
                    <EvidenceCard key={index} data={card} isPreview={false}/>
                ))}
                {rebuttals.map((card, index) => (
                    <RebuttalCard key={index} data={card} isPreview={false}/>
                ))}
                {quotes.map((card, index) => (
                    <QuoteCard key={index} data={card} isPreview={false}/>
                ))}
            </div>
            <Outlet />
        </div>
    )
}
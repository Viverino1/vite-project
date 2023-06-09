import EvidenceCard from "../../components/EvidenceCard";
import { useAppSelector } from "../../utils/redux/hooks";

export default function Cards(){
    const evidences = useAppSelector((state) => state.cards.evidences);
    
    return(
        <div className="relative w-full h-screen p-4 overflow-scroll">
            <div className="z-30 fixed left-25 right-4 top-4 h-16 rounded-lg bg-primary shadow-primary shadow-md hover:shadow-sm hover:shadow-primary transition-all duration-300"></div>
            <div className="h-20 w-full"/>
            <div className="lg:grid-cols-3 md:grid-cols-2 inline-grid w-full gap-4">
                {evidences.map((card, index) => (
                    <EvidenceCard key={index} data={card}/>
                ))}
            </div>
        </div>
    )
}
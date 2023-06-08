import { useNavigate } from "react-router-dom";
import { Evidence } from "../utils/types";
import { contsub } from "../utils/helpers";

export default function EvidenceCard(props: {data: Evidence}){
    const navigate = useNavigate();
    return(
        <button className="flex flex-col items-center w-full h-96 p-2 bg-secondary rounded-lg text-accent
        shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300"
        onClick={() => {navigate("/cards:" + props.data.cardID)}}>
            <div className="flex flex-col justify-between w-full h-20">
                <div className="text-lg break-words w-full line-clamp-1">{contsub(props.data.contention, props.data.subpoint)}</div>
                <div className="text-2xl break-words w-full line-clamp-1">{props.data.title}</div>
                <a href={props.data.sourceLink} target="_blank" rel="noopener noreferrer" className="break-words w-full line-clamp-1 text-blue-500 underline">{props.data.sourceName}</a>
            </div>

            <div className="flex flex-col space-y-2 h-72 w-full">
                <div className="w-full h-1/2 p-2 rounded-lg border-2 border-primary border-opacity-50 text-left overflow-y-scroll">{props.data.text}</div>
                <div className="w-full h-1/2 p-2 rounded-lg border-2 border-primary border-opacity-50 text-left overflow-y-scroll">{props.data.reasoning}</div>
            </div>
        </button>
    )
}
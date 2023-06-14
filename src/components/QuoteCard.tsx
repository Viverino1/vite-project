import { useNavigate } from "react-router-dom";
import { Quote } from "../utils/types";
import { contsub } from "../utils/helpers";

export default function QuoteCard(props: {data: Quote, isPreview: boolean}){
    const navigate = useNavigate();
    return(
        <button className="flex flex-col w-full h-96 p-2 rounded-lg bg-secondary text-accent
        shadow-md hover:shadow-sm shadow-primary hover:shadow-primary transition-all duration-300"
        onClick={() => {
            if(!props.isPreview){
                navigate(`/cards/quotes/${props.data.cardID}`);
            }
        }}>
            <div className="w-full h-fit">
                <div className="line-clamp-1">{contsub(props.data.contention, props.data.subpoint)}</div>
                <div className="text-xl line-clamp-1">{props.data.title}</div>
                <a className="text-blue-500 underline line-clamp-1" target="_blank" rel="noopener noreferrer" href={props.data.sourceLink}>{props.data.sourceName}</a>
            </div>

            <div className="w-full h-fit">
                <div className="w-full h-px bg-accent"></div>
                <div className="text-2xl line-clamp-4">"{props.data.text}" - {props.data.quotee}</div>
                <div className="w-full h-px bg-accent"/>
            </div>
            
            <div className="flex flex-col space-y-2 h-full w-full overflow-clip">
                <div className="overflow-y-auto h-full">{props.data.reasoning}</div>
            </div>
        </button>
    )
}
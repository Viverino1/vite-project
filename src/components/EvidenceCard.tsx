import { useNavigate } from "react-router-dom";
import { Evidence } from "../utils/types";
import { contsub } from "../utils/helpers";

export default function EvidenceCard(props: {data: Evidence, isPreview: boolean}){
    const navigate = useNavigate();
    return(
        <button className="flex flex-col w-full h-96 p-2 rounded-lg bg-secondary text-accent
        shadow-md hover:shadow-sm shadow-primary hover:shadow-primary transition-all duration-300"
        onClick={() => {
            if(!props.isPreview){
                navigate(`/cards/evidences/${props.data.cardID}`);
            }
        }}>
            <div className="w-full h-fit">
                <div className="line-clamp-1">{contsub(props.data.contention, props.data.subpoint)}</div>
                <div className="text-xl line-clamp-1">{props.data.title}</div>
                <a className="text-blue-500 underline line-clamp-1" target="_blank" rel="noopener noreferrer" href={props.data.sourceLink}>{props.data.sourceName}</a>
            </div>
            <div className="flex flex-col space-y-2 h-full w-full overflow-clip">
                <div className="h-1/2 w-full overflow-y-auto border-2 p-2 border-primary rounded-lg border-opacity-50">{props.data.text}</div>
                <div className="h-1/2 w-full overflow-y-auto border-2 p-2 border-primary rounded-lg border-opacity-50">{props.data.reasoning}</div>
            </div>
        </button>
    )
}
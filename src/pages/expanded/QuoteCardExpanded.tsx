import { useEffect, useState } from "react";
import { contsub } from "../../utils/helpers";
import { Quote, User } from "../../utils/types";
import { getUser } from "../../utils/firebase/firestore";
import Loading from "../loading/Loading";
import Options from "./components/Options";
import Creator from "./components/Creator";

export default function QuoteCardExpanded(props: {data: Quote}){
    const [loading, setLoading] = useState(true);
    const [owner, setOwner] = useState({} as User);
    useEffect(() => {
        getUser(props.data.owner).then((user) => {
            setOwner(user? user : {} as User);
            setLoading(false);
        })
    }, []);

    if(loading){return(<Loading/>)}

    return (
        <div className="flex flex-col h-screen w-full p-4 overflow-y-scroll text-primary">
            <div className="text-2xl">{contsub(props.data.contention, props.data.subpoint)}</div>
            <div className="text-4xl">{props.data.title}</div>
            <a className="text-2xl text-blue-500 underline" target="_blank" rel="noopener noreferrer" href={props.data.sourceLink}> {props.data.sourceName}</a>

            <div className="text-2xl mt-4">Quotee</div>
            <div className="text-lg">{props.data.quotee}</div>
            <div className="text-2xl mt-4">Evidence</div>
            <div className="text-lg">{props.data.text}</div>
            <div className="text-2xl mt-4">Reasoning</div>
            <div className="text-lg">{props.data.reasoning}</div>

            <Creator owner={owner}/>
            <Options cardID={props.data.cardID}/>
        </div>
    )
}
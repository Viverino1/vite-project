import { useEffect, useState } from "react";
import { contsub } from "../../utils/helpers";
import { Evidence, User } from "../../utils/types";
import { getUser } from "../../utils/firebase/firestore";
import Loading from "../loading/Loading";

export default function EvidenceCardExpanded(props: {data: Evidence}){
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
            <div className="text-4xl">{props.data.title}</div>
            <div className="text-2xl">{contsub(props.data.contention, props.data.subpoint)}</div>
            <a className="text-2xl text-blue-500 underline" target="_blank" rel="noopener noreferrer" href={props.data.sourceLink}> {props.data.sourceName}</a>

            <div className="text-2xl mt-4">Evidence</div>
            <div className="text-lg">{props.data.text}</div>
            <div className="text-2xl mt-4">Reasoning</div>
            <div className="text-lg">{props.data.reasoning}</div>

            <div className="w-fit h-fit p-4 mt-4 rounded-lg bg-secondary">
                <div className="text-2xl">Creator</div>
                <div className="flex space-x-4 items-center">
                    <img src={owner.photoURL} className="w-16 h-16 rounded-full"/>
                    <div>
                        <div className="text-lg">{owner.userName}</div>
                        <div>{owner.email}</div>
                        <div>Speaker {owner.speaker}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
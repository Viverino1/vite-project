import { useEffect, useState } from "react";
import { Rebuttal, User } from "../../utils/types";
import { deleteRebuttalCard, getUser } from "../../utils/firebase/firestore";
import Loading from "../loading/Loading";

import Creator from "./components/Creator";
import { Pen, Share, Trash3 } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../utils/redux/hooks";
import { removeRebuttalCard } from "../../utils/redux/reducers/cards";

export default function RebuttalCardExpanded(props: {data: Rebuttal}){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const topic = useAppSelector((state) => state.app.topic);
    const side = useAppSelector((state) => state.app.side);

    const [loading, setLoading] = useState(true);
    const [owner, setOwner] = useState({} as User);
    useEffect(() => {
        getUser(props.data.owner).then((user) => {
            setOwner(user? user : {} as User);
            setLoading(false);
        })
    }, []);

    if(loading){return(<Loading/>)}

    return(
        <div className="flex flex-col h-screen w-full p-4 overflow-y-scroll text-primary">
            <div className="text-4xl">{props.data.title}</div>
            <a className="text-2xl text-blue-500 underline" target="_blank" rel="noopener noreferrer" href={props.data.sourceLink}> {props.data.sourceName}</a>
            <div className="text-2xl mt-4">Rebuttal To</div>
            <div className="text-lg">{props.data.rebuttalTo}</div>
            <div className="text-2xl mt-4">Evidence</div>
            <div className="text-lg">{props.data.text}</div>
            <div className="text-2xl mt-4">Reasoning</div>
            <div className="text-lg">{props.data.reasoning}</div>

            <Creator owner={owner}/>
            <div className="flex flex-col space-y-2 w-fit h-fit p-4 mt-4 rounded-lg bg-secondary">
                <div className="text-2xl">Options</div>
                <div className="w-full h-px bg-accent"/>
                <div className="flex space-x-4 text-secondary">
                    <button className="flex justify-center items-center w-16 h-16 bg-primary rounded-full"
                    onClick={() => {
                        navigate(`/edit/rebuttal/${props.data.cardID}`);
                    }}>
                        <Pen size={30}/>
                    </button>
                    <button className="flex justify-center items-center w-16 h-16 bg-primary rounded-full"
                    onClick={() => {
                        deleteRebuttalCard(topic, side, props.data.cardID).then(() => {
                            setTimeout(() => {
                                dispatch(removeRebuttalCard(props.data.cardID));
                                navigate("/cards");
                            }, 0);
                        })
                    }}>
                        <Trash3 size={30}/>
                    </button>
                    <button className="flex justify-center items-center w-16 h-16 bg-primary rounded-full"
                    onClick={() => {console.log("yes")}}>
                        <Share size={30}/>
                    </button>
                </div>
            </div>
        </div>
    )
}
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/redux/hooks";
import { Rebuttal } from "../../../utils/types";
import { getValue } from "../../../utils/helpers";
import RebuttalCard from "../../../components/RebuttalCard";
import { addRebuttalCard, saveRebuttalCard } from "../../../utils/firebase/firestore";
import { editRebuttalCard, newRebuttalCard } from "../../../utils/redux/reducers/cards";
import { useNavigate } from "react-router-dom";

export default function NewRebuttal(props: {editCard?: Rebuttal}){
    const {editCard} = props;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const side = useAppSelector((state) => state.app.side);
    const topic = useAppSelector((state) => state.app.topic);
    const user = useAppSelector((state) => state.auth.user);

    const [title, setTitle] = useState(editCard? editCard.title : "");
    const [rebuttalTo, setRebuttalTo] = useState(editCard? editCard.rebuttalTo : "");
    const [text, setText] = useState(editCard? editCard.text : "");
    const [sourceName, setSourceName] = useState(editCard? editCard.sourceName : "");
    const [sourceLink, setSourceLink] = useState(editCard? editCard.sourceLink : "");
    const [reasoning, setReasoning] = useState(editCard? editCard.reasoning : "");

    const data: Rebuttal = {
        title: title,
        owner: user.uid,
        text: text,
        sourceName: sourceName,
        sourceLink: sourceLink,
        cardID: editCard? editCard.cardID : "",
        reasoning: reasoning,
        rebuttalTo: rebuttalTo,
    }

    return(
        <div className="flex w-full h-screen">
            <div className="flex flex-col space-y-4 p-4 w-2/3">
                <input type="text" id="title" placeholder="Title" value={title}
                className="w-full h-16 p-2 rounded-lg bg-secondary text-3xl text-primary placeholder-primary outline-none
                shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300"
                onChange={() => {setTitle(getValue("title", ""))}}/>

                <input type="text" id="sourceName" placeholder="Source Name" value={sourceName}
                className="w-full h-10 p-2 rounded-lg bg-secondary text-xl text-primary placeholder-primary outline-none
                shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300"
                onChange={() => {setSourceName(getValue("sourceName", ""))}}/>

                <input type="text" id="sourceLink" placeholder="Source Link" value={sourceLink}
                className="w-full h-10 p-2 rounded-lg bg-secondary text-xl text-blue-500 placeholder-primary outline-none
                shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300"
                onChange={() => {setSourceLink(getValue("sourceLink", ""))}}/>

                <textarea id="rebuttalTo" className="w-full h-full text-lg p-2 bg-secondary rounded-lg outline-none resize-none placeholder-primary text-primary
                shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300"
                placeholder="What point are you refuting?"
                value={rebuttalTo}
                onChange={() => {setRebuttalTo(getValue("rebuttalTo", ""))}}/>

                <textarea id="text" className="w-full h-full text-lg p-2 bg-secondary rounded-lg outline-none resize-none placeholder-primary text-primary
                shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300"
                placeholder="Source Text"
                value={text}
                onChange={() => {setText(getValue("text", ""))}}/>

                <textarea id="reasoning" className="w-full h-full text-lg p-2 bg-secondary rounded-lg outline-none resize-none placeholder-primary text-primary
                shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300"
                placeholder="Reasoning"
                value={reasoning}
                onChange={() => {setReasoning(getValue("reasoning", ""))}}/>
            </div>
            <div className="flex flex-col space-y-4 justify-center items-center w-1/3 p-4">
                <RebuttalCard data={data} isPreview={true}/>
                <button className="w-32 h-10 bg-primary rounded-lg text-background
                shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300"
                onClick={() => {
                    if(!editCard){
                        addRebuttalCard(topic, side, data).then((card) => {
                            dispatch(newRebuttalCard(card));
                            navigate("/cards");
                        })
                    }else{
                        saveRebuttalCard(topic, side, data).then(() => {
                            dispatch(editRebuttalCard(data));
                            navigate("/cards");
                        })
                    }
                }}
                >Save</button>
            </div>
        </div>
    )
}
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/redux/hooks";
import { Rebuttal } from "../../../utils/types";
import { getValue } from "../../../utils/helpers";
import RebuttalCard from "../../../components/RebuttalCard";
import { addRebuttalCard } from "../../../utils/firebase/firestore";
import { newRebuttalCard } from "../../../utils/redux/reducers/cards";
import { useNavigate } from "react-router-dom";

export default function NewRebuttal(){
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const side = useAppSelector((state) => state.app.side);
    const topic = useAppSelector((state) => state.app.topic);
    const user = useAppSelector((state) => state.auth.user);

    const [title, setTitle] = useState("");
    const [rebuttalTo, setRebuttalTo] = useState("");
    const [text, setText] = useState("");
    const [sourceName, setSourceName] = useState("");
    const [sourceLink, setSourceLink] = useState("");
    const [reasoning, setReasoning] = useState("");

    const data: Rebuttal = {
        title: title,
        owner: user.uid,
        text: text,
        sourceName: sourceName,
        sourceLink: sourceLink,
        cardID: "",
        reasoning: reasoning,
        rebuttalTo: rebuttalTo,
    }

    return(
        <div className="flex w-full h-screen">
            <div className="flex flex-col space-y-4 p-4 w-2/3">
                <input type="text" id="title" placeholder="Title"
                className="w-full h-16 p-2 rounded-lg bg-secondary text-3xl text-primary placeholder-primary outline-none
                shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300"
                onChange={() => {setTitle(getValue("title", ""))}}/>

                <input type="text" id="sourceName" placeholder="Source Name"
                className="w-full h-10 p-2 rounded-lg bg-secondary text-xl text-primary placeholder-primary outline-none
                shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300"
                onChange={() => {setSourceName(getValue("sourceName", ""))}}/>

                <input type="text" id="sourceLink" placeholder="Source Link"
                className="w-full h-10 p-2 rounded-lg bg-secondary text-xl text-blue-500 placeholder-primary outline-none
                shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300"
                onChange={() => {setSourceLink(getValue("sourceLink", ""))}}/>

                <textarea id="rebuttalTo" className="w-full h-full text-lg p-2 bg-secondary rounded-lg outline-none resize-none placeholder-primary text-primary
                shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300" placeholder="What point are you refuting?"
                onChange={() => {setRebuttalTo(getValue("rebuttalTo", ""))}}/>

                <textarea id="text" className="w-full h-full text-lg p-2 bg-secondary rounded-lg outline-none resize-none placeholder-primary text-primary
                shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300" placeholder="Source Text"
                onChange={() => {setText(getValue("text", ""))}}/>

                <textarea id="reasoning" className="w-full h-full text-lg p-2 bg-secondary rounded-lg outline-none resize-none placeholder-primary text-primary
                shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300" placeholder="Reasoning"
                onChange={() => {setReasoning(getValue("reasoning", ""))}}/>
            </div>
            <div className="flex flex-col space-y-4 justify-center items-center w-1/3 p-4">
                <RebuttalCard data={data} isPreview={true}/>
                <button className="w-32 h-10 bg-primary rounded-lg text-background
                shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300"
                onClick={() => {
                    addRebuttalCard(topic, side, data).then((card) => {
                        dispatch(newRebuttalCard(card));
                        navigate("/cards");
                    })
                }}
                >Save</button>
            </div>
        </div>
    )
}
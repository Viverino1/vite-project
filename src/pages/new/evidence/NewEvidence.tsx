import { useEffect, useState } from "react";
import EvidenceCard from "../../../components/EvidenceCard";
import { Evidence } from "../../../utils/types";
import { getValue } from "../../../utils/helpers";
import { useAppSelector } from "../../../utils/redux/hooks";
import { addEvidenceCard, saveEvidenceCard } from "../../../utils/firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editEvidenceCard, newEvidenceCard } from "../../../utils/redux/reducers/cards";

export default function NewEvidence(props: {editCard?: Evidence}){
    const { editCard } = props;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const side = useAppSelector((state) => state.app.side);
    const topic = useAppSelector((state) => state.app.topic);

    const user = useAppSelector((state) => state.auth.user);
    const contentions = useAppSelector((state) => state.team.contentions);

    const [title, setTitle] = useState(editCard? editCard.title : "");
    const [contention, setContention] = useState(editCard? editCard.contention : -3);
    const [subpoint, setSubpoint] = useState(editCard? editCard.subpoint : -1);
    const [text, setText] = useState(editCard? editCard.text : "");   
    const [sourceName, setSourceName] = useState(editCard? editCard.sourceName : "");
    const [sourceLink, setSourceLink] = useState(editCard? editCard.sourceLink : "");
    const [reasoning, setReasoning] = useState(editCard? editCard.reasoning : "");

    const data: Evidence = {
        title: title,
        owner: user.uid,
        contention: contention,
        subpoint: contention < -2 ? -1 : subpoint,
        text: text,
        sourceName: sourceName,
        sourceLink: sourceLink,
        cardID: editCard? editCard.cardID : "",
        reasoning: reasoning,
    }

    useEffect(() => {
        if(!editCard){
            setContention(-3);
        }
    }, [side, topic]);

    return (
        <div className="flex w-full h-screen">
            <div className="flex flex-col space-y-4 p-4 w-2/3">
                <input type="text" id="title" placeholder="Title" value={title}
                className="w-full h-16 p-2 rounded-lg bg-secondary text-3xl text-primary placeholder-primary outline-none
                shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300"
                onChange={() => {setTitle(getValue("title", ""))}}/>

                <div className="flex space-x-4">
                    <select id="contention" value={contention} className="w-1/2 h-10 p-2 rounded-lg bg-secondary text-xl text-primary placeholder-primary outline-none appearance-none text-center
                    shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300"
                    onChange={() => {setContention(parseInt(getValue("contention", "")))}}>
                        <option value={-3}>No Contention</option>
                        <option value={-2}>Intro</option>
                        {contentions.map((contention, index) => (
                            <option key={index} value={index}>Contention {index + 1}: {contention.name}</option>
                        ))}
                        <option value={-1}>Conclusion</option>
                    </select>

                    <select id="subpoint" value={subpoint} className="w-1/2 h-10 p-2 rounded-lg bg-secondary text-xl text-primary placeholder-primary outline-none appearance-none text-center
                    shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300"
                    onChange={() => {setSubpoint(parseInt(getValue("subpoint", "")))}}>
                        <option value={-1}>No Subpoint</option>
                        {contentions[contention]?.subpoints.map((subpoint, index) => (
                            <option key={index} value={index}>Subpoint {index + 1}: {subpoint}</option>
                        ))}
                    </select>
                </div>

                <input type="text" id="sourceName" value={sourceName} placeholder="Source Name"
                className="w-full h-10 p-2 rounded-lg bg-secondary text-xl text-primary placeholder-primary outline-none
                shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300"
                onChange={() => {setSourceName(getValue("sourceName", ""))}}/>

                <input type="text" id="sourceLink" value={sourceLink} placeholder="Source Link"
                className="w-full h-10 p-2 rounded-lg bg-secondary text-xl text-blue-500 placeholder-primary outline-none
                shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300"
                onChange={() => {setSourceLink(getValue("sourceLink", ""))}}/>

                <textarea id="text" value={text} className="w-full h-full text-lg p-2 bg-secondary rounded-lg outline-none resize-none placeholder-primary text-primary
                shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300" placeholder="Evidence"
                onChange={() => {setText(getValue("text", ""))}}/>

                <textarea id="reasoning" value={reasoning} className="w-full h-full text-lg p-2 bg-secondary rounded-lg outline-none resize-none placeholder-primary text-primary
                shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300" placeholder="Reasoning"
                onChange={() => {setReasoning(getValue("reasoning", ""))}}/>
            </div>
            <div className="flex flex-col space-y-4 justify-center items-center w-1/3 p-4">
                <EvidenceCard data={data} isPreview={true}/>
                <button className="w-32 h-10 bg-primary rounded-lg text-background
                shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300"
                onClick={() => {
                    if(!editCard){
                        addEvidenceCard(topic, side, data).then((card) => {
                            dispatch(newEvidenceCard(card));
                            navigate("/cards");
                        });
                    }else{
                        saveEvidenceCard(topic, side, data).then(() => {
                            dispatch(editEvidenceCard(data));
                            navigate("/cards");
                        })
                    }
                }}
                >Save</button>
            </div>
        </div>
    )
}
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../utils/redux/hooks";
import { Quote } from "../../../utils/types";
import { getValue } from "../../../utils/helpers";
import QuoteCard from "../../../components/QuoteCard";
import { addQuoteCard, saveQuoteCard } from "../../../utils/firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editQuoteCard, newQuoteCard } from "../../../utils/redux/reducers/cards";

export default function NewQuote(props: {editCard?: Quote}){
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
    const [quotee, setQuotee] = useState(editCard? editCard.quotee : "");

    const data: Quote = {
        title: title,
        owner: user.uid,
        contention: contention,
        subpoint: contention < -2 ? -1 : subpoint,
        text: text,
        sourceName: sourceName,
        sourceLink: sourceLink,
        cardID: editCard? editCard.cardID : "",
        reasoning: reasoning,
        quotee: quotee,
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
                    <select id="contention" className="w-1/2 h-10 p-2 rounded-lg bg-secondary text-xl text-primary placeholder-primary outline-none appearance-none text-center
                    shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300"
                    value={contention}
                    onChange={() => {setContention(parseInt(getValue("contention", "")))}}>
                        <option value={-3}>No Contention</option>
                        <option value={-2}>Intro</option>
                        {contentions.map((contention, index) => (
                            <option key={index} value={index}>Contention {index + 1}: {contention.name}</option>
                        ))}
                        <option value={-1}>Conclusion</option>
                    </select>

                    <select id="subpoint" className="w-1/2 h-10 p-2 rounded-lg bg-secondary text-xl text-primary placeholder-primary outline-none appearance-none text-center
                    shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300"
                    value={subpoint}
                    onChange={() => {setSubpoint(parseInt(getValue("subpoint", "")))}}>
                        <option value={-1}>No Subpoint</option>
                        {contentions[contention]?.subpoints.map((subpoint, index) => (
                            <option key={index} value={index}>Subpoint {index + 1}: {subpoint}</option>
                        ))}
                    </select>
                </div>

                <input type="text" id="sourceName" placeholder="Source Name" value={sourceName}
                className="w-full h-10 p-2 rounded-lg bg-secondary text-xl text-primary placeholder-primary outline-none
                shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300"
                onChange={() => {setSourceName(getValue("sourceName", ""))}}/>

                <input type="text" id="sourceLink" placeholder="Source Link" value={sourceLink}
                className="w-full h-10 p-2 rounded-lg bg-secondary text-xl text-blue-500 placeholder-primary outline-none
                shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300"
                onChange={() => {setSourceLink(getValue("sourceLink", ""))}}/>
                
                <input type="text" id="quotee" placeholder="Who said the quote?" value={quotee}
                className="w-full h-10 p-2 rounded-lg bg-secondary text-xl text-primary placeholder-primary outline-none
                shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300"
                onChange={() => {setQuotee(getValue("quotee", ""))}}/>

                <textarea id="text" className="w-full h-full text-lg p-2 bg-secondary rounded-lg outline-none resize-none placeholder-primary text-primary
                shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300"
                placeholder="Quote" value={text}
                onChange={() => {setText(getValue("text", ""))}}/>

                <textarea id="reasoning" className="w-full h-full text-lg p-2 bg-secondary rounded-lg outline-none resize-none placeholder-primary text-primary
                shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300"
                placeholder="Reasoning" value={reasoning}
                onChange={() => {setReasoning(getValue("reasoning", ""))}}/>
            </div>
            <div className="flex flex-col space-y-4 justify-center items-center w-1/3 p-4">
                <QuoteCard data={data} isPreview={true}/>
                <button className="w-32 h-10 bg-primary rounded-lg text-background
                shadow-primary shadow-md hover:shadow-primary hover:shadow-sm transition-all duration-300"
                onClick={() => {
                    if(!editCard){
                        addQuoteCard(topic, side, data).then((card) => {
                            dispatch(newQuoteCard(card));
                            navigate("/cards");
                        })
                    }else{
                        saveQuoteCard(topic, side, data).then(() => {
                            dispatch(editQuoteCard(data));
                            navigate("/cards");
                        })
                    }
                }}
                >Save</button>
            </div>
        </div>
    )
}
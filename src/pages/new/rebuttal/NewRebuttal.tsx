import { useState } from "react";
import { useAppSelector } from "../../../utils/redux/hooks";
import { Rebuttal } from "../../../utils/types";

export default function NewRebuttal(){
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
        owner: "",
        text: text,
        sourceName: sourceName,
        sourceLink: sourceLink,
        cardID: "",
        reasoning: reasoning,
        rebuttalTo: rebuttalTo,
    }

    
}
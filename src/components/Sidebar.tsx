import { ReactElement } from "react"
import { CardHeading, Collection } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../utils/redux/hooks";
import { setSide, setTopic } from "../utils/redux/reducers/app";
import { getValue } from "../utils/helpers";

function Sidebar(){
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const topics = useAppSelector((state) => state.public.topics);
    const topic = useAppSelector((state) => state.app.topic);
    const side = useAppSelector((state) => state.app.side);

    return(
        <div className="group relative w-21 flex flex-col space-y-2 hover:w-72 h-full p-2 transition-all duration-300 bg-accent text-background">
            <div className="flex flex-col space-y-2 items-center w-full h-fit">
                <button className="rounded-full overflow-clip" onClick={() => {navigate("/settings")}}><img src={user.photoURL} alt="user photo" className="w-16 h-16"/></button>
                <div className="flex flex-col space-y-2 items-center w-full h-0 group-hover:h-16 overflow-clip whitespace-nowrap group-hover:opacity-100 opacity-0 transition-all duration-300">
                    <div className="flex justify-center h-6">{user.userName}</div>
                    <div className="flex space-x-2 w-full">
                        <select defaultValue={topic} id="topicSelector" className="w-1/2 h-8 rounded-lg bg-primary outline-none text-center"
                        onChange={() => {
                            dispatch(setTopic(getValue("topicSelector", "")));
                        }}>
                            {topics.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                        <select defaultValue={side} id="sideSelector" className="w-1/2 h-8 rounded-lg bg-primary outline-none text-center"
                        onChange={() => {
                            dispatch(setSide(getValue("sideSelector", "")));
                        }}>
                            <option value="AFF">AFF</option>
                            <option value="NEG">NEG</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-2">
                <SidebarElement text={"Debate Tool"} link={"/"} icon={<img src="/DebateToolLogo.svg"/>}/>
                <SidebarElement text={"View Cards"} link={"/cards"} icon={<Collection size={35}/>}/>
                <SidebarElement text={"New Card"} link={"/new"} icon={<CardHeading size={35}/>}/>
            </div>
        </div>
    )
}

function SidebarElement(props: {text: string, link: string, icon: ReactElement}){
    const navigate = useNavigate();
    return(
        <button className="relative flex items-center justify-center h-17 w-full p-2 rounded-lg border-2 border-transparent 
        bg-transparent hover:bg-primary group-hover:border-primary transition-all duration-300 overflow-clip"
        onClick={() => {navigate(props.link)}}>
            <div className="absolute left-2 flex justify-center items-center w-12 h-12 rounded-full overflow-clip">{props.icon}</div>
            <div className="whitespace-nowrap opacity-0 group-hover:opacity-100 duration-300 text-md">{props.text}</div>
        </button>
    )
}

export default Sidebar;
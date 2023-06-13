import { User } from "../../../utils/types";

export default function Creator(props: {owner: User}){
    return(
        <div className="flex flex-col space-y-2 w-fit h-fit p-4 mt-4 rounded-lg bg-secondary">
            <div className="text-2xl">Creator</div>
            <div className="w-full h-px bg-accent"/>
            <div className="flex space-x-4 items-center">
                <img src={props.owner.photoURL} className="w-16 h-16 rounded-full"/>
                <div>
                    <div className="text-lg">{props.owner.userName}</div>
                    <div>{props.owner.email}</div>
                    <div>Speaker {props.owner.speaker}</div>
                </div>
            </div>
        </div>
    )
}
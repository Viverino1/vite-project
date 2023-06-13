import { Pen, Share, Trash3 } from "react-bootstrap-icons";

export default function Options(props: {cardID: string}){
    return(
        <div className="flex flex-col space-y-2 w-fit h-fit p-4 mt-4 rounded-lg bg-secondary">
            <div className="text-2xl">Options</div>
            <div className="w-full h-px bg-accent"/>
            <div className="flex space-x-4 text-secondary">
                <button className="flex justify-center items-center w-16 h-16 bg-primary rounded-full">
                    <Pen size={30}/>
                </button>
                <button className="flex justify-center items-center w-16 h-16 bg-primary rounded-full">
                    <Trash3 size={30}/>
                </button>
                <button className="flex justify-center items-center w-16 h-16 bg-primary rounded-full"
                onClick={() => {console.log(props.cardID)}}>
                    <Share size={30}/>
                </button>
            </div>
        </div>
    )
}
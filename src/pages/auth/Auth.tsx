import { ReactElement } from "react"
import { Google } from "react-bootstrap-icons"
import { handleAuthClick } from "../../utils/firebase/auth"
import { useAppDispatch } from "../../utils/redux/hooks"
import { setUser } from "../../utils/redux/reducers/auth";

export default function Auth(){
    const dispatch = useAppDispatch();
    return(
        <div className="flex w-full h-screen justify-center items-center">
            <div className="flex flex-col justify-center items-center w-full h-screen bg-primary text-background">
                <div className="text-6xl text-center">Welcome to Debate Tool</div>
                <div className="text-3xl">By Vivek Maddineni</div>
                <div className="text-xl flex text-center px-16 mt-4">
                    This tool was made to unify your public forum debate experience all under one app.
                    That includes cases, cards, contentions, rebuttals, rounds, and much more.
                </div>
                <div className="mt-4 block md:hidden">
                    <Provider name="Login With Google" logo={<Google size={30}/>} callback={() => {
                        handleAuthClick().then((user) => {
                            if(user){dispatch(setUser(user));}
                        })
                    }}/>
                </div>
            </div>
            <div className="md:visible invisible md:flex hidden w-1/3 overflow-clip  flex-col space-y-4 justify-center items-center h-screen p-4 bg-background text-primary">
                <div className="text-4xl">User Login</div>
                <div className="w-full h-px bg-accent"/>
                <div className="flex justify-center w-full">
                    <Provider name="Login With Google" logo={<Google size={30}/>} callback={() => {
                        handleAuthClick().then((user) => {
                            if(user){dispatch(setUser(user));}
                        })
                    }}/>
                </div>
            </div>
        </div>
    )
}

function Provider(props: {name: string, logo: ReactElement, callback: () => void}){
    return(
        <button className="flex justify-center items-center space-x-2 w-fit h-16 pr-4 pl-2 rounded-lg bg-primary border-2 border-background text-background transition-all duration-300 hover:bg-accent" onClick={props.callback}>
            <div className="flex justify-center items-center w-12 h-12 rounded-full">{props.logo}</div>
            <div className="text-xl">{props.name}</div>
        </button>
    )
}
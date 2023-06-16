import { useState } from "react";
import { getUser, handleInviteAccept, handleInviteDecline } from "../../utils/firebase/firestore";
import { Team, User } from "../../utils/types";
import Creator from "../expanded/components/Creator";
import { useAppSelector } from "../../utils/redux/hooks";

export default function TeamInvite(props: {team: Team}){
    const {team} = props;
    const [owner, setOwner] = useState<User>({} as User);
    const user = useAppSelector((state) => state.auth.user);
    getUser(team.owner).then((u) => {
        if(u){setOwner(u)}
    })

    return(
        <div className="flex p-4 items-center justify-center w-full h-screen bg-background text-primary">
            <div className="absolute top-4 text-5xl">Debate Tool</div>
            <div className="flex flex-col items-center text-center space-y-4 w-104 h-fit p-4 rounded-lg bg-secondary">
                <div className="text-2xl">{team.teamName}</div>
                <div className="text-lg">You've been invited to join this DebateTool team!</div>
                <div className="border-2 border-primary rounded-lg"><Creator owner={owner}/></div>
                <div className="text-lg">Join this team to team to add members, configure contentions, save private data, and more.</div>
                <div className="flex w-full justify-evenly">
                    <button className="w-32 h-10 rounded-lg bg-primary text-background"
                    onClick={() => {
                        handleInviteAccept(user, team);
                    }}>Join Team</button>
                    <button className="w-32 h-10 rounded-lg bg-primary text-background"
                    onClick={() => {
                        handleInviteDecline(user)
                    }}>Decline</button>
                </div>
            </div>
        </div>
    )
}
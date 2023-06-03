
import { ExclamationCircleFill, PlusLg, Trash3Fill } from "react-bootstrap-icons";
import { useAppDispatch, useAppSelector } from "../../utils/redux/hooks";
import { Contention, Subpoint, Team } from "../../utils/types";
import { useState } from "react";
import { handleSignOutClick } from "../../utils/firebase/auth";
import { useDispatch } from "react-redux";
import { setUserName } from "../../utils/redux/reducers/auth";
import { getValue } from "../../utils/helpers";
import { createTeam, getUser } from "../../utils/firebase/firestore";
import { addContention, addSupboint, deleteContention, deleteSubpoint, setContentions, setTeam, setTeamName } from "../../utils/redux/reducers/team";
import { useNavigate } from "react-router-dom";

export default function Settings(){
    const team = useAppSelector((state) => state.team.team);

    if(team.teamID) {
        return(
            <div className="flex flex-col space-y-4 w-full h-full p-4 text-accent text-lg overflow-scroll">
                <TeamOptions team={team}/>
                <CaseOptions/>
                <AccountOptions/>
            </div>
        )
    }else{
        return(
            <div className="flex flex-col space-y-4 w-full h-full p-4 text-accent text-lg overflow-scroll">
                <CreateTeam/>
                <AccountOptions/>
            </div>
        )
    }
}

function CreateTeam(){
    const dispatch = useAppDispatch();

    const users = useAppSelector((state) => state.public.users);
    const user = useAppSelector((state) => state.auth.user);

    const [teamNameError, setTeamNameError] = useState("");
    const [inviteMemberError, setInviteMemberError] = useState("");

    return(
        <div className="flex flex-col space-y-4 w-full h-fit p-4 rounded-lg bg-secondary shadow-md shadow-primary">
            <div className="text-3xl">Create a Team</div>
            <div>Create a team to add members, configure contentions, save private data, and more.</div>
            <div className="w-full h-fit">
                <div className="flex space-x-4">
                    <div>Team Name</div>
                    <div className={`space-x-2 items-center text-red-500 ${teamNameError? "flex" : "hidden"}`}>
                        <ExclamationCircleFill size={20}/>
                        <div>{teamNameError}</div>
                    </div>
                </div>
                <input id="teamName" type="text" className="h-10 w-full p-2 rounded-lg bg-background outline-none"/>
            </div>
            <div className="w-full h-fit">
                <div className="flex space-x-4">
                    <div>Invite Member By Email</div>
                    <div className={`space-x-2 items-center text-red-500 ${inviteMemberError? "flex" : "hidden"}`}>
                        <ExclamationCircleFill size={20}/>
                        <div>{inviteMemberError}</div>
                    </div>
                </div>
                <select id="teamMember" className="h-10 w-full p-2 rounded-lg bg-background outline-none">
                    <option value="">Select a User</option>
                    {users.map((user) => (
                        <option key={user.uid} value={user.uid}>{user.email} ({user.userName})</option>
                    ))}
                </select>
            </div>
            <div className="w-full h-fit">
                <button className="flex justify-center items-center h-10 w-fit p-4 rounded-lg bg-primary text-secondary outline-none
                hover:shadow-lg hover:shadow-primary transition-all duration-300"
                onClick={() => {
                    setTeamNameError("");
                    setInviteMemberError("");

                    const memberUID = getValue("teamMember", "");
                    const teamName = getValue("teamName", "")

                    if(!teamName){setTeamNameError("Enter a name for your team.")}

                    if(memberUID){
                        getUser(memberUID).then((member) => {
                            if(member){
                                if(!member.teamID){
                                    if(teamName){
                                        const newTeam: Team = {
                                            owner: user.uid,
                                            members: [member.uid],
                                            teamName: teamName,
                                            contentions: [],
                                            teamID: "",
                                        };
                                        createTeam(newTeam).then((t) => {dispatch(setTeam(t))})
                                    }
                                }else{setInviteMemberError("This member is already part of a team.")}
                            }else{setInviteMemberError("This member could not be found.")}
                        })
                    }else{setInviteMemberError("Select a user.")}
                }}>Create Team</button>
            </div>
        </div>
    )
}

function CaseOptions(){
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const contentions = useAppSelector((state) => state.team.team.contentions);
    return(
        <div className="flex flex-col space-y-4 w-full h-fit p-4 rounded-lg bg-secondary shadow-md shadow-primary">
            <div className="text-3xl">Case Options</div>
            {contentions.map((contention, index) => (
                <div key={index} className="flex flex-col space-y-4 w-full h-fit">
                    <div className="w-full h-fit">
                        <div>Contention {index + 1}</div>
                        <div className="flex space-x-4">
                            <input type="text" id={"cont" + (index + 1)} defaultValue={contention.name} className="h-10 w-full p-2 rounded-lg bg-background outline-none"/>
                            <button className="flex justify-center items-center w-10 h-10 rounded-lg bg-primary text-background"
                            onClick={() => {
                                dispatch(deleteContention(index));
                            }}>
                                <Trash3Fill size={25}/>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4 pl-16 w-full h-fit">

                        {contention.subpoints.map((subpoint, i) => (
                            <div key={i} className="w-full h-fit">
                                <div>Subpoint {i + 1}</div>
                                <div className="flex space-x-4">
                                <input type="text" id={"cont" + (index + 1) + "sub" + (i + 1)} defaultValue={subpoint} className="h-10 w-full p-2 rounded-lg bg-background outline-none"/>
                                    <button className="flex justify-center items-center w-10 h-10 rounded-lg bg-primary text-background"
                                    onClick={() => {
                                        dispatch(deleteSubpoint({contention: index, subpoint: i} as Subpoint));
                                        navigate("/NULL");
                                        setTimeout(() => {
                                            navigate("/settings");
                                        }, 0);
                                    }}>
                                        <Trash3Fill size={25}/>
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button className="flex justify-center items-center space-x-4 h-10 p-4 w-fit rounded-lg bg-primary text-secondary outline-none
                        hover:shadow-lg hover:shadow-primary transition-all duration-300"
                        onClick={() => {
                            dispatch(addSupboint(index));
                        }}>
                            <PlusLg size={20}/>
                            <div>Add Subpoint</div>
                        </button>
                    </div>
                </div>
            ))}
            <button className="flex justify-center items-center space-x-4 h-10 p-4 w-fit rounded-lg bg-primary text-secondary outline-none
            hover:shadow-lg hover:shadow-primary transition-all duration-300"
            onClick={() => {
                dispatch(addContention());
            }}>
                <PlusLg size={20}/>
                <div>Add Contention</div>
            </button>
            <button className="flex justify-center items-center h-10 w-32 rounded-lg bg-primary text-secondary outline-none
            hover:shadow-lg hover:shadow-primary transition-all duration-300"
            onClick={() => {
                const newContentions: Contention[] = [];
                contentions.forEach((contention, c) => {
                    const contID = "cont" + (c + 1);
                    newContentions.push({name: getValue("cont1", ""), subpoints: []} as Contention);
                    contention.subpoints.forEach((subpoint, s) => {
                        const subID = contID + "sub" + (s + 1);
                        newContentions[c].subpoints.push(getValue(subID, ""));
                    })
                })
                dispatch(setContentions(newContentions));
            }}>Save</button>
        </div>
    )
}

function TeamOptions(props: {team: Team}){
    const dispatch = useAppDispatch()
    return(
        <div className="flex flex-col space-y-4 w-full h-fit p-4 rounded-lg bg-secondary shadow-md shadow-primary">
            <div className="text-3xl">Team Options</div>
            <div className="w-full h-fit">
                <div>Team Name</div>
                <input type="text" id="editTeamName" defaultValue={props.team.teamName} className="h-10 w-full p-2 rounded-lg bg-background outline-none"/>
            </div>

            <button className="flex justify-center items-center h-10 w-32 p-4 rounded-lg bg-primary text-secondary outline-none
                    hover:shadow-lg hover:shadow-primary transition-all duration-300"
                    onClick={() => {dispatch(setTeamName(getValue("editTeamName", props.team.teamName)))}}
                >Save</button>
        </div>
    )
}

function AccountOptions(){
    const dispatch = useDispatch();
    const user = useAppSelector((state) => state.auth.user);
    return(
        <div className="flex flex-col space-y-4 w-full h-fit p-4 rounded-lg bg-secondary shadow-md shadow-primary">
            <div className="text-3xl">Account Options</div>
            <div className="flex flex-col space-y-4 w-full h-fit">
                <div className="w-full h-fit">
                    <div>User Name</div>
                    <input type="text" id="userName" defaultValue={user.userName} className="h-10 w-full p-2 rounded-lg bg-background outline-none"/>
                </div>

                <button className="flex justify-center items-center h-10 w-32 p-4 rounded-lg bg-primary text-secondary outline-none
                    hover:shadow-lg hover:shadow-primary transition-all duration-300"
                    onClick={() => {
                        dispatch(setUserName(getValue("userName", user.displayName)));
                    }}
                >Save</button>

                <button className="flex justify-center items-center h-10 w-32 p-4 rounded-lg bg-primary text-secondary outline-none
                    hover:shadow-lg hover:shadow-primary transition-all duration-300"
                    onClick={handleSignOutClick}
                >Log Out</button>
            </div>
        </div>
    )
}
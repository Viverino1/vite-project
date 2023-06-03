import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./utils/redux/hooks"
import Sidebar from "./components/Sidebar";
import Auth from "./pages/auth/Auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase/auth";
import { setUser } from "./utils/redux/reducers/auth";
import { clearUser } from "./utils/redux/reducers/auth";
import { useEffect, useState } from "react";
import { Team, User } from "./utils/types";
import { setTeam } from "./utils/redux/reducers/team";
import { getPublicData, getTeam, getUser, getUsers, saveTeam, saveUser } from "./utils/firebase/firestore";
import { setTopics, setUsers } from "./utils/redux/reducers/public";
import Home from "./pages/home/home";
import Settings from "./pages/settings/Settings";

export default function App(){
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const [isLoading, setIsLoading] = useState(true);

    onAuthStateChanged(auth, (u) => {
        if(u){
            getUser(u.uid).then((user) => {
                dispatch(user? setUser(user) : clearUser());
                if(!user){return;}

                getData(user).then((data) => {
                    dispatch(setTeam(data.team));
                    dispatch(setUsers(data.users));
                    dispatch(setTopics(data.topics));
            
                    setIsLoading(false);
                })
            })
        }else{
            dispatch(clearUser());
            auth.signOut();
            setIsLoading(false);
        }
    })

    if(isLoggedIn && !isLoading) {
        return(
            <div>
                <UpdateData/>
                <BrowserRouter>
                    <div className="relative h-screen w-full">
                        <div className="absolute z-50 top-0 left-0 bottom-0">
                            <Sidebar/>
                        </div>
                        <div className="absolute z-40 top-0 bottom-0 right-0 left-21 h-screen bg-background">
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/cards" element={<div>Cards</div>}/>
                                <Route path="/settings" element={<Settings/>}/>
                            </Routes>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        )
    } if(isLoading){
        return(
            <div>Loading...</div>
        )
    }else{
        return(
            <Auth/>
        )
    }
}

async function getData(user: User){
    const users = await getUsers();

    const publicData = await getPublicData();
    const topics = publicData.topics;

    const team = user.teamID? await getTeam(user.teamID) : {} as Team;

    return {team, users, topics}
}

//Update data on firestore each time it changes in the app state.
function UpdateData(){
    const user = useAppSelector((state) => state.auth.user);
    const team = useAppSelector((state) => state.team.team);
    
    useEffect(() => {saveUser(user)}, [user]);
    useEffect(() => {saveTeam(team)}, [team]);

    return null;
}
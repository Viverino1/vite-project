import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./utils/redux/hooks"
import Sidebar from "./components/Sidebar";
import Auth from "./pages/auth/Auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase/auth";
import { setUser } from "./utils/redux/reducers/auth";
import { clearUser } from "./utils/redux/reducers/auth";
import { useEffect, useState } from "react";
import { Contention, Evidence, Team, User } from "./utils/types";
import { setContentions, setTeam } from "./utils/redux/reducers/team";
import { getContentions, getEvidenceCards, getPublicData, getTeam, getUser, getUsers, saveContentions, saveTeam, saveUser } from "./utils/firebase/firestore";
import { setTopics, setUsers } from "./utils/redux/reducers/public";
import Home from "./pages/home/home";
import Settings from "./pages/settings/Settings";
import Loading from "./pages/loading/Loading";
import Cards from "./pages/cards/cards";
import { setTopic } from "./utils/redux/reducers/app";
import { useDispatch } from "react-redux";
import { setEvidenceCards } from "./utils/redux/reducers/cards";
import New from "./pages/new/New";
import NewEvidence from "./pages/new/evidence/NewEvidence";
import EvidenceCardExpanded from "./pages/expanded/EvidenceCardExpanded";

export default function App(){
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const [isLoading, setIsLoading] = useState(true);

    const evidences = useAppSelector((state) => state.cards.evidences);

    const cards: (Evidence)[] = [];
    evidences.forEach((evidence) => {
        cards.push(evidence);
    })

    onAuthStateChanged(auth, (u) => {
        if(u){
            getUser(u.uid).then((user) => {
                dispatch(user? setUser(user) : clearUser());
                if(!user || !isLoading){return;}

                getData(user).then((data) => {
                    dispatch(setTeam(data.team));
                    dispatch(setUsers(data.users));
                    dispatch(setTopics(data.topics));
                    dispatch(setTopic(data.topic));
                    dispatch(setContentions(data.contentions));
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
                                <Route path="/cards" element={<Cards/>}/>
                                {cards.map((card, index) => (
                                    <Route key={index} path={"/cards:" + card.cardID} element={<EvidenceCardExpanded data={card}/>}/>
                                ))}
                                <Route path="/settings" element={<Settings/>}/>
                                <Route path="/new" element={<New/>}/>
                                <Route path="/new-evidence" element={<NewEvidence/>}/>
                            </Routes>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        )
    } if(isLoading){
        return(
            <Loading/>
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
    const topic = topics[topics.length - 1];

    const team = user.teamID? await getTeam(user.teamID) : {} as Team;

    const contentions = await getContentions(user.teamID, topic, "AFF");

    const evidences = await getEvidenceCards(topic, "AFF");

    return {team, users, topics, topic, contentions, evidences}
}

//Update data on firestore each time it changes in the app state.
function UpdateData(){
    const dispatch = useDispatch();

    const topic = useAppSelector((state) => state.app.topic);
    const side = useAppSelector((state) => state.app.side);

    const user = useAppSelector((state) => state.auth.user);
    const team = useAppSelector((state) => state.team.team);

    const contentions = useAppSelector((state) => state.team.contentions);
    
    useEffect(() => {saveUser(user)}, [user]);
    useEffect(() => {saveTeam(team)}, [team]);
    useEffect(() => {saveContentions(team.teamID, topic, side, contentions)}, [contentions]);

    useEffect(() => {
        getContentions(team.teamID, topic, side).then((contentions) => {
            if(contentions){
                dispatch(setContentions(contentions as Contention[]));
            }else{
                dispatch(setContentions([]));
            }
        });

        getEvidenceCards(topic, side).then((evidences) => {
            dispatch(setEvidenceCards(evidences));
        })
        
    }, [side, topic]);

    return null;
}
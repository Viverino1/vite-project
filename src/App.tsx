import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./utils/redux/hooks"
import Sidebar from "./components/Sidebar";
import Auth from "./pages/auth/Auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase/auth";
import { setUser } from "./utils/redux/reducers/auth";
import { clearUser } from "./utils/redux/reducers/auth";
import { useEffect, useState } from "react";
import { Contention, Team, User } from "./utils/types";
import { setContentions, setTeam } from "./utils/redux/reducers/team";
import { getContentions, getEvidenceCards, getPublicData, getQuoteCards, getRebuttalCards, getTeam, getUser, getUsers, saveContentions, saveTeam, saveUser } from "./utils/firebase/firestore";
import { setTopics, setUsers } from "./utils/redux/reducers/public";
import Home from "./pages/home/home";
import Settings from "./pages/settings/Settings";
import Loading from "./pages/loading/Loading";
import Cards from "./pages/cards/cards";
import { setTopic } from "./utils/redux/reducers/app";
import { useDispatch } from "react-redux";
import { setEvidenceCards, setQuoteCards, setRebuttalCards } from "./utils/redux/reducers/cards";
import New from "./pages/new/New";
import NewEvidence from "./pages/new/evidence/NewEvidence";
import EvidenceCardExpanded from "./pages/expanded/EvidenceCardExpanded";
import NewRebuttal from "./pages/new/rebuttal/NewRebuttal";
import RebuttalCardExpanded from "./pages/expanded/RebuttalCardExpanded";
import NewQuote from "./pages/new/quote/NewQuote";
import QuoteCardExpanded from "./pages/expanded/QuoteCardExpanded";

export default function App(){
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const [isLoading, setIsLoading] = useState(true);

    const evidences = useAppSelector((state) => state.cards.evidences);
    const rebuttals = useAppSelector((state) => state.cards.rebuttals);
    const quotes = useAppSelector((state) => state.cards.quotes);

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
                                {evidences.map((card, index) => (
                                    <Route key={index} path={"/cards:evidences:" + card.cardID} element={<EvidenceCardExpanded data={card}/>}/>
                                ))}
                                {rebuttals.map((card, index) => (
                                    <Route key={index} path={"/cards:rebuttals:" + card.cardID} element={<RebuttalCardExpanded data={card}/>}/>
                                ))}
                                {quotes.map((card, index) => (
                                    <Route key={index} path={"/cards:quotes:" + card.cardID} element={<QuoteCardExpanded data={card}/>}/>
                                ))}
                                <Route path="/settings" element={<Settings/>}/>
                                <Route path="/new" element={<New/>}/>
                                <Route path="/new-evidence" element={<NewEvidence/>}/>
                                <Route path="/new-rebuttal" element={<NewRebuttal/>}/>
                                <Route path="/new-quote" element={<NewQuote/>}/>
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

    return {team, users, topics, topic, contentions}
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

        getRebuttalCards(topic, side).then((rebuttals) => {
            dispatch(setRebuttalCards(rebuttals));
        })

        getQuoteCards(topic, side).then((quotes) => {
            dispatch(setQuoteCards(quotes));
        })
        
    }, [side, topic]);

    return null;
}
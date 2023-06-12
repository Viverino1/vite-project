import { CollectionReference, DocumentData, addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import app from "./config";
import { Contention, Contentions, Evidence, PublicData, Rebuttal, Team, User } from "../types";

const db = getFirestore(app);

const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(db, collectionName) as CollectionReference<T>
}

const usersCol = createCollection<User>('users');

function saveUser(user:User){
    if(!user.uid){return;}
    
    const userRef = doc(usersCol, user.uid);
    setDoc(userRef, user, {merge: true});
}

async function getUser(uid: string){
    const users = await getUsers();
    const user = users.find(u => u.uid == uid);
    return user
}

async function getUsers(){
    const usersSnap = await getDocs(usersCol);
    const users: User[] = [];
    usersSnap.forEach((user) => {
        users.push(user.data());
    })
    return users;
}

const teamsCol = createCollection<Team>('teams');

async function createTeam(team: Team){
    const teamID = (await addDoc(teamsCol, team)).id;
    const newTeam: Team = JSON.parse(JSON.stringify(team));
    newTeam.teamID = teamID;
    await setDoc(doc(usersCol, team.owner), {teamID: teamID}, {merge: true});
    return newTeam;
}

function saveTeam(team: Team){
    if(!team.teamID){return;}
    
    const teamRef = doc(teamsCol, team.teamID);
    setDoc(teamRef, team, {merge: true});
}

async function getTeam(id: string){
    const team = (await getDoc(doc(db, "teams", id))).data();
    return team as Team;
}

//public
async function getPublicData(){
    const publicDataSnap = getDoc(doc(db, "public", "data"));
    const publicData = (await publicDataSnap).data() as PublicData;
    return publicData;
}

//contentions
async function getContentions(teamID: string, topic: string, side: string){
    if(!teamID || !topic || !side){return []}
    const docRef = doc(db, "teams", teamID, "contentions", topic);
    const contentionsSnap = await getDoc(docRef);
    const contentionsData = contentionsSnap.data() as Contentions;
    if(!contentionsData){return [];}
    const contentions = contentionsData[side as "AFF" | "NEG"];
    return contentions as Contention[];
}

function saveContentions(teamID: string, topic: string, side: string, contentions: Contention[]){
    if(!topic || !teamID){return}
    setDoc(doc(db, "teams", teamID, "contentions", topic), {[side] : contentions? contentions : []}, {merge: true});
}

//Evidence Cards
async function getEvidenceCards(topic: string, side: string){
    if(!topic || !side){return [];}
    const colSnap = await getDocs(collection(db, "evidences", topic, side));
    const evidenceCards: Evidence[] = [];
    colSnap.forEach((e) => {
        evidenceCards.push(e.data() as Evidence)
    })

    return evidenceCards;
}

function addEvidenceCard(topic: string, side: string, card: Evidence){
    addDoc(collection(db, "evidences", topic, side), card).then((newCard) => {
        const cardWithId: Evidence = {
            ...card,
            cardID: newCard.id,
        }
        console.log(cardWithId);
        setDoc(doc(db, "evidences", topic, side, newCard.id), cardWithId, {merge: true})
    })
}

function deleteEvidenceCard(topic: string, side: string, cardID: string){
    deleteDoc(doc(db, "evidences", topic, side, cardID));
}

async function getRebuttalCards(topic: string, side: string){
    if(!topic || !side){return [];}
    const colSnap = await getDocs(collection(db, "rebuttals", topic, side));
    const evidenceCards: Rebuttal[] = [];
    colSnap.forEach((e) => {
        evidenceCards.push(e.data() as Rebuttal)
    })

    return evidenceCards;
}

function addRebuttalCard(topic: string, side: string, card: Rebuttal){
    addDoc(collection(db, "rebuttals", topic, side), card).then((newCard) => {
        const cardWithId: Rebuttal = {
            ...card,
            cardID: newCard.id,
        }
        console.log(cardWithId);
        setDoc(doc(db, "rebuttals", topic, side, newCard.id), cardWithId, {merge: true})
    })
}

function deleteRebuttalCard(topic: string, side: string, cardID: string){
    deleteDoc(doc(db, "rebuttals", topic, side, cardID));
}

export default db;

export {
    saveUser,
    createTeam,
    getUser,
    getUsers,
    usersCol,
    teamsCol,
    getPublicData,
    getTeam,
    saveTeam,
    getContentions,
    saveContentions,
    getEvidenceCards,
    addEvidenceCard,
    deleteEvidenceCard,
    getRebuttalCards,
    addRebuttalCard,
    deleteRebuttalCard,
}
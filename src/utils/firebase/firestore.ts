import { CollectionReference, DocumentData, addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import app from "./config";
import { Contention, Contentions, Evidence, PublicData, Quote, Rebuttal, Team, User } from "../types"

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

async function addEvidenceCard(topic: string, side: string, card: Evidence){
    const newCard = await addDoc(collection(db, "evidences", topic, side), card);

    const cardWithId: Evidence = {
        ...card,
        cardID: newCard.id,
    }

    setDoc(doc(db, "evidences", topic, side, newCard.id), cardWithId, {merge: true});
    return cardWithId;
}

async function deleteEvidenceCard(topic: string, side: string, cardID: string){
    deleteDoc(doc(db, "evidences", topic, side, cardID)).then(() => {return;})
}

async function saveEvidenceCard(topic: string, side: string, card: Evidence){
    setDoc(doc(db, "evidences", topic, side, card.cardID), card, {merge: true});
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

async function addRebuttalCard(topic: string, side: string, card: Rebuttal){
    const newCard = await addDoc(collection(db, "rebuttals", topic, side), card);

    const cardWithId: Rebuttal = {
        ...card,
        cardID: newCard.id,
    }

    setDoc(doc(db, "rebuttals", topic, side, newCard.id), cardWithId, {merge: true});
    return cardWithId;
}


async function deleteRebuttalCard(topic: string, side: string, cardID: string){
    deleteDoc(doc(db, "rebuttals", topic, side, cardID)).then(() => {return;});
}

async function saveRebuttalCard(topic: string, side: string, card: Rebuttal){
    setDoc(doc(db, "rebuttals", topic, side, card.cardID), card, {merge: true});
}

async function getQuoteCards(topic: string, side: string){
    if(!topic || !side){return [];}
    const colSnap = await getDocs(collection(db, "quotes", topic, side));
    const quoteCards: Quote[] = [];
    colSnap.forEach((e) => {
        quoteCards.push(e.data() as Quote)
    })

    return quoteCards;
}

async function addQuoteCard(topic: string, side: string, card: Quote){
    const newCard = await addDoc(collection(db, "quotes", topic, side), card);

    const cardWithId: Quote = {
        ...card,
        cardID: newCard.id,
    }

    setDoc(doc(db, "quotes", topic, side, newCard.id), cardWithId, {merge: true});
    return cardWithId;
}

async function deleteQuoteCard(topic: string, side: string, cardID: string){
    deleteDoc(doc(db, "quotes", topic, side, cardID)).then(() => {return;})
}

async function saveQuoteCard(topic: string, side: string, card: Quote){
    setDoc(doc(db, "quotes", topic, side, card.cardID), card, {merge: true});
}

async function handleInviteAccept(user: User, teamID: string){
    const userRef = doc(usersCol, user.uid);
    await setDoc(userRef, {teamID: teamID}, {merge: true});
    const newInvites = [...user.teamInvites];
    newInvites.splice(0, 1);
    console.log(newInvites);
    await setDoc(userRef, {teamInvites: newInvites}, {merge: true});
}

async function sendInvite(invitee: string, teamID: string){
    const user = await getUser(invitee);
    if(!user){return}
    const userRef = doc(usersCol, user.uid);
    if(user.teamInvites){
        const newInvites = [...user.teamInvites];
        newInvites.push(teamID);
        await setDoc(userRef, {teamInvites: newInvites}, {merge: true});
    }else{
        await setDoc(userRef, {teamInvites: [teamID]}, {merge: true});
    }
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
    saveEvidenceCard,

    getRebuttalCards,
    addRebuttalCard,
    deleteRebuttalCard,
    saveRebuttalCard,

    getQuoteCards,
    addQuoteCard,
    deleteQuoteCard,
    saveQuoteCard,

    handleInviteAccept,
    sendInvite,
}
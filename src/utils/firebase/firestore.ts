import { CollectionReference, DocumentData, addDoc, collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import app from "./config";
import { PublicData, Team, User } from "../types";

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
}
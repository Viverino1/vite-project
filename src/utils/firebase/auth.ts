import app from "./config";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getUser, saveUser } from "./firestore";
import { User } from "../types";

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

async function handleAuthClick(){
    const fbu = (await signInWithPopup(auth, provider)).user;
    if(!fbu || !fbu.displayName || !fbu.email || !fbu.photoURL){
        return;
    }
    const user = await getUser(fbu.uid);
    if(!user){
        const u: User = {
            displayName: fbu.displayName,
            email: fbu.email,
            photoURL: fbu.photoURL,
            uid: fbu.uid,
            userName: fbu.displayName,
            teamID: "",
            speaker: 1,
        }
        saveUser(u);
        return u;
    }else{return user;}
}

function handleSignOutClick(){
    auth.signOut().catch((err) => {
        console.log(err);
    })
}

export { handleAuthClick, handleSignOutClick, auth }
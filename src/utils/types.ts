type User = {
    displayName: string,
    email: string,
    photoURL: string,
    uid: string,
    userName: string,
    teamID: string,
    speaker: number,
}

type Contention = {
    name: string,
    subpoints: string[],
}

type Subpoint = {
    contention: number,
    subpoint: number,
}

type Card = {
    title: string,
    owner: string,
    contention: number,
    subpoint: number,
    evidence: string,
    sourceName: string,
    sourceLink: string,
    starred: boolean,
}

type Team = {
   teamName: string,
   owner: string,
   members: string[],
   teamID: string,
   contentions: Contention[]
}

type PublicData = {
    topics: string[],
}

export type {
    User,
    Contention,
    Card,
    Team,
    PublicData,
    Subpoint,
}
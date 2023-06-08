type User = {
    displayName: string,
    email: string,
    photoURL: string,
    uid: string,
    userName: string,
    teamID: string,
    speaker: number,
}

type Contentions = {
    AFF: Contention[],
    NEG: Contention[],
}

type Contention = {
    name: string,
    subpoints: string[],
}

type Subpoint = {
    contention: number,
    subpoint: number,
}

type Evidence = {
    title: string,
    owner: string,
    contention: number,
    subpoint: number,
    text: string,
    sourceName: string,
    sourceLink: string,
    cardID: string,
    reasoning: string,
}

type Team = {
   teamName: string,
   owner: string,
   members: string[],
   teamID: string,
}

type PublicData = {
    topics: string[],
}

export type {
    User,
    Contentions,
    Contention,
    Evidence,
    Team,
    PublicData,
    Subpoint,
}
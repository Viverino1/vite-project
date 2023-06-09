import { PlusLg } from "react-bootstrap-icons";
import EvidenceCard from "../../components/EvidenceCard";
import { Evidence, Quote, Rebuttal } from "../../utils/types";
import { Outlet, useNavigate } from "react-router-dom";
import RebuttalCard from "../../components/RebuttalCard";
import QuoteCard from "../../components/QuoteCard";

const evidenceData: Evidence = {
    title: "Free Riding",
    owner: "",
    contention: 0,
    subpoint: 2,
    text: "In states with RTW laws, however, unions are forbidden from requiring workers who have opted out of the union—but still enjoy the union’s benefits—to pay fair share fees. In practice, this results in nonmembers at unionized businesses receiving all the benefits of union representation—higher wages and benefits, legal protection, and representation in the case of a dispute with an employer—without having to contribute anything toward the union’s costs. This “free riding” starves unions of resources, diminishing their ability to negotiate new contracts and organize new groups of workers.",
    sourceName: "Economic Policy Institute",
    sourceLink: "https://www.epi.org/publication/so-called-right-to-work-is-wrong-for-montana/",
    cardID: "",
    reasoning: "Free riding prevents Unions from effectively providing benefits to the workers they represent. This means less job security, lower pay, worse working conditions, and much more.",
}

const rebuttalData: Rebuttal = {
    title: "This is the title.",
    owner: "",
    text: "This is the text from the source.",
    sourceName: "Youtube",
    sourceLink: "https://youtube.com",
    cardID: "",
    reasoning: "This is how your text counters the apponent's argument.",
    rebuttalTo: "This is your opponent's argument.",
}

const quoteData: Quote = {
    title: "Gandhi Quote",
    owner: "",
    text: "Be the change that you wish to see in the world.",
    sourceName: "India Times",
    sourceLink: "https://timesofindia.indiatimes.com/blogs/the-photo-blog/remembering-gandhi-top-10-quotes-by-the-mahatma/",
    cardID: "",
    reasoning: "This is a truly inspirational quote.",
    quotee: "Mahatma Gandhi",
    contention: -2,
    subpoint: -3,

}

export default function New(){
    const navigate = useNavigate();
    return(
        <div className="w-full h-screen p-4 flex flex-col items-center space-y-4 overflow-y-auto">
            <div className="flex space-x-4  w-full h-fit">
                <div className="w-1/3">
                    <EvidenceCard data={evidenceData} isPreview={true}/>
                </div>
                <div className=" flex flex-col space-y-4 w-2/3 text-accent">
                    <div className="text-3xl">Evidence</div>
                    <div className="text-xl">This card stores evidence from sources along with reasoning to explain what the text evidence proves, and how it helps your argument.</div>
                    <button className="relative flex justify-center items-center text-background w-40 h-10 bg-primary rounded-lg"
                    onClick={() => {navigate("/new/evidence")}}>
                        <PlusLg size={25} className="absolute left-2 top-2 bottom-2"/>
                        <div>Evidence</div>
                    </button>
                </div>
            </div>
            <div className="flex space-x-4  w-full h-fit">
                <div className="w-1/3">
                    <RebuttalCard data={rebuttalData} isPreview={true}/>
                </div>
                <div className=" flex flex-col space-y-4 w-2/3 text-accent">
                    <div className="text-3xl">Rebuttal</div>
                    <div className="text-xl">This card stores evidence from a source along with reasoning for how it can refute an apponent's argument.</div>
                    <button className="relative flex justify-center items-center text-background w-40 h-10 bg-primary rounded-lg"
                    onClick={() => {navigate("/new/rebuttal")}}>
                        <PlusLg size={25} className="absolute left-2 top-2 bottom-2"/>
                        <div>Rebuttal</div>
                    </button>
                </div>
            </div>

            <div className="flex space-x-4  w-full h-fit">
                <div className="w-1/3">
                    <QuoteCard data={quoteData} isPreview={true}/>
                </div>
                <div className=" flex flex-col space-y-4 w-2/3 text-accent">
                    <div className="text-3xl">Quote</div>
                    <div className="text-xl">This card stores a quote said by someone from a source..</div>
                    <button className="relative flex justify-center items-center text-background w-40 h-10 bg-primary rounded-lg"
                    onClick={() => {navigate("/new/quote")}}>
                    <PlusLg size={25} className="absolute left-2 top-2 bottom-2"/>
                    <div>Quote</div>
                </button>
                </div>
            </div>
            <Outlet/>
        </div>
    )
}
import { PlusLg } from "react-bootstrap-icons";
import EvidenceCard from "../../components/EvidenceCard";
import { Evidence } from "../../utils/types";
import { useNavigate } from "react-router-dom";

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

export default function New(){
    const navigate = useNavigate();
    return(
        <div className="w-full h-screen p-4 flex flex-col items-center space-y-4 overflow-y-scroll">
            <div className="text-6xl text-primary">Create a New Card</div>
            <div className="lg:grid-cols-3 md:grid-cols-2 inline-grid 3 gap-4 w-full h-full">
                <div className="flex flex-col space-y-4 items-center">
                    <EvidenceCard data={evidenceData}></EvidenceCard>
                    <div className="text-xl text-center">This card stores evidence from sources along with reasoning to explain what the text evidence proves, and how it helps your argument.</div>

                    <button className="relative flex justify-center items-center text-background w-40 h-10 bg-primary rounded-lg"
                    onClick={() => {navigate("/new-evidence")}}>
                        <PlusLg size={25} className="absolute left-2 top-2 bottom-2"/>
                        <div>Evidence</div>
                    </button>
                </div>

                <div className="flex flex-col space-y-4 items-center">
                    <EvidenceCard data={evidenceData}></EvidenceCard>
                    <div className="text-xl text-center">This card stores evidence from sources along with reasoning to explain what the text evidence proves, and how it helps your argument.</div>

                    <button className="relative flex justify-center items-center text-background w-40 h-10 bg-primary rounded-lg"
                    onClick={() => {navigate("/new-evidence")}}>
                        <PlusLg size={25} className="absolute left-2 top-2 bottom-2"/>
                        <div>Evidence</div>
                    </button>
                </div>
            </div>
        </div>
    )
}
import { useLottie } from "lottie-react";
import groovyWalkAnimation from "./98288-loading.json";

export default function Loading(){
    const options = {
        animationData: groovyWalkAnimation,
        loop: true
    }

    const { View } = useLottie(options);

    return(
        <div className="w-full h-full flex flex-col justify-center items-center text-3xl bg-background text-primary">{View} DebateTool</div>
    )
}
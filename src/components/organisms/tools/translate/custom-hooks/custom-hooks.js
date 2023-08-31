import { useEffect, useState } from "react";
import { hitTranslationAPI } from "../utils/utils";

export function useTranslation({ inputText, from, to }) {

    const [translationOutput, setTranslationOutput] = useState("");

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        const wrapped = hitTranslationAPI.bind(this, { inputText, from, to, signal });

        wrapped()
            .then(response => response.json())
            .then(({ translatedText }) => setTranslationOutput(translatedText))
            .catch((e) => { });

        return (() => {
            controller.abort();
            setTranslationOutput("")
        })


    }, [inputText, from, to])

    return translationOutput;
}
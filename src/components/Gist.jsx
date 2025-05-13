import React, { useEffect, useState } from "react";
import { pickColor } from "../functions/FetchFromGist";

export default function Gist() {

    const [pickedColor, updatePickedColor] = useState();

    useEffect(() => {
        async function fetchData(){
            const response = await pickColor();
            const rgb = response;
            updatePickedColor(rgb);
        }
        fetchData();
    }, [])

    return (
        <p>{pickedColor}</p>
    );
}
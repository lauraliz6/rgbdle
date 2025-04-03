import React, { useEffect, useState } from "react";
import { Octokit } from "octokit";

const formatDate = (date) => {
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: '2-digit'
      }).replace(/ /g, '-');
    return formattedDate;
}

export default function Gist() {

    const [colorsList, updateColorsList] = useState([]);
    const [pickedColor, updatePickedColor] = useState();

    useEffect(() => {
        const getGist = async () => {
            const octokit = new Octokit({});
    
            const colorsGist = await octokit.request('GET /gists/0039ef0a74940e0f9341319383906cd4', {
                gist_id: '0039ef0a74940e0f9341319383906cd4',
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
    
            const colorsText = colorsGist.data.files["colors.json"].content;
            const colorsJSON = JSON.parse(colorsText);
            updateColorsList(colorsJSON);
        }
        
        getGist().catch(console.error);

    }, [])

    useEffect(()=> {
        const pickColor = () => {
            if (colorsList.length < 1){
                return;
            }
            const todaysDate = new Date();
            const todaysDateFormatted = formatDate(todaysDate);
            const todaysColorObj = colorsList.find(color => color.date == todaysDateFormatted);
            const todaysColor = todaysColorObj.rgb;
            updatePickedColor(todaysColor);
        }
        pickColor();
    }, [colorsList]);

    return (
        <div>{pickedColor}</div>
    );
}
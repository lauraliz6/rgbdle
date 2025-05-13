import { Octokit } from "octokit";

const formatDate = (date) => {
    if (!date){
        return;
    }
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: '2-digit'
      }).replace(/ /g, '-');
    return formattedDate;
}

const getGist = async() => {
    const octokit = new Octokit({});
    const colorsGist = await octokit.request('GET /gists/0039ef0a74940e0f9341319383906cd4', {
        gist_id: '0039ef0a74940e0f9341319383906cd4',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    const colorsText = colorsGist.data.files["colors.json"].content;
    const colorsJSON = JSON.parse(colorsText);
    
    return colorsJSON;
}

export async function pickColor(date){
    if (!date){
        return;
    }
    const colorsList = await getGist();
    const todaysDateFormatted = formatDate(date);
    const todaysColorObj = colorsList.find(color => color.date == todaysDateFormatted);
    const todaysColor = todaysColorObj.rgb;
    return todaysColor;
}
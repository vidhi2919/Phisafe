import { NextResponse } from "next/server";

async function checkUrlWithGoogleSafeBrowsing(url) {
    const apiKey = 'Your API Key';
    const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;
  
    const requestBody = {
      client: {
        clientId: "adityabagrii",
        clientVersion: "1.5.2"
      },
      threatInfo: {
        threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
        platformTypes: ["WINDOWS"],
        threatEntryTypes: ["URL"],
        threatEntries: [
          {url: url} // Use the URL passed as a parameter
        ]
      }
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      // Assuming you want to parse the JSON response and return it
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking URL with Google Safe Browsing:', error);
      throw error; // Rethrow the error to handle it in the calling context
    }
}

export const POST = async (request) => {
    const req = await request.text();
    let data;
    try {
        data = JSON.parse(req);
        const result = await checkUrlWithGoogleSafeBrowsing(data.url);
        return NextResponse.json(result);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return new Response(JSON.stringify({ error: "Invalid JSON" }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

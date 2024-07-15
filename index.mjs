import axios from 'axios';

const handler = async (event, context) => {
    const searchQuery = event.queryStringParameters.q || '';
    const baseUrl = `https://lpulive.lpu.in/fugu-api/api/chat/groupChatSearch`;

    const params = new URLSearchParams();
    params.append('en_user_id', 'cf22e0c5be0372a5775404647c88ffdf');
    params.append('search_text', `${searchQuery}`);
    params.append('user_role', 'USER');

    const url = `${baseUrl}?${params.toString()}`;

    const headers = {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "app_secret_key": "4fd25f3522016f68001c2f00996bbbd1",
        "app_version": "1.0.0",
        "cache-control": "no-cache",
        "device_type": "WEB",
        "domain": "lpu.in",
        "pragma": "no-cache",
        "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "credentials": "include",
        "referrer": "https://lpulive.lpu.in/lpu-demo1/messages/4890252",
        "referrerPolicy": "strict-origin-when-cross-origin"
    };

    try {
        const response = await axios.get(url, {
            headers: headers
        });

        const data = response.data;
        const userData = data.data.users || [];
        const fuguUserIds = userData.map(user => user.fugu_user_id);

        const secondApiResponses = await Promise.all(
            fuguUserIds.map(async fuguUserId => {
                const secondApiUrl = `https://lpulive.lpu.in/fugu-api/api/user/getUserInfo?fugu_user_id=${fuguUserId}&workspace_id=6354`;

                const secondApiResponse = await axios.get(secondApiUrl, {
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0",
                        "Accept": "application/json, text/plain, */*",
                        "Accept-Language": "en-US,en;q=0.5",
                        "app_version": "1.0.0",
                        "device_type": "WEB",
                        "app_secret_key": "4fd25f3522016f68001c2f00996bbbd1",
                        "access_token": "$2a$10$Cf9bdPgB5uWuZMTbz3B5GuumC9EH/MZtbINjhZ2fqolPmpiOQEkZe",
                        "domain": "lpu.in",
                        "Sec-Fetch-Dest": "empty",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Site": "same-origin"
                    },
                    withCredentials: true,
                    referrer: "https://lpulive.lpu.in/lpu-demo1/messages/4890254",
                    referrerPolicy: "strict-origin-when-cross-origin",
                });

                return secondApiResponse.data;
            })
        );

        const processedData = {
            users: userData, 
            userDetails: secondApiResponses 
        };

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(processedData)
        };
    } catch (error) {
        console.error('Error:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" })
        };
    }
};

export { handler };

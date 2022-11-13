export const obtainAuthorizationUrl = async (): Promise<string | null> => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/public/login_link`,
            {
                // credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );
        const json = await response.json();
        return json.login_url;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const exchangeAuthorizationCode = async (sessionState: string, code: string): Promise<boolean> => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/public/callback?session_state=${sessionState}&code=${code}`,
            {
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "http://locahost:3000",

                },
            }
        );
        return await response.json();
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const currentUser = async (): Promise<any> => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}`,
            {
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "http://locahost:3000",

                },
            }
        );
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const insertUser  = async (): Promise<void> => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/private/manage/users`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify({
                }),
            }
        );
        const json = await response.json();
    } catch (error) {
        console.error(error);
    }
}

export const obtainLogoutUrl = async (): Promise<string | null> => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/public/log_out`,
            {
                // credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );
        const json = await response.json();
        return json.log_out_url;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const terminateSession = async (logOutUrl: string): Promise<void> => {
    const encodedLogoutUrl = Buffer.from('your string here').toString('base64');
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/public/delete_cookie`,
            {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'keycloak_log_out_encoded_uri': encodedLogoutUrl
                },
            }
        );
        const json = await response.json();
        console.log(json);

    } catch (error) {
        console.error(error);
    }
}



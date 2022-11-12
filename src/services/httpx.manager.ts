export const obtainAuthorizationUrl = async (): Promise<string | null> => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/public/login-link`,
            {
                credentials: 'include',
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

                },
            }
        );
        return await response.json();
    } catch (error) {
        console.error(error);
        return false;
    }
}

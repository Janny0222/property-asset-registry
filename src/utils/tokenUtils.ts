export const decodeToken = (token: string) => {
    try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        return decodedToken;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

export const isTokenExpired = (token: string | undefined): boolean => {
    
    try {
        const decodedToken = JSON.parse(atob(token?.split('.')[1]!));
        return decodedToken.exp * 1000 < Date.now()
    } catch (error) {
        console.error('Error decoding token:', error);
        return true
    }
}
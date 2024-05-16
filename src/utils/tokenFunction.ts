export function tokenPayloadRead(token: string) {
    try {
      const arrayToken = token.split('.');
      const tokenPayload = JSON.parse(atob(arrayToken[1]));
      return tokenPayload;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }
  
//return Math.floor(new Date().getTime() / 1000) >= tokenPayload?.sub;


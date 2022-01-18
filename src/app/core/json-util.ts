import {JwtTokenModel} from "../service/users/jwt-token.model";

export class JsonUtil {
    public static parseJwtToken(token: string): JwtTokenModel {
        let base64Url = token.split('.')[1]
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))

        const jsonObj = JSON.parse(jsonPayload)
        console.log(jsonObj)
        const jwtModel: JwtTokenModel = {
            userName: jsonObj.UserName,
            userId: jsonObj.UserId
        }
        return jwtModel;
    }
}

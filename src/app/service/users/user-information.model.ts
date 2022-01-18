export interface UserInformationModel {
    userId: number;
    userName: string;
    fullName: string;
    phone: string;
    roleId: number;
    status: string;
    isLogin: boolean;
    email: string;
    token: string;
    address: string;
    loginFailedCount: number;
}

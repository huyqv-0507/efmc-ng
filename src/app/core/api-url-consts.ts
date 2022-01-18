export class ApiUrlConsts {
    public static USER = {
        REGISTER: '/users/register',
        LOGIN: '/users/login',
        GET_BY_ID: '/users/{0}'
    }

    public static PHARMACY = {
        GET_ALL: '/pharmacies?ownerId={0}',
        GET_ALL_BY_STATUS: '/pharmacies?ownerId={0}&status={1}'
    }
}

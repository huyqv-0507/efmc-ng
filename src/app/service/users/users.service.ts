import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable, Subject} from "rxjs";

import {BaseResponse} from "../base-response";
import {ApiUrlConsts} from "../../core/api-url-consts";
import {StringUtil} from "../../core/string-util";
import {LocalStorageUtil} from "../../core/local-storage-util";
import {JsonUtil} from "../../core/json-util";
import {UserInformationModel} from "./user-information.model";
import {LoginResultModel} from "./login-result.model";
import {UserRegistrationModel} from "./user-registration.model";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    constructor(
        private httpClient: HttpClient
    ) {
    }

    register(userRegistration: UserRegistrationModel) {
        this.httpClient.post<BaseResponse>(
            `${ApiUrlConsts.USER.REGISTER}`,
            userRegistration).subscribe((data: BaseResponse) => {
            console.log(data);
        })
    }

    login(userName: string, password: string): Observable<LoginResultModel> {
        let subject = new Subject<LoginResultModel>();
        this.httpClient.post<BaseResponse>(
            `${ApiUrlConsts.USER.LOGIN}`,
            {
                userName: userName,
                password: password
            }).subscribe({
                next: value => {
                    const jwtObj = JsonUtil.parseJwtToken(value.data.token);
                    LocalStorageUtil.setItem(LocalStorageUtil.JWT_KEY, JSON.stringify(jwtObj));
                    const resultModel: LoginResultModel = {
                        success: true,
                        message: 'Đăng nhập thành công.'
                    }
                    subject.next(resultModel);
                },
                error: err => {
                    const resultModel: LoginResultModel = {
                        success: false,
                        message: ''
                    }
                    switch (err.status) {
                        case 400:
                            resultModel.message = 'Tài khoản không hợp lệ.'
                            break;
                        case 500:
                            resultModel.message = 'Hệ thống đã xảy ra lỗi.'
                            break;
                        default:
                            resultModel.message = 'Lỗi chưa xác định.'
                            break;
                    }
                    subject.error(resultModel)
                }
            }
        )
        return subject.asObservable();
    }

    getUserById(userId: number): Observable<UserInformationModel> {
        let userInformation = new Subject<UserInformationModel>()
        this.httpClient.get<BaseResponse>(
            StringUtil.format(ApiUrlConsts.USER.GET_BY_ID, userId.toString())).subscribe(
            {
                next: value => {
                    const user: UserInformationModel = {
                        userId: value.data.userId,
                        userName: value.data.userName,
                        roleId: value.data.roleId,
                        phone: value.data.phone,
                        token: value.data.token,
                        address: value.data.address,
                        email: value.data.email,
                        fullName: value.data.fullName,
                        isLogin: value.data.isLogin,
                        loginFailedCount: value.data.loginFailedCount,
                        status: value.data.status,
                    }


                    userInformation.next(user);
                },
                error: err => console.log(err)
            }
        )
        return userInformation;
    }
}

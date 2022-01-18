import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {PharmacyModel} from "./pharmacy.model";
import {BaseResponse} from "../base-response";
import {ApiUrlConsts} from "../../core/api-url-consts";
import {StringUtil} from "../../core/string-util";
import {LocalStorageUtil} from "../../core/local-storage-util";
import {JsonUtil} from "../../core/json-util";
import {JwtTokenModel} from "../users/jwt-token.model";

@Injectable({
    providedIn: 'root'
})
export class PharmaciesService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    getPharmacies(status?: string): Observable<PharmacyModel[]> {
        let subject = new Subject<PharmacyModel[]>();
        let owner = JSON.parse(LocalStorageUtil.getItem(LocalStorageUtil.JWT_KEY));
        if (status == null) {
            this.httpClient.get<BaseResponse>(
                StringUtil.format(ApiUrlConsts.PHARMACY.GET_ALL, owner.userId)
            ).subscribe(
                {
                    next: (response) => {
                        const pharmacies: PharmacyModel[] = response.data.map(pharmacy => {
                            return {
                                pharmacyId: pharmacy.pharmacyId,
                                name: pharmacy.name,
                                address: pharmacy.address,
                                dateCreated: new Date(pharmacy.dateCreated),
                                status: pharmacy.status,
                                userPharmacies: pharmacy.userPharmacies.map(userPharmacy => {
                                    return {
                                        userPharmacyId: userPharmacy.userPharmacyId,
                                        ownerId: userPharmacy.ownerId,
                                        ownerName: userPharmacy.ownerId,
                                        pharmacistId: userPharmacy.pharmacistId,
                                        pharmacistName: userPharmacy.pharmacistName,
                                        pharmacyId: userPharmacy.pharmacyId,
                                        status: userPharmacy.status,
                                    }
                                })
                            }
                        })
                        subject.next(pharmacies)
                    }
                }
            )
        } else {
            this.httpClient.get<BaseResponse>(
                StringUtil.format(ApiUrlConsts.PHARMACY.GET_ALL_BY_STATUS, owner.userId, status)
            )
        }
        return subject.asObservable();
    }
}

export interface PharmacyModel {
    pharmacyId: number;
    name: string;
    address: string;
    dateCreated: Date;
    status: string;
    userPharmacies: UserPharmacy[];

}

interface UserPharmacy {
    userPharmacyId: number
    ownerId: number
    ownerName: string
    pharmacistId: number
    pharmacistName: string
    pharmacyId: number
    status: string
}


import {Component, OnInit} from '@angular/core';
import {Product} from "../../api/product";
import {ProductService} from "../../service/productservice";
import {ConfirmationService, MessageService} from "primeng/api";
import {PharmaciesService} from "../../service/pharmacies/pharmacies.service";
import {PharmacyModel} from "../../service/pharmacies/pharmacy.model";

@Component({
    selector: 'app-pharmacy-store',
    templateUrl: './pharmacy-store.component.html',
    styleUrls: ['./pharmacy-store.component.scss']
})
export class PharmacyStoreComponent implements OnInit {

    pharmacyDialog: boolean;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[];

    pharmacy: PharmacyModel;

    selectedProducts: Product[];

    submitted: boolean;

    cols: any[];

    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];

    public pharmacies: PharmacyModel[] = []

    selected: boolean;

    constructor(private pharmacyService: PharmaciesService, private messageService: MessageService,
                private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        this.pharmacyService.getPharmacies().subscribe({
            next: pharmacies => this.pharmacies = pharmacies,
            error: err => console.log(err)
        })
    }

    openNew() {
        this.pharmacy = null;
        this.submitted = false;
        this.pharmacyDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(pharmacy: PharmacyModel) {
        this.pharmacy = {...pharmacy};
        this.pharmacyDialog = true;
    }

    deleteProduct(pharmacy: PharmacyModel) {
        this.deleteProductDialog = true;
        this.pharmacy = {...pharmacy};
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this.selectedProducts = null;
    }

    // confirmDelete(){
    //     this.deleteProductDialog = false;
    //     this.products = this.products.filter(val => val.id !== this.product.id);
    //     this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
    //     this.pharmacy = {};
    // }

    hideDialog() {
        this.pharmacyDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;
        //
        // if (this.product.name.trim()) {
        //     if (this.product.id) {
        //         // @ts-ignore
        //         this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value: this.product.inventoryStatus;
        //         this.products[this.findIndexById(this.product.id)] = this.product;
        //         this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        //     } else {
        //         this.product.id = this.createId();
        //         this.product.code = this.createId();
        //         this.product.image = 'product-placeholder.svg';
        //         // @ts-ignore
        //         this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
        //         this.products.push(this.product);
        //         this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        //     }
        //
        //     this.products = [...this.products];
        //     this.productDialog = false;
        //     this.product = {};
        // }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

}

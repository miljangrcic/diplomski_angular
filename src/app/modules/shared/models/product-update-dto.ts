export interface ProductUpdateDto {
    name: string,
    eanCode: string,
    description: string,
    price: number,
    imageFile: File,
    categoryID: number,
    manufacturerID: number,
    volumeID: number,
    packagingMaterialID: number,
}

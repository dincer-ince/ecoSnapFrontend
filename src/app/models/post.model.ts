import { UserModel } from "./user.model";
export interface PostModel

{

    id: string;
    userId:string;
    user:UserModel;
    name: string;
    description: string;
    address: AddressModel;
    longitude: string;
    isPrivate:boolean;
    snapshot:SnapshotModel;
    activityDate: string;
    activityType:activityTypeModel;
    photos:photosModel[];

}

export interface AddressModel{
    id:string;
    latitude:number;
    longitude:number;
    road:string;
    suburb:string;
    town:string;
    provience:string;
    region:string;
    country:string;
}

export interface SnapshotModel{
    id:string;
    uri:string;
    contentType:string;
    fileName:string;
    activityId:any;
    commentId:any;
    userId:any;


}

export interface activityTypeModel{
    id:number;
    name:any;
    icon:string;
    family:string;
}

export interface photosModel{
    id:string;
    uri:string;
    contentType:string;
    fileName:string;
    activityId:string;
    commentId:any;
    userId:any;
}
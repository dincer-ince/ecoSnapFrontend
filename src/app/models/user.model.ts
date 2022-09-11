export interface UserModel

{

    id: string;
    name: string;
    surname: string;
    email: string;
    country: idName;
    city: idName;
    role: any;
    photo: photo

}

interface idName{
    id:string;
    name:string;
}
interface photo{
    id: string;
    uri: string;
    contentType: string;
    fileName: string;
    activityId: string;
    commentId: string;
    userId: string
}
export interface LoginModel{
    user: UserModel;
    token: string;
}

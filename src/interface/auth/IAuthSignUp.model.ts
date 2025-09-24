export namespace IAuthSignUpModel {
    export interface User {
        id?: number;
        first_name: string;
        last_name: string;
        email: string;
        phone_no?: string;
        password_hash: string;
        headline?: string;
        profile_picture?: string;
        about?: string;
        created_at?: Date;
        updated_at?: Date;
    }
}

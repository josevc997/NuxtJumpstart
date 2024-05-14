export interface User {
    id: number;
    username: string;
    email: string;
    name: string;
    _id: number;
    isAdmin: true;
    is_active: true;
    date_joined: string;
    last_login: string;
    image?: string;
}

export interface UserWithNames extends User {
    first_name: string;
    last_name: string;
}

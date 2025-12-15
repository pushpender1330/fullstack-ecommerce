export interface UserType {
    name: string;
    address: string;
    email: string;
    phoneNumber: string;
    password: string;
}

export interface UserType2 {
    users: {
        id: string;
        name: string;
        address: string;
        email: string;
        phoneNumber: string;
        role: 'ADMIN' | 'USER';
        createdAt ?: Date;
        updatedAt ?: Date;
    }[]
}
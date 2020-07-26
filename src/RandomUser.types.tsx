export interface User {
    name: {
        title: string
        first: string
        last: string
    }
    picture: {
        large: string
        medium: string
        thumbnail: string
    }
    cell: string
}

export interface UserResponse {
    info: {
        page: string
        results: string
        seed: string
        version: string
    }
    results: User[]
}

export interface RequestConfig {
    fields: string[],
    results: number
}

export interface UserState extends User {
    label: string
    value: string
}


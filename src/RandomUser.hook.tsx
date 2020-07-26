import * as React from 'react'
import { RequestConfig, User, UserState, UserResponse } from './RandomUser.types';

function uuidv4(): string {
    return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: number): string =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

type RandomUser =  (requestConfig: RequestConfig) => { users: UserState[] | undefined, error: string | undefined } 

export const useRandomUser: RandomUser = (requestConfig) => {
    const [users, setUsers] = React.useState<UserState[] | undefined>(undefined)
    const [error, setError] = React.useState<string | undefined>(undefined)

    React.useEffect(() => {
        if (users === undefined) {
            try {
                fetch(`https://randomuser.me/api/?results=${requestConfig.results}&inc=${requestConfig.fields}`, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      'Access-Control-Allow-Origin': 'http://localhost:3000',
                      "Access-Control-Allow-Credentials": 'true'
                    },
                    credentials: "same-origin"
                  })
                    .then((response: Response) => {
                        if (response.status === 200) {
                            return response.json().then((data: UserResponse): void => {
                                const decoratedUserData: UserState[] = data.results.map((user: User): UserState => ({
                                    ...user,
                                    value: uuidv4(),
                                    label: user.name.first + " " + user.name.last
                                }))
                                return setUsers(decoratedUserData)
                            })
                        } else {
                            setError('Request Error')
                            return setUsers([])
                        }
                })
            } catch (error) {
                // push error to sentry or app monitoring service 
                console.error(error)
                setError('Unable to make request')
                return setUsers([])
            }
        }
    })

    return {
        users,
        error
    }
}
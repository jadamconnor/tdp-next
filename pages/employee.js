
import { useContext } from 'react'
import { AuthContext } from '../contexts/auth-context'

export default function Employee({  }) {
    const { user, login, logout } = useContext(AuthContext)
    console.log(user)


    return (
        <>
            {!user?.app_metadata?.roles?.length &&
            <div>
                You do not have permission to view this page.
            </div>
            }
            {user?.app_metadata?.roles.includes('Level 1') &&
            <div>
                Here is the stuff
            </div>
            }
        </>
    )
}
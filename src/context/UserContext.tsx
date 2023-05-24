import { createContext, useState, useContext, useEffect } from "react"
import { useMagicContext } from "./MagicContext"

// export interface UserBase {
//   issuer?: string | null
//   publicAddress?: string | null
//   email?: string | null
//   isMfaEnabled?: boolean
//   phoneNumber?: string | null
//   walletType?: string | null
//   balance?: number
//   chainId?: number
// }

// export type User = UserBase & { [key: string]: any }

export type User = any

export type UserContextType = {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  fetchUserInfo: () => void
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  fetchUserInfo: () => {},
})

export const useUserContext = () => useContext(UserContext)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { magic } = useMagicContext()
  const [user, setUser] = useState<User | null>(null)

  const fetchUserInfo = async () => {
    try {
      if (magic) {
        const userInfo = await magic.user.getInfo()
        console.log("UserInfo:", JSON.stringify(userInfo, null, 2))
        setUser(userInfo)
      }
    } catch (error) {
      console.log("fetchuserInfo", error)
    }
  }
  useEffect(() => {
    if (!magic) return
    const checkLoggedInStatus = async () => {
      const loggedIn = await magic.user.isLoggedIn()
      console.log("LOGGED IN: ", loggedIn)
      if (loggedIn) {
        await fetchUserInfo()
      }
    }

    checkLoggedInStatus()
  }, [magic])

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserInfo }}>
      {children}
    </UserContext.Provider>
  )
}

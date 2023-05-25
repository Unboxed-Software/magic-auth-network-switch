import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react"
import { useNetworkContext } from "./NetworkContext"

// interface UserBase {
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
  const { network } = useNetworkContext()
  const [user, setUser] = useState<User | null>(null)

  const fetchUserInfo = useCallback(async () => {
    try {
      if (network) {
        const userInfo = await network?.magic?.user.getInfo()
        console.log("UserInfo:", JSON.stringify(userInfo, null, 2))
        setUser(userInfo)
      }
    } catch (error) {
      console.log("fetchuserInfo", error)
    }
  }, [setUser, network])

  useEffect(() => {
    if (!network) return
    const checkLoggedInStatus = async () => {
      const loggedIn = await network?.magic?.user.isLoggedIn()
      console.log("LOGGED IN: ", loggedIn)
      if (loggedIn) {
        await fetchUserInfo()
      }
    }

    checkLoggedInStatus()
  }, [network, fetchUserInfo])

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserInfo }}>
      {children}
    </UserContext.Provider>
  )
}

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/login"
import Dashboard from "./pages/dashboard"
import Callback from "./pages/callback"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </Router>
  )
}

export default App

// // App.tsx
// import { VStack } from "@chakra-ui/react"
// import NetworkSelect from "./components/NetworkSelect"
// import UserDetails from "./components/UserDetail"
// import { useUserContext } from "./context/UserContext"
// import Login from "./pages/Login"
// import Logout from "./components/Logout"
// import { useMagicContext } from "./context/MagicContext"
// import { useEffect } from "react"

// function App() {
//   const { user, setUser, fetchUserAndBalance } = useUserContext()
//   const { magic } = useMagicContext()

//   const finishSocialLogin = async () => {
//     try {
//       const result = await magic?.oauth.getRedirectResult()
//       console.log(result)
//       const userMetaData = await magic?.user.getMetadata()
//       console.log(userMetaData)
//       //   await fetchUserAndBalance()
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   useEffect(() => {
//     finishSocialLogin()
//   }, [magic])

//   return (
//     <VStack>
//       {!user ? (
//         <Login />
//       ) : (
//         <>
//           <Logout />
//           <NetworkSelect />
//           <UserDetails />
//         </>
//       )}
//     </VStack>
//   )
// }

// export default App

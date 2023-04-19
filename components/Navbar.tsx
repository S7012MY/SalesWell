import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Link from 'next/link'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { signIn, signOut, useSession } from "next-auth/react"

function NavBar() {
  const { data: session } = useSession()

  return <AppBar position="static">
    <Toolbar>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <Link href="/" passHref>
          <a style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>SalesWell</a>
        </Link>
      </Typography>
      { session ? 
        <>
          <Link href="/booking/list">
            <Button color="inherit">
              Bookings
            </Button>
          </Link>
          <Link href="/prospects/list">
            <Button color="inherit">
              Prospects
            </Button>
          </Link>
          <Button color="inherit" id = "logout-button" onClick={() => signOut()}>
            Logout
          </Button>
        </>
        : <Button color="inherit" id="login-button" onClick={() => signIn()}>
          Login
        </Button> }
    </Toolbar>
  </AppBar>
}

export default NavBar

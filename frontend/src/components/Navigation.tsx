import { AppBar, Button, Toolbar } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Link as RouterLink } from "react-router-dom";
import { Favorite, Lock } from "@mui/icons-material";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export const Navigation = () => {
  const { user, signOut } = useAuth();

  function HomeIcon(props: SvgIconProps) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }
  return (
    <AppBar position="static" color="secondary" sx={{ mb: 3 }}>
      <Toolbar>
        <Button color="inherit" component={RouterLink} to="/">
          <HomeIcon />
        </Button>
        <Button color="inherit" component={RouterLink} to="/countries">
          Countries
        </Button>
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
          }}
        >
          <Button color="inherit" component={RouterLink} to="/test">
            Test
          </Button>

          {user && (
            <Button
              color="inherit"
              component={RouterLink}
              to="/favorites"
              startIcon={<Favorite />}
            >
              Favorites
            </Button>
          )}
          <Button
            color="inherit"
            component={RouterLink}
            to="/protected"
            startIcon={<Lock />}
          >
            Protected Data
          </Button>
          {user ? (
            <Button color="inherit" onClick={signOut}>
              Sign Out ({user.email})
            </Button>
          ) : (
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

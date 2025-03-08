// export default function Footer() {
//   const year = new Date().getFullYear();
//   return (
//     <footer>
//       <ul className="menu">
//         <li>
//           <a href="/">Home</a>
//         </li>
//         <li>
//           <a href="/about">About</a>
//         </li>
//       </ul>
//       <p className="copyright">
//         "Made with ❤️ in BasedWorld" - Alex {year + 1}
//       </p>
//     </footer>
//   );
// }

import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";

export default function FixedBottomNavigation() {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        sx={{
          backgroundColor: "lightblue", // Set the BottomNavigation background to blue
        }}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
      </BottomNavigation>
    </Paper>
  );
}

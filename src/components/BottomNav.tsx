import { BatchPrediction, Lightbulb, Settings } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useRouter } from "next/navigation";

export function BottomNav(o:any) {
  const { push } = useRouter();

  return (
    <Paper className="fixed bottom-0 left-0 w-full lg:hidden">
      <BottomNavigation
        showLabels
        value={o.bottomNavValue}
        onChange={(event, newValue) => {
          o.setBottomNavValue(newValue);
        }}
      >
        <BottomNavigationAction label="Groups" icon={<BatchPrediction />} />
        <BottomNavigationAction label="Lights" icon={<Lightbulb />} />
        <BottomNavigationAction label="Settings" icon={<Settings />} />
      </BottomNavigation>
    </Paper>
  );
}

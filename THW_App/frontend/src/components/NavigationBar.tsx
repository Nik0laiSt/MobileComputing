import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useNavigate } from 'react-router-dom';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');
  const navigate = useNavigate();  // Hook for navigation
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);

    // Navigiere je nach Wert der neuen Seite
    switch (newValue) {
      case 'event':
        navigate('/events');  // Pfad zu Event-Seite
        break;
      case 'calendar':
        navigate('/calendar');  // Pfad zur Kalender-Seite
        break;
      case 'addEvent':
        navigate('/add-event');  // Pfad zur Seite für Event hinzufügen
        break;
      default:
        break;
    }
  };

  return (
    <BottomNavigation sx={{ width: '100%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Event"
        value="event"
        icon={<EmojiEventsIcon />}
      />
      <BottomNavigationAction
        label="Calendar"
        value="calendar"
        icon={<CalendarMonthIcon />}
      />
      <BottomNavigationAction
        label="AddEvent"
        value="addEvent"
        icon={<AddCircleOutlineIcon />}
      />

    </BottomNavigation>
  );
}
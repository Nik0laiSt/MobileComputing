import { getCalResourcesForUser, getCalSessionsForUser, getCalSessionsRegisteredForUser, getCalSessionsUnregisteredForUser } from '../services/calendarService';
import { getUserById } from '../services/userService';

export const getCalendarForUser = async (req, res) => {
    const id = req.user.id;
  
    const resources = await getCalResourcesForUser(id);
    const sessionRegistrations = await getCalSessionsForUser(id);//TODO CalSessionRegistrations

    const calendar = {
        success: true,
        resources: {
            rows: resources
        },
        events: {
            rows: sessionRegistrations
        }
    }
  
    res.json(calendar);
  };
  
  export const getCalendarSessionsForUser = async (req, res) => {
    const id = req.user.id;
    const user = await getUserById(id);

    const resources = await getCalResourcesForUser(id);
    var sessions = [];

    if(user.role === 'admin' || user.role === 'leader'){
        sessions = await getCalSessionsForUser(id);
    } else {
        switch (req.query.sessionState) {
            case 'reg':
                sessions = await getCalSessionsRegisteredForUser(id);
                break;
            case 'unreg':
                sessions = await getCalSessionsUnregisteredForUser(id);
                break;
            default:
                sessions = await getCalSessionsForUser(id);
        }
    }
    
    const calendar = {
        success: true,
        resources: {
            rows: resources
        },
        events: {
            rows: sessions
        }
    }
  
    res.json(calendar);
  };
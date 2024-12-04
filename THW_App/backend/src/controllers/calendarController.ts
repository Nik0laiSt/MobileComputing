import { getCalResourcesForUser, getCalSessionsForUser, getCalSessionsRegisteredForUser, getCalSessionsUnregisteredForUser } from '../services/calendarService';

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
  
    const resources = await getCalResourcesForUser(id);

    switch (req.query.sessionState) {
        case 'reg':
            var sessions = await getCalSessionsRegisteredForUser(id);
            break;
        case 'unreg':
            var sessions = await getCalSessionsUnregisteredForUser(id);
            break;
        default:
            var sessions = await getCalSessionsForUser(id);
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
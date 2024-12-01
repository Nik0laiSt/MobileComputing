import { getCalResourcesForUser, getCalSessionsForUser } from '../services/calendarService';

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
    const sessions = await getCalSessionsForUser(id);
    
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
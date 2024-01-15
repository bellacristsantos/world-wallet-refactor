import { apiKey } from '.././../secret';


async function getEvents() {
  console.log('Inside getEvents function');

  try {
    const response = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&size=3&classificationName=music`
    );

  // console.log('ApiKey:', apiKey);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    const eventsData = responseData._embedded.events.map(event => ({
      image: event.images[0].url,
      day: new Date(event.dates.start.localDate).getDate().toString(),
      month: new Date(event.dates.start.localDate).toLocaleString('default', { month: 'short' }).toUpperCase(),
      eventType: event.classifications[0].segment.name,
      eventName: event.name,
    }));
    console.log('Events Data:', eventsData);
    return eventsData;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

async function getUpcomingEvents() {
  try {
    const response = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&size=3&classificationName=music`
    );


    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    const upcomingEventsData = responseData._embedded.events.map(event => ({
      day: new Date(event.dates.start.localDate).getDate().toString(),
      month: new Date(event.dates.start.localDate).toLocaleString('default', { month: 'short' }).toUpperCase(),
      eventName: event.name,
      venue: event._embedded.venues[0].name,
      city: event._embedded.venues[0].city.name,
      country: event._embedded.venues[0].country.name,
      image: event.images[0].url,
    }));

    return upcomingEventsData;
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    throw error;
  }
}

// async function getFavoritesArtistsEvents(artistNames) {
//   try {


//     const artistNamesString = artistNames.join(',');

//     const response = await fetch(
//       `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&size=3&classificationName=music&keyword=${artistNamesString}`
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }


//     await new Promise(resolve => setTimeout(resolve, 1000));

//     const responseData = await response.json();

//     const artistsEventsData = responseData._embedded?.events?.map((event) => ({
//       day: new Date(event.dates.start.localDate).getDate().toString(),
//       month: new Date(event.dates.start.localDate).toLocaleString('default', { month: 'short' }).toUpperCase(),
//       venue: event._embedded.venues[0].name,
//       city: event._embedded.venues[0].city.name,
//       country: event._embedded.venues[0].country.name,

//     })) || [];

//     return artistsEventsData;
//   } catch (error) {
//     console.error('Error fetching artists events:', error);
//     throw error;
//   }
// }



export { getEvents, getUpcomingEvents };

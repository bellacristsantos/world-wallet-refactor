import { Platform } from 'react-native';
import { useTheme } from 'native-base';

import { createBottomTabNavigator, BottomTabNavigationProp} from '@react-navigation/bottom-tabs';


import { Welcome } from '@screens/Welcome';
import { Region } from '@screens/Region';
import { DateSelection } from '@screens/DateSelection';
import { EventsFeed } from '@screens/EventsFeed';
import { MyEvents } from '@screens/MyEvents';
import { EventsDetails } from '@screens/EventsDetails';
import { ArtistsList } from '@screens/ArtistsList';
import { FavoritesArtistsList } from '@screens/FavoritesArtistsList';


import LocationSvg  from '@assets/location.svg';
import CalendarSvg  from '@assets/calendar.svg';
import HomeSvg  from '@assets/home.svg';
import ListBullets  from '@assets/list.svg';
import ArtistsSvg  from '@assets/artists.svg';
import FavoritesSvg  from '@assets/favorites.svg';



type AppRoutes = {
  welcome: undefined;
  region: undefined;
  date_selection: undefined;
  events_feed: undefined;
  event_details: undefined;
  my_events: undefined;
  artists_list: undefined;
  favorites_artists_list: undefined;

}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();


export function AppRoutes () {

  const { sizes, colors } = useTheme();

  const iconSize = sizes[6];

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.purple[500],
      tabBarInactiveTintColor: colors.gray[300],
      tabBarStyle: {
        backgroundColor: colors.gray[600],
        borderTopWidth: 0,
        height: Platform.OS === "android" ? 'auto' : 96,
        paddingBottom: sizes[10],
        paddingTop: sizes[6]
      }
    }}>

       <Screen
        name='welcome'
        component={Welcome}
        options={{ tabBarButton: () => null }}
      />

      <Screen
        name='region'
        component={Region}
        options={{
          tabBarIcon: ({ color,  }) => (
            <LocationSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen
        name='date_selection'
        component={DateSelection}
        options={{
          tabBarIcon: ({ color,  }) => (
            <CalendarSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen
        name='events_feed'
        component={EventsFeed}
        options={{
          tabBarIcon: ({ color,  }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen
        name='my_events'
        component={MyEvents}
        options={{
          tabBarIcon: ({ color,  }) => (
            <ListBullets fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen
        name='event_details'
        component={EventsDetails}
        options={{ tabBarButton: () => null }}
      />

      <Screen
        name='artists_list'
        component={ArtistsList}
        options={{
          tabBarIcon: ({ color,  }) => (
            <ArtistsSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen
        name='favorites_artists_list'
        component={FavoritesArtistsList}
        options={{
          tabBarIcon: ({ color,  }) => (
            <FavoritesSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

    </Navigator>
  );
}
import React, { useEffect, useState } from 'react';
import api from '../../api';

function Sidebar() {

    const [topStreams, setTopStreams] = useState([]);

    useEffect(() => {
        
        const fetchData = async() => {

            const result = await api.get('https://api.twitch.tv/helix/streams')

            let dataArray = result.data.data;

            let gameIDs = dataArray.map(stream => {
                return stream.game_id
            })

            let userIDs = dataArray.map(stream => {
                return stream.user_id
            })
        
            //Creation des urls personnalisees 

            let baseUrlGames = 'https://api.twitch.tv/helix/games?';
            let baseUrlUsers = 'https://api.twitch.tv/helix/users?';

            let queryParamsGames = '';
            let queryParamsUsers = '';

            gameIDs.map(id => {
                return (queryParamsGames = queryParamsGames + `id=${id}&`)
            })

            userIDs.map(id => {
                return (queryParamsUsers = queryParamsUsers + `id=${id}&`)
            })

            //url finale 

            let urlFinalGames = baseUrlGames + queryParamsGames;
            let urlFinalUsers = baseUrlUsers + queryParamsUsers;

            // appel a l'api

            let getGames = await api.get(urlFinalGames);
            let getUsers = await api.get(urlFinalUsers);

            let gamesNameArray = getGames.data.data;
            let usersNameArray = getUsers.data.data;

            //creation du tableau final
            
            let finalArray = dataArray.map(stream => {

                stream.gameName = '';
                stream.truePic = '';
                stream.login = '';

                gamesNameArray.forEach(name => {
                    usersNameArray.forEach(user => {
                        if(stream.user_id === user.id && stream.game_id === name.id) {
                            
                            stream.truePic = user.profile_image_url;
                            stream.gameName = name.name;
                            stream.login = user.login;

                        }
                    })
                });
                return stream;
            })

            setTopStreams(finalArray.slice(0,6))

        }

        fetchData()

    }, [])

    console.log(topStreams)

    
    return (
        <div className='sidebar'>
            <h2 className='titreSidebar'>Chaînes recommandées</h2>
            <ul className='listeStream'>

            </ul>
        </div>
    )
}

export default Sidebar
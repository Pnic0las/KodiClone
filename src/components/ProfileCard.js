import React from "react"
import "./ProfileCard.css"

function ProfileCard({name, picture}) {
    return (
        <div className="spotifyUser">
            <h1>{name}</h1>
        </div>
    )
}

export default ProfileCard;
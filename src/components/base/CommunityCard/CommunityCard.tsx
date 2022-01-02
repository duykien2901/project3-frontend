import React from "react";
import { CommunityCardWrapper } from './community-card'
interface Props {
  name: string,
  member: string
}


const CommunityCard: React.FC<Props> = ({name, member}: Props) => {
  return (
    <CommunityCardWrapper>
      <div className="close-container fb-flex fb-justify-flex-end w-full">
          <button className="btn btn-close fb-flex fb-justify-center fb-align-center">
            <span className="icon fb-flex fb-justify-center fb-align-center">x</span>
          </button>
        </div>
      <div className="container fb-flex">
        <div className="avatar"></div>
        <div className="content-container">
          <div className="community-name">
            {name}
          </div>
          <div className="community-member">
            {member} members 
          </div>
          <div className="footer fb-flex fb-align-flex-end">
            <button className="btn btn-join fb-flex fb-align-center">
              <span className="text-button fb-flex fb-align-center">Join</span>
            </button>
          </div>
        </div>
      </div>
      <div className="line"></div>
    </CommunityCardWrapper>
  )
}

export default CommunityCard;
import React  from 'react'
import { NavLink } from 'react-router-dom';
import { BaseFeatureWrapper } from './base-feature';
interface Props {
  name: string,
  icon: string,
  url: string
}
const BaseFeature: React.FC<Props> = ({name, icon, url}: Props) => {
  return(
    <BaseFeatureWrapper>
      <NavLink exact className="feature-item fb-flex fb-align-center" to={url} activeClassName='actived'>
        <div className="feature-content fb-flex fb-align-center">
          <div className="feature-icon">{icon}</div>
          <div className="feature-name">{name}</div>
        </div>
      </NavLink>
    </BaseFeatureWrapper>
  )
}

export default BaseFeature;
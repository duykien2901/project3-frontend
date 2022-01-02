import React  from 'react'
import { BaseFeatureWrapper } from './base-feature';
interface Props {
  name: string,
  icon: string
}
const BaseFeature: React.FC<Props> = ({name, icon}: Props) => {
  return(
    <BaseFeatureWrapper>
      <div className="feature-item fb-flex fb-align-center">
        <div className="feature-content fb-flex fb-align-center">
          <div className="feature-icon">{icon}</div>
          <div className="feature-name">{name}</div>
        </div>
      </div>
    </BaseFeatureWrapper>
  )
}

export default BaseFeature;
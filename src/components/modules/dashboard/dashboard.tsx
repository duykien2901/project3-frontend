import React from "react";
import "../dashboard/dashboard.css";

const DashBoard: React.FC = () => {
  return (
    <React.Fragment>
      <div className="banner-left">
        <div className="icon">
          <span>icon facebook</span>
        </div>
      </div>
      <div className="banner">
        <div className="banner-content">
          <ul className="list-feature fb-flex fb-align-center fb-justify-center">
            <li className="feature-item w-full">
              <div className="router-slot w-full h-full">
                <div className="icon w-full h-full fb-flex fb-align-center fb-justify-center">
                  <span className="fb-flex fb-justify-center">icon</span>
                </div>
                <div className="bottom-line"></div>
              </div>
            </li>
            <li className="feature-item w-full">
              <div className="router-slot w-full h-full">
                <div className="icon w-full h-full fb-flex fb-align-center fb-justify-center">
                  <span className="fb-flex fb-justify-center">icon</span>
                </div>
                <div className="bottom-line"></div>
              </div>
            </li>
            <li className="feature-item w-full">
              <div className="router-slot w-full h-full">
                <div className="icon w-full h-full fb-flex fb-align-center fb-justify-center">
                  <span className="fb-flex fb-justify-center">icon</span>
                </div>
                <div className="bottom-line"></div>
              </div>
            </li>
            <li className="feature-item w-full">
              <div className="router-slot w-full h-full">
                <div className="icon w-full h-full fb-flex fb-align-center fb-justify-center">
                  <span className="fb-flex fb-justify-center">icon</span>
                </div>
                <div className="bottom-line"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="banner-right">
        <div className="banner-menu">icon right</div>
        <div className="banner-messenger">icon right</div>
        <div className="banner-notification">icon right</div>
        <div className="banner-dropdown">icon right</div>
      </div>
    </React.Fragment>
  );
};

export default DashBoard;

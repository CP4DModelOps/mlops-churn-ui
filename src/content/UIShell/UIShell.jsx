import React from "react";
import {
    HeaderContainer, Header, SkipToContent, HeaderMenuButton, HeaderName,
    HeaderNavigation, HeaderGlobalBar,
    HeaderGlobalAction, SideNav, SideNavItems, Content,
    SideNavMenu, SideNavMenuItem, Theme, ToastNotification
} from '@carbon/react';
import {
    Notification, Search, Fade, User
} from '@carbon/react/icons';
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';

import ErrorBoundary from "../../components/ErrorBoundary";
import LandingPage from '../LandingPage';
import NotFound from '../../components/NotFound';
import { SearchCustomer } from "../Customers/SearchCustomer";


class UIShell extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        activeItem: `/${window.location.pathname.split('/')[1] ?? ''}`,
        notifications: []
      };
      this.addNotification = this.addNotification.bind(this);
    }

    addNotification(type, message, detail) {
      this.setState(prevState => ({
        notifications: [
          ...prevState.notifications,
          {
            message: message || "Notification",
            detail: detail || "Notification text",
            severity: type || "info"
          }
        ]
      }));
    }

    renderNotifications() {
      return this.state.notifications.map(notification => {
        return (
          <ToastNotification
            title={notification.message}
            subtitle={notification.detail}
            kind={notification.severity}
            timeout={10000}
            caption={false}
          />
        );
      });
    }

    render() {
        return (
            <BrowserRouter>
                <Theme theme='g90'>
                    <HeaderContainer
                        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
                            <div>
                                <Header aria-label="IBM Platform Name">
                                    <SkipToContent />
                                    <HeaderMenuButton
                                        aria-label="Open menu"
                                        onClick={onClickSideNavExpand}
                                        isActive={isSideNavExpanded}
                                    />
                                    <HeaderName href="#" prefix="Telco">
                                        Customer Insights
                                    </HeaderName>
                                    <HeaderNavigation aria-label="Carbon React App"></HeaderNavigation>
                                    <HeaderGlobalBar>
                                        <HeaderGlobalAction
                                            aria-label="Search"
                                            tooltipAlignment="end">
                                            <Search size={20} />
                                        </HeaderGlobalAction>
                                        <HeaderGlobalAction
                                            aria-label="Notifications"
                                            tooltipAlignment="end">
                                            <Notification size={20} />
                                        </HeaderGlobalAction>
                                        <HeaderGlobalAction
                                            aria-label="Profile"
                                            tooltipAlignment="end">
                                            <User size={20} />
                                        </HeaderGlobalAction>
                                    </HeaderGlobalBar>
                                    <ErrorBoundary>
                                        <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
                                            <SideNavItems>
                                                <SideNavMenuItem element={Link} to='/'
                                                    isActive={this.state.activeItem === '/'}
                                                    onClick={() => { this.setState({ activeItem: '/' }) }}>
                                                    Overview
                                                </SideNavMenuItem>
                                                <SideNavMenu renderIcon={Fade} title="Customers" defaultExpanded>
                                                    <SideNavMenuItem element={Link} to='/customers/search'
                                                        isActive={this.state.activeItem === '/customers/search'}
                                                        onClick={() => { this.setState({ activeItem: '/customers/search' }) }}>
                                                        Customer Insights
                                                    </SideNavMenuItem>
                                                </SideNavMenu>
                                                <SideNavMenu renderIcon={Fade} title="Dashboards">
                                                    <SideNavMenuItem href="#">
                                                        Link
                                                    </SideNavMenuItem>
                                                    <SideNavMenuItem href="#">
                                                        Link
                                                    </SideNavMenuItem>
                                                    <SideNavMenuItem href="#">
                                                        Link
                                                    </SideNavMenuItem>
                                                </SideNavMenu>
                                                <SideNavMenu
                                                    renderIcon={Fade}
                                                    title="Docs">
                                                    <SideNavMenuItem href="#">
                                                        Link
                                                    </SideNavMenuItem>
                                                    <SideNavMenuItem href="#">
                                                        Link
                                                    </SideNavMenuItem>
                                                </SideNavMenu>
                                            </SideNavItems>
                                        </SideNav>
                                    </ErrorBoundary>
                                </Header>
                            </div>
                        )}
                    />
                </Theme>
                <Content className='content'>

                    <div className='notif'>
                        {this.state.notifications.length !== 0 && this.renderNotifications()}
                    </div>

                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/customers/search" element={<ErrorBoundary><SearchCustomer addNotification={this.addNotification} /></ErrorBoundary>} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Content>
            </BrowserRouter>
        );
    }
}

export default UIShell;

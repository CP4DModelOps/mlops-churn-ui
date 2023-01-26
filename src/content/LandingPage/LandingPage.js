import React, { Component } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Grid,
  Column,
} from '@carbon/react';
import { InfoSection, InfoCard } from '../../components/Info';
import { Globe, Application, PersonFavorite } from '@carbon/react/icons';

class LandingPage extends Component {
  render() {

    return (
      <Grid className="landing-page" fullWidth>
        <Column lg={16} md={8} sm={4} className="landing-page__banner">
          <Breadcrumb noTrailingSlash aria-label="Page navigation">
            <BreadcrumbItem>
              <a href="/">Getting started</a>
            </BreadcrumbItem>
          </Breadcrumb>
          <h1 className="landing-page__heading">
            Welcome to Customer Insights!
          </h1>
        </Column>
        <Column lg={16} md={8} sm={4} className="landing-page__r2">
          <Tabs defaultSelectedIndex={0}>
            <TabList className="tabs-group" aria-label="Tab navigation">
              <Tab>About</Tab>
              <Tab>Design</Tab>
              <Tab>Develop</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Grid className="tabs-group-content">
                  <Column
                    md={4}
                    lg={7}
                    sm={4}
                    className="landing-page__tab-content">
                    <h2 className="landing-page__subheading">What is Customer Insights?</h2>
                    <p className="landing-page__p">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel tellus dolor. Proin ut tempus risus. Morbi velit elit, convallis quis orci eget, sollicitudin fermentum metus. Pellentesque imperdiet odio ac justo varius scelerisque. Donec suscipit risus at leo luctus dapibus. In vel egestas ante, vitae dictum nibh. Nulla tempus dui et nibh porta dapibus non nec eros.
                    </p>
                    <Button>Learn more</Button>
                  </Column>
                  <Column md={4} lg={{ span: 8, offset: 7 }} sm={4}>
                    <img
                      className="landing-page__illo"
                      src={`${process.env.PUBLIC_URL}/tab-illo.png`}
                      alt="Carbon illustration"
                    />
                  </Column>
                </Grid>
              </TabPanel>
              <TabPanel>
                <Grid className="tabs-group-content">
                  <Column
                    lg={16}
                    md={8}
                    sm={4}
                    className="landing-page__tab-content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel tellus dolor. Proin ut tempus risus. Morbi velit elit, convallis quis orci eget, sollicitudin fermentum metus. Pellentesque imperdiet odio ac justo varius scelerisque.
                  </Column>
                </Grid>
              </TabPanel>
              <TabPanel>
                <Grid className="tabs-group-content">
                  <Column
                    lg={16}
                    md={8}
                    sm={4}
                    className="landing-page__tab-content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel tellus dolor. Proin ut tempus risus. Morbi velit elit, convallis quis orci eget, sollicitudin fermentum metus. Pellentesque imperdiet odio ac justo varius scelerisque.
                  </Column>
                </Grid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Column>
        <Column lg={16} md={8} sm={4} className="landing-page__r3">
          <InfoSection heading="The Principles">
            <InfoCard
              heading="Open"
              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel tellus dolor. Proin ut tempus risus. Morbi velit elit, convallis quis orci eget, sollicitudin fermentum metus. Pellentesque imperdiet odio ac justo varius scelerisque."
              icon={() => <PersonFavorite size={32} />}
            />
            <InfoCard
              heading="Modular"
              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel tellus dolor. Proin ut tempus risus. Morbi velit elit, convallis quis orci eget, sollicitudin fermentum metus. Pellentesque imperdiet odio ac justo varius scelerisque."
              icon={() => <Application size={32} />}
            />
            <InfoCard
              heading="Consistent"
              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel tellus dolor. Proin ut tempus risus. Morbi velit elit, convallis quis orci eget, sollicitudin fermentum metus. Pellentesque imperdiet odio ac justo varius scelerisque."
              icon={() => <Globe size={32} />}
            />
          </InfoSection>
        </Column>
      </Grid>
    );
  }
};

export default LandingPage;

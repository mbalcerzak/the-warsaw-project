import React, { useState } from "react";
import clsx from "clsx";
import Translate, { translate } from "@docusaurus/Translate";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.scss";
import { LocationCountGraph } from "@site/src/scripts/charts-components/DistrLocation";
import { SizeCountGraph } from "@site/src/scripts/charts-components/AptSize";


const features = [
  {
    title: translate({ id: "homepage.features.news.title", message: "Data" }),
    imageUrl: "img/features/quiet_town.svg",
    description: translate({
      id: "homepage.features.news.description",
      message: "First gathering the data from spanish real estate websites ...",
    }),
  },
  {
    title: translate({ id: "homepage.features.officialStatistics.title", message: "Analysis" }),
    imageUrl: "img/features/growth_curve.svg",
    description: translate({
      id: "homepage.features.officialStatistics.description",
      message:
        "... then cleaning, transforming, analysing, aggregating, modelling ...",
    }),
  },
  {
    title: translate({ id: "homepage.features.pressConference.title", message: "MLOps" }),
    imageUrl: "img/features/coding.svg",
    description: translate({
      id: "homepage.features.pressConference.description",
      message: "... to find an interesting opportunity while learning new programming tools :)",
    }),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className="col col--4 padding-horiz--lg">
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Banner() {
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        <Link
          title={translate({ id: "homepage.hero.logoLink.title", message: "logoLink Title" })}
        >
          <img className={styles.heroLogo} src={useBaseUrl("/img/choosing_house.svg")} alt="Website Logo" />
        </Link>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>
            Valencia <br></br>flat finder
          </h1>
          <p
            className={styles.heroTagline}
            dangerouslySetInnerHTML={{
              __html: translate({
                id: "homepage.hero.tagline",
                message: "Roses are red<br>Violets are blue<br>I am using ML<br>to make dreams come true",
                description: "Homepage hero tagline, can contain simple html tags",
              }),
            }}
          />
          <div className={styles.buttons}>
            <Link
              className={clsx("button button--outline button--primary button--lg", styles.btnCta)}
              to={useBaseUrl("docs/about")}
            >
              <Translate id="homepage.hero.button.learnMore">Learn More</Translate>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}



function Features() {
  return (
    <section className={clsx("padding-vert--lg", styles.bgFeatures)}>
      <div className="container">
        <div className="row">
          {features.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
      <div className="flex-center--wrap margin-vert--md">
        <Link
          className={clsx("button button--outline button--primary button--lg", styles.btnCta)}
          to={useBaseUrl("charts")}
        >
          <Translate id="homepage.features.button.startReading">Learn More!</Translate>
        </Link>
      </div>
    </section>
  );
}

function SomeCharts() {

  return (
    <section className={clsx("padding-vert--lg", styles.bgSomeCharts)}>
      <div className="container">
        <div className="text--center margin-top--lg">
          <h1>
            <Translate id="homepage.SomeCharts.title">Overall statistics</Translate>
          </h1>
        </div>
        <div className="row">
          <div className="col col--6 padding--lg">
            <LocationCountGraph />
          </div>
          <div className="col col--6 padding--lg">
            <SizeCountGraph />
          </div>
        </div>
      </div>
      <div className="flex-center--wrap margin-vert--md">
        <Link
          className={clsx("button button--outline button--primary button--lg", styles.btnCta)}
          to={useBaseUrl("charts")}
        >
          <Translate id="homepage.SomeCharts.button.seeMoreCharts">See More Charts</Translate>
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  const title = translate({ id: "homepage.title", message: "Home" });
  const description = translate({
    id: "homepage.description",
    message: "Homepage description",
  });

  return (
    <Layout title={title} description={description}>
      <Banner />
      <main>
        <SomeCharts />
        <Features />
      </main>
    </Layout>
  );
}

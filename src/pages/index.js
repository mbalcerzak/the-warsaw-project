import React, { useState } from "react";
import DatePicker from "react-date-picker";
import clsx from "clsx";
import Translate, { translate } from "@docusaurus/Translate";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.scss";
import { monthEnLower } from "@site/src/scripts/utils";
import { digestLatestDate2021 } from "@site/src/scripts/dateVariables";
import { OfficialData } from "@site/src/scripts/digest-components";
import { CasesTrend } from "@site/src/scripts/charts-components/Cases";
import { DeathsTrend } from "@site/src/scripts/charts-components/Deaths";

const features = [
  {
    title: translate({ id: "homepage.features.officialStatistics.title", message: "...What market crash?" }),
    imageUrl: "img/features/growth_curve.svg",
    description: translate({
      id: "homepage.features.officialStatistics.description",
      message:
        "Have they been telling you too how you should wait with buying a flat because the bubble will burst any time now? lol. ANY TIME NOW.",
    }),
  },
  {
    title: translate({ id: "homepage.features.news.title", message: "They get sold in hours" }),
    imageUrl: "img/features/for_sale.svg",
    description: translate({
      id: "homepage.features.news.description",
      message: "Don't. Even. Bother.",
    }),
  },
  {
    title: translate({ id: "homepage.features.pressConference.title", message: "We have been using AI to predict house prices..." }),
    imageUrl: "img/features/analytics.svg",
    description: translate({
      id: "homepage.features.pressConference.description",
      message: "...and after seeing the result decided to move to Spain.",
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
          to={`/digest/2021/${monthEnLower(digestLatestDate2021.m)}/${digestLatestDate2021.d}`}
          title={translate({ id: "homepage.hero.logoLink.title", message: "logoLink Title" })}
        >
          <img className={styles.heroLogo} src={useBaseUrl("/img/city_girl.svg")} alt="Website Logo" />
        </Link>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>
            <Translate id="homepage.hero.title">Warsaw flats</Translate>
          </h1>
          <p
            className={styles.heroTagline}
            dangerouslySetInnerHTML={{
              __html: translate({
                id: "homepage.hero.tagline",
                message: "Roses are red<br>Violets are blue<br>I can't afford a flat<br>And neither can you &#129394",
                description: "Homepage hero tagline, can contain simple html tags",
              }),
            }}
          />
          <div className={styles.buttons}>
            <Link
              className={clsx("button button--outline button--primary button--lg", styles.btnCta)}
              to={useBaseUrl("digest")}
            >
              <Translate id="homepage.hero.button.learnMore">Learn More</Translate>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function LatestOfficalData() {
  const d = digestLatestDate2021.d;
  const m = digestLatestDate2021.m;
  const y = 2021;
  const linkToLatestDigest = `/digest/${y}/${monthEnLower(m)}/${d}`;
  const [selectedDate, onChange] = useState(new Date(2021, m - 1, d));

  const toISO = (v) =>
    `${v.getFullYear()}-${("0" + String(1 + v.getMonth())).slice(-2)}-${("0" + v.getDate()).slice(-2)}`;

  return (
    <section className={clsx("padding-vert--lg", styles.bgLatestOfficalData)}>
      <div className="container">
        <div className="text--center margin-vert--lg">
          <h1>
            <Translate id="homepage.LatestOfficialData.title">Latest Official Data</Translate>
          </h1>
          <h3>
            <Translate id="homepage.LatestOfficialData.dateTitle">Date:</Translate>
            <DatePicker
              className={styles.DatePicker}
              onChange={onChange}
              value={selectedDate}
              minDate={new Date(2020, 3 - 1, 2)}
              maxDate={new Date(2021, m - 1, d)}
              clearIcon={null}
              format={translate({ id: "homepage.LatestOfficialData.dateFormat", message: "y Year M month d DaY" })}
              calendarAriaLabel="Toggle calendar"
              dayAriaLabel="Day"
              monthAriaLabel="Month"
              yearAriaLabel="Year"
            />
          </h3>
        </div>
        <OfficialData date={toISO(selectedDate)} />
      </div>
      <div className="flex-center--wrap margin-vert--md">
        <Link
          className={clsx("button button--outline button--primary button--lg", styles.btnCta)}
          to={linkToLatestDigest}
        >
          <Translate id="homepage.LatestOfficialData.button.readTheLatestDigest">Latest Official Digest</Translate>
        </Link>
      </div>
    </section>
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
          to={useBaseUrl("digest")}
        >
          <Translate id="homepage.features.button.startReading">Learn More!</Translate>
        </Link>
      </div>
    </section>
  );
}

function SomeCharts() {
  const day = digestLatestDate2021.d;
  const month = digestLatestDate2021.m;
  const year = 2021;

  return (
    <section className={clsx("padding-vert--lg", styles.bgSomeCharts)}>
      <div className="container">
        <div className="text--center margin-top--lg">
          <h1>
            <Translate id="homepage.SomeCharts.title">Some Charts</Translate>
          </h1>
          <h3>
            <Translate
              id="homepage.SomeCharts.dateTitle"
              values={{
                day,
                month,
                year,
              }}
            >
              {"Date: {year} Year {month} Month {day} Day"}
            </Translate>
          </h3>
        </div>
        <div className="row">
          <div className="col col--6 padding--lg">
            <CasesTrend />
          </div>
          <div className="col col--6 padding--lg">
            <DeathsTrend />
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
        <LatestOfficalData />
        <SomeCharts />
        <Features />
      </main>
    </Layout>
  );
}

import React from "react";
import { Line } from "react-chartjs-2";
import { chartSettings } from "./chartSettings";
import Translate, { translate } from "@docusaurus/Translate";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { officialData as od } from "../data/data";
import { newsEarliestDateISO } from "./dateVariables";
import {
  beautifyNumber as bn,
  beautifyNumberWithSign as bnws,
  theDayBefore as tdb,
  graceTseng as gt,
  startDate,
  isNumber as isNum,
  toYYYYMM,
  arrayOfDates as arrD,
  toLabelDateMD as lblDateMD,
  toLabelDateDM as lblDateDM,
  reverseMDLabelDate as revMD,
  getMonthName,
} from "./utils";

const CasesCumul = ({ date, numFmt }) => {
  // get data
  const casesCumul = od[date]?.casesCumul;
  const casesCumulTdb = od[tdb(date)]?.casesCumul;
  const casesEhpadEmsCumul = od[date]?.casesEhpadEmsCumul;
  const casesEhpadEmsCumulTdb = od[tdb(date)]?.casesEhpadEmsCumul;
  const casesRtPcr = od[date]?.casesRtPcr;
  const casesAntig = od[date]?.casesAntig;

  // return nothing if `casesCumul` doesn't exist for the date
  if (!isNum(casesCumul)) return <></>;

  return (
    <div>
      <h3>
        <Translate id="digestComp.CasesCumul.title" description="The heading of CasesCumul">
          🧫 Cases
        </Translate>
      </h3>
      <ul>
        <li>
          <Translate id="digestComp.CasesCumul.casesCumul" description="The description for casesCumul in CasesCumul">
            Number of cases：
          </Translate>
          {bn(casesCumul, numFmt)}
          {isNum(casesCumulTdb) ? <em> ({bnws(casesCumul - casesCumulTdb, numFmt)})</em> : null}
        </li>
        {isNum(casesRtPcr) ? (
          <li>
            <Translate id="digestComp.CasesCumul.casesRtPcr" description="The description for casesRtPcr in CasesCumul">
              Cases RT-PCR：
            </Translate>
            {bn(casesRtPcr, numFmt)}
          </li>
        ) : null}
        {isNum(casesAntig) ? (
          <li>
            <Translate id="digestComp.CasesCumul.casesAntig" description="The description for casesAntig in CasesCumul">
              Cases antigen test
            </Translate>
            {bn(casesAntig, numFmt)}
          </li>
        ) : null}
      </ul>
    </div>
  );
};

const DeathsCumul = ({ date, numFmt }) => {
  // get data
  const deathsCumul = od[date]?.deathsCumul;
  const deathsCumulTdb = od[tdb(date)]?.deathsCumul;
  const deathsHospiCumul = od[date]?.deathsHospiCumul;
  const deathsHospiCumulTdb = od[tdb(date)]?.deathsHospiCumul;
  const deathsEhpadEmsCumul = od[date]?.deathsEhpadEmsCumul;
  const deathsEhpadEmsCumulTdb = od[tdb(date)]?.deathsEhpadEmsCumul;

  // return nothing if `deathsHospiCumul` doesn't exist for the date
  if (!isNum(deathsHospiCumul)) return <></>;

  return (
    <div>
      <h3>
        <Translate id="digestComp.DeathsCumul.title" description="The heading of DeathsCumul">
          ☠️ Deaths
        </Translate>
      </h3>
      <ul>
        {isNum(deathsCumul) ? (
          <li>
            <Translate
              id="digestComp.DeathsCumul.deathsCumul"
              description="The description for deathsCumul in DeathsCumul"
            >
              Number of deaths
            </Translate>
            {bn(deathsCumul, numFmt)}
            {isNum(deathsCumulTdb) ? <em> ({bnws(deathsCumul - deathsCumulTdb, numFmt)})</em> : null}
          </li>
        ) : null}
        <li>
          <Translate
            id="digestComp.DeathsCumul.deathsHospiCumul"
            description="The description for deathsHospiCumul in DeathsCumul"
          >
            Death cummulative:
          </Translate>
          {bn(deathsHospiCumul, numFmt)}
          {isNum(deathsHospiCumulTdb) ? <em> ({bnws(deathsHospiCumul - deathsHospiCumulTdb, numFmt)})</em> : null}
        </li>
      </ul>
    </div>
  );
};

const Hospi = ({ date, numFmt }) => {
  // get data
  const hospi = od[date]?.hospi;
  const hospiTdb = od[tdb(date)]?.hospi;
  const hospiNew = od[date]?.hospiNew;
  const hospiNewTdb = od[tdb(date)]?.hospiNew;
  const hospiWeek = od[date]?.hospiWeek;
  const hospiWeekWb = od[tdb(date, 7)]?.hospiWeek;

  // return nothing if `hospi` doesn't exist for the date
  if (!isNum(hospi)) return <></>;

  return (
    <div>
      <h3>
        <Translate id="digestComp.Hospi.title" description="The heading of Hospi">
          🏥 Hospitalisations
        </Translate>
      </h3>
      <ul>
        <li>
          <Translate id="digestComp.Hospi.hospi" description="The description for hospi in Hospi">
            Number:
          </Translate>
          {bn(hospi, numFmt)}
          {isNum(hospiTdb) ? <em> ({bnws(hospi - hospiTdb, numFmt)})</em> : null}
        </li>
        {isNum(hospiNew) ? (
          <li>
            <Translate id="digestComp.Hospi.hospiNew" description="The description for hospiNew in Hospi">
              New cases：
            </Translate>
            {bn(hospiNew, numFmt)}
            {isNum(hospiNewTdb) ? <em> ({bnws(hospiNew - hospiNewTdb, numFmt)})</em> : null}
          </li>
        ) : null}
        {isNum(hospiWeek) ? (
          <li>
            <Translate id="digestComp.Hospi.hospiWeek" description="The description for hospiWeek in Hospi">
              This week：
            </Translate>
            {bn(hospiWeek, numFmt)}
            {isNum(hospiWeekWb) ? (
              <em>
                <Translate
                  id="digestComp.Hospi.hospiWeekVar"
                  description="The weekly variation of hospiWeek in Hospi, inside parentheses"
                  values={{ hospiWeekVar: bnws(hospiWeek - hospiWeekWb, numFmt) }}
                >
                  {"（Documented cases {hospiWeekVar}）"}
                </Translate>
              </em>
            ) : null}
          </li>
        ) : null}
      </ul>
    </div>
  );
};

const Icu = ({ date, numFmt }) => {
  // get data
  const icu = od[date]?.icu;
  const icuTdb = od[tdb(date)]?.icu;
  const icuNew = od[date]?.icuNew;
  const icuNewTdb = od[tdb(date)]?.icuNew;
  const icuWeek = od[date]?.icuWeek;
  const icuWeekWb = od[tdb(date, 7)]?.icuWeek;

  // return nothing if `icu` doesn't exist for the date
  if (!isNum(icu)) return <></>;

  return (
    <div>
      <h3>
        <Translate id="digestComp.Icu.title" description="The heading of Icu">
          😞 ICU
        </Translate>
      </h3>
      <ul>
        <li>
          <Translate id="digestComp.Icu.icu" description="The description for icu in Icu">
            Number:
          </Translate>
          {bn(icu, numFmt)}
          {isNum(icuTdb) ? <em> ({bnws(icu - icuTdb, numFmt)})</em> : null}
        </li>
        {isNum(icuNew) ? (
          <li>
            <Translate id="digestComp.Icu.icuNew" description="The description for icuNew in Icu">
              New cases：
            </Translate>
            {bn(icuNew, numFmt)}
            {isNum(icuNewTdb) ? <em> ({bnws(icuNew - icuNewTdb, numFmt)})</em> : null}
          </li>
        ) : null}
        {isNum(icuWeek) ? (
          <li>
            <Translate id="digestComp.Icu.icuWeek" description="The description for icuWeek in Icu">
              New cases this week：
            </Translate>
            {bn(icuWeek, numFmt)}
            {isNum(icuWeekWb) ? (
              <em>
                <Translate
                  id="digestComp.Icu.icuWeekVar"
                  description="The weekly variation of icuWeek in Icu, inside parentheses"
                  values={{ icuWeekVar: bnws(icuWeek - icuWeekWb, numFmt) }}
                >
                  {"（ICU cases that week {icuWeekVar}）"}
                </Translate>
              </em>
            ) : null}
          </li>
        ) : null}
      </ul>
    </div>
  );
};

const ReturnHomeCumul = ({ date, numFmt }) => {
  // get data
  const returnHomeCumul = od[date]?.returnHomeCumul;
  const returnHomeCumultdb = od[tdb(date)]?.returnHomeCumul;

  // return nothing if `returnHomeCumul` doesn't exist for the date
  if (!isNum(returnHomeCumul)) return <></>;

  return (
    <div>
      <h3>
        <Translate id="digestComp.ReturnHomeCumul.title" description="The heading of ReturnHomeCumul">
          🏡 Return home
        </Translate>
      </h3>
      <ul>
        <li>
          <Translate
            id="digestComp.ReturnHomeCumul.returnHomeCumul"
            description="The description for returnHomeCumul in ReturnHomeCumul"
          >
            Number:
          </Translate>
          {bn(returnHomeCumul, numFmt)}
          {isNum(returnHomeCumultdb) ? <em> ({bnws(returnHomeCumul - returnHomeCumultdb, numFmt)})</em> : null}
        </li>
      </ul>
    </div>
  );
};

const VacCumul = ({ date, numFmt }) => {
  // get data
  const vac1 = od[date]?.vac1;
  const vac1Tdb = od[tdb(date)]?.vac1;
  const vac2 = od[date]?.vac2;
  const vac2Tdb = od[tdb(date)]?.vac2;

  // return nothing if `vac1` doesn't exist for the date
  if (!isNum(vac1)) return <></>;

  return (
    <div>
      <h3>
        <Translate id="digestComp.VacCumul.title" description="The heading of VacCumul">
          💉 Vaccinations
        </Translate>
      </h3>
      <ul>
        <li>
          <Translate id="digestComp.VacCumul.vac1" description="The description for vac1 in VacCumul">
            1st dose：
          </Translate>
          {bn(vac1, numFmt)}
          {isNum(vac1Tdb) ? <em> ({bnws(vac1 - vac1Tdb, numFmt)})</em> : null}
        </li>
        {isNum(vac2) ? (
          <li>
            <Translate id="digestComp.VacCumul.vac2" description="The description for vac2 in VacCumul">
              2nd dose：
            </Translate>
            {bn(vac2, numFmt)}
            {isNum(vac2Tdb) ? <em> ({bnws(vac2 - vac2Tdb, numFmt)})</em> : null}
          </li>
        ) : null}
      </ul>
    </div>
  );
};

const Indicators = ({ date, numFmt }) => {
  // get data
  const incidR = od[date]?.incidR;
  const icuOccupR = od[date]?.icuOccupR;
  const r = od[date]?.r;
  const posR = od[date]?.posR;
  const vacEhpadUsldPct = od[date]?.vacEhpadUsldPct;
  const highVul = od[date]?.highVul;
  const clusters = od[date]?.clusters;

  // return nothing if `icuOccupR` doesn't exist for the date
  if (!isNum(icuOccupR)) {
    return <></>;
  }

  return (
    <div>
      <h3>
        <Translate id="digestComp.Indicators.title" description="The heading of Indicators">
          📊 Indicators
        </Translate>
      </h3>
      <ul>
        {isNum(incidR) ? (
          <li>
            <Translate id="digestComp.Indicators.incidR" description="The description for incidR in Indicators">
              R incidents：
            </Translate>
            {bn(incidR, numFmt)}
          </li>
        ) : null}
        <li>
          <Translate id="digestComp.Indicators.icuOccupR" description="The description for icuOccupR in Indicators">
            ICU Occupancy:
          </Translate>
          {bn(icuOccupR, numFmt)}%
        </li>
        {isNum(r) ? (
          <li>
            <Translate id="digestComp.Indicators.r" description="The description for r in Indicators">
              Indicator (R)：
            </Translate>
            {bn(r, numFmt)}
          </li>
        ) : null}
        {isNum(posR) ? (
          <li>
            <Translate id="digestComp.Indicators.posR" description="The description for posR in Indicators">
              RT-PCR tests
            </Translate>
            {bn(posR, numFmt)}%
          </li>
        ) : null}
        {isNum(highVul) ? (
          <li>
            <Translate
              id="digestComp.Indicators.highVul"
              description="The line for highVul in Indicators"
              values={{ highVul: highVul }}
            >
              {"Highly vulnerable: {highVul}"}
            </Translate>
          </li>
        ) : null}
        {Array.isArray(vacEhpadUsldPct) ? (
          <li>
            <Translate
              id="digestComp.Indicators.vacEhpadUsldPct"
              description="The line for vacEhpadUsldPct in Indicators"
              values={{
                pct: bn(vacEhpadUsldPct[0], numFmt),
                dateMD: vacEhpadUsldPct[1],
                dateDM: revMD(vacEhpadUsldPct[1]),
              }}
            >
              {"Percent vaccinated：{pct}%（{dateMD}）"}
            </Translate>
          </li>
        ) : null}
        {Array.isArray(clusters) ? (
          <li>
            <Translate
              id="digestComp.Indicators.clusters"
              description="The line for clusters in Indicators"
              values={{
                clustersTotal: bn(clusters[0], numFmt),
                clustersEhpad: bn(clusters[1], numFmt),
                dateMD: clusters[2],
                dateDM: revMD(clusters[2]),
              }}
            >
              {
                "2020 {dateMD} : {clustersTotal} {clustersEhpad} "
              }
            </Translate>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

// --------
// EXPORTS
// --------

// used className `subtitle`
export const Subtitle = ({ date }) => {
  const n = 1 + (Date.parse(date) - Date.parse(startDate)) / 864e5;
  const [yyyy, mm, dd] = date.split("-");
  const month_en = getMonthName(parseInt(mm), "en");
  const month_fr = getMonthName(parseInt(mm), "fr");

  return (
    <p className="subtitle">
      <Translate
        id="digestComp.Subtitle"
        description="The subtitle of a daily digest"
        values={{
          y: yyyy,
          m: mm.replace(/^0/, ""),
          d: dd.replace(/^0/, ""),
          month_en: month_en,
          month_fr: month_fr,
          n: n,
        }}
      >
        {"{y}  {m}  {d} . {n} "}
      </Translate>
    </p>
  );
};

export const Grace = ({ children }) => (
  <em style={{ color: "var(--ifm-color-primary)" }}>
    {gt}: {children}
  </em>
);

export const Fish = ({ children }) => <em style={{ color: "var(--ifm-color-primary)" }}>FISH UP: {children}</em>;

// date is required, if date is earlier then earliestDate then placeholder img is used
// if srcx is absent, img will be the main img
// used className: `img-digest`, `caption`
export const Figure = ({ date, srcx, children }) => {
  const n = (Date.parse(newsEarliestDateISO) - Date.parse(date)) / 864e5;
  const src =
    n <= 0
      ? `/img/digest/${toYYYYMM(date)}/covid-19-in-france-${date}${srcx ? "-" + srcx : ""}.jpg`
      : `/img/digest/placeholder/${1 + (n % 7)}.jpg`;

  const [yyyy, mm, dd] = date.split("-");
  const month_en = getMonthName(parseInt(mm), "en");
  const month_fr = getMonthName(parseInt(mm), "fr");
  const caption = children
    ? children
    : translate(
        {
          id: "digestComp.Figure.defaultCaption",
          message: "{y}  {m}  {d} ",
          description: "The default image caption in Figure",
        },
        { y: yyyy, m: mm.replace(/^0/, ""), d: dd.replace(/^0/, ""), month_en: month_en, month_fr: month_fr }
      );

  const getText = (reactElem: any): string => {
    if (typeof reactElem == "string") return reactElem;
    if (Array.isArray(reactElem)) return reactElem.map(getText).join("");
    if (typeof reactElem === "object") return getText(reactElem.props.children);
    return "";
  };

  return (
    <>
      <img src={useBaseUrl(src)} className="img-digest" alt={getText(caption)} title={getText(caption)} />
      <div className="caption">{caption}</div>
    </>
  );
};

export const ChartCases = ({ date }) => {
  const dateFmt = translate({ id: "dateFmt", message: "m/d" });
  const duration = 14;
  const renderChartThold = 5;
  const dataName = "casesCumul";

  const listOfDates: string[] = arrD(date, duration);
  const dataCasesCumul = listOfDates.map((d) => od[d]?.[dataName]);
  const definedDataCasesCumul: number[] = dataCasesCumul.filter(Number);

  // don't show the chart if there are less than `renderChartThold` entries
  if (definedDataCasesCumul.length < renderChartThold) return <></>;

  const dataMin = Math.min(...definedDataCasesCumul);
  const stepSize = dataMin > 200000 ? 10000 : dataMin > 2000 ? 1000 : 100;
  const suggestedMin = Math.max(0, dataMin - 2 * stepSize);

  const chartsPageLink = (
    <Link to="/charts">
      <Translate id="digestComp.ChartCases.chartsPageLink" description="The page name of Charts">
        Charts
      </Translate>
    </Link>
  );

  const data = {
    labels: dateFmt == "d/m" ? listOfDates.map(lblDateDM) : listOfDates.map(lblDateMD),
    datasets: [
      {
        ...chartSettings.lineStyle.blue,
        label: translate({
          id: "digestComp.ChartCases.label.total",
          message: "Total cases",
          description: "The label for total cases in ChartCases",
        }),
        data: dataCasesCumul,
        fill: false,
        yAxisID: "y-axis-cumul",
      },
      {
        ...chartSettings.barStyle.red,
        type: "bar",
        label: translate({
          id: "digestComp.ChartCases.label.new",
          message: "New cases",
          description: "The label for new cases in ChartCases",
        }),
        data: dataCasesCumul.map((x, i, arr) => (i > 0 ? x - arr[i - 1] : x - od[tdb(date, duration)]?.[dataName])),
        yAxisID: "y-axis-var",
      },
    ],
  };

  const options = {
    legend: chartSettings.legend,
    tooltips: chartSettings.tooltips,
    scales: {
      xAxes: [{ ...chartSettings.scales.xAxes, offset: true }],
      yAxes: [
        {
          id: "y-axis-cumul",
          position: "right",
          gridLines: chartSettings.scales.yAxes.gridLinesStyle.visible,
          ticks: {
            ...chartSettings.scales.yAxes.ticksStyle.blue,
            stepSize: stepSize,
            suggestedMin: suggestedMin,
          },
        },
        {
          id: "y-axis-var",
          position: "left",
          gridLines: chartSettings.scales.yAxes.gridLinesStyle.hidden,
          ticks: {
            ...chartSettings.scales.yAxes.ticksStyle.red,
            min: 0, // because new cases could absurdly be negative...
          },
        },
      ],
    },
  };

  return (
    <>
      <div className="chart-title">
        <Translate id="digestComp.ChartCases.title" description="The title of ChartCases">
          New Cases
        </Translate>
      </div>
      <Line data={data} options={options} />
      <p style={{ marginTop: 16 }}>
        &#9824;{" "}
        <Translate
          id="digestComp.ChartCases.seeMoreCharts"
          description="The sentence for seeing more charts on the Charts page, `chartsPageLink` being the page link"
          values={{ chartsPageLink: chartsPageLink }}
        >
          {"更多數據視覺化可參見{chartsPageLink}。"}
        </Translate>
      </p>
    </>
  );
};

export const OfficialData = ({ date }) => {
  const numFmt = translate({ id: "numFmt", message: "en" });

  return (
    <div className="official_data_block">
      <CasesCumul date={date} numFmt={numFmt} />
      <DeathsCumul date={date} numFmt={numFmt} />
      <Hospi date={date} numFmt={numFmt} />
      <Icu date={date} numFmt={numFmt} />
      <ReturnHomeCumul date={date} numFmt={numFmt} />
      <VacCumul date={date} numFmt={numFmt} />
      <Indicators date={date} numFmt={numFmt} />
    </div>
  );
};

// used className `comment--translc_gray`
export const SourceFb = ({ date }) => {
  const phrase = translate(
    {
      id: "digestComp.SourceFb.phrase",
      description: "The starting phrase in SourceFb (used only in traditional and simplified Chinese)",
      message: "📝 以下內容整理於 {gt} 在臉書社團中的",
    },
    { gt: gt }
  );
  const thisPost = translate({
    id: "digestComp.SourceFb.thisPost",
    description: "'This post' (content of anchor tags in SourceFb, used only in traditional and simplified Chinese)",
    message: "此貼文",
  });
  const linkTitle = translate({
    id: "digestComp.SourceFb.linkTitle",
    description: "The title of links 'this post' in SourceFb (used only in traditional and simplified Chinese)",
    message: "前往臉書社團貼文",
  });
  let content = <></>;

  if (typeof fbLinks[date] == "string") {
    content = (
      <>
        {phrase}
        <a href={fbLinks[date]} title={linkTitle} target="_blank">
          {thisPost}
        </a>
        。
      </>
    );
    return <div className="comment--translc_gray">{content}</div>;
  }
  if (Array.isArray(fbLinks[date])) {
    const fbLinksNum: number = fbLinks[date].length;
    content = fbLinks[date].map((link: string, i: number) => (
      <React.Fragment key={i}>
        {i == 0 ? phrase : i == fbLinksNum - 1 ? "以及" : "、"}
        <a href={link} title={linkTitle} target="_blank">
          {thisPost}
        </a>
        {i == fbLinksNum - 1 ? "。" : ""}
      </React.Fragment>
    ));
    return <div className="comment--translc_gray">{content}</div>;
  }

  return content;
};

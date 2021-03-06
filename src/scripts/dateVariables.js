const fmtMD = (n) => (n < 10 ? `0${n}` : `${n}`);

export const newsEarliestDate = { m: 10, d: 26 };
export const digestLatestDate2021 = { m: 10, d: 9 };

export const newsEarliestDateISO = `2020-${fmtMD(newsEarliestDate.m)}-${fmtMD(newsEarliestDate.d)}`;
export const digestLatestDate2021ISO = `2021-${fmtMD(digestLatestDate2021.m)}-${fmtMD(digestLatestDate2021.d)}`;

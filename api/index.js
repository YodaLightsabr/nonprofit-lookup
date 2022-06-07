import fetch from 'node-fetch';
import cheerio from 'cheerio';
import tabletojson from 'tabletojson';

const convertTable = tabletojson.Tabletojson.convert;

const tableSelector = `html body div#finder-content form#form1 div.finder-table-results div table#MainContent_GridView1`;
const tableLinkSelector = `tr td a`;

/**
 * 
 * @param {string} org Search query
 * @param {string} state A two letter state abbreviation.
 * @param {'A'|'B'|''|undefined} type The type of record to find. A, B, or blank. 990 or 990-PF
 * @param {string} ein An EIN number without dashes to find
 * @returns 
 */

const generateURL = (org = '', state = '', type = '', ein = '') => `https://990finder.foundationcenter.org/990results.aspx?990_type=${encodeURIComponent(type)}&fn=${encodeURIComponent(org).split('%20').join('+')}&st=${encodeURIComponent(state)}&zp=&ei=${encodeURIComponent(ein)}&fy=&action=Search`;


const lookup = async (org = '', state = '', type = '', ein = '') => {
    const url = generateURL(org, state, type, ein);
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const links = [];
    $(tableSelector + ' ' + tableLinkSelector).each((index, value) => links.push($(value).attr('href')));
    const table = convertTable(`<table>${$(tableSelector).html()}</table>`)[0].map((row, i) => ({ ...row, Link: links[i] }));
    return table;
}

export default async function (req, res) {
    const data = await lookup(req.query.org, req.query.state, req.query.type, req.query.ein);
    res.json(data);
}
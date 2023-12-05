/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Using @types/google-publisher-tag
// https://www.npmjs.com/package/@types/google-publisher-tag

window.googletag = window.googletag || { cmd: [] };

let requestedTimestamp: { [key: string]: number } = {};
const REFRESH_KEY = 'refresh';
const REFRESH_VALUE = 'true';
const SECONDS_TO_WAIT_AFTER_VIEWABILITY = 30;
googletag.cmd.push(() => {
  // Define ad slots.
  //wolipop
  googletag
    .defineSlot(
      '/4905536/detik_desktop/wolipop/medium_rectangle1',
      [
        [300, 250],
        [300, 500],
        [300, 600],
        [250, 250],
      ],
      'div-gpt-ad-1534858187231-0'
    )!
    .setTargeting(REFRESH_KEY, REFRESH_VALUE)
    .setTargeting('pos', 'medium_rectangle')
    .addService(googletag.pubads());
  //Popbela
  googletag
    .defineSlot(
      '/253109699/PopbelaDesktop/Homepage',
      [
        [970, 250],
        [970, 90],
      ],
      'div-gpt-ad-leaderboard'
    )!
    .setTargeting(REFRESH_KEY, REFRESH_VALUE)
    .setTargeting('pos', 'Leaderboard')
    .addService(googletag.pubads());
  googletag
    .defineSlot(
      '/253109699/PopbelaDesktop/Homepage',
      [[728, 90]],
      'div-gpt-ad-infeed1'
    )!
    .setTargeting(REFRESH_KEY, REFRESH_VALUE)
    .setTargeting('pos', 'Infeed1')
    .addService(googletag.pubads());
  googletag
    .defineSlot(
      '/253109699/PopbelaDesktop/Fashion',
      [[728, 90]],
      'div-gpt-ad-sticky'
    )!
    .setTargeting(REFRESH_KEY, REFRESH_VALUE)
    .setTargeting('pos', 'Sticky')
    .setTargeting('section', 'lifestyle')
    .addService(googletag.pubads());
  googletag
    .defineSlot(
      '/253109699/PopbelaDesktop/Fashion',
      [
        [300, 250],
        [300, 600],
      ],
      'div-gpt-ad-mr1'
    )!
    .setTargeting(REFRESH_KEY, REFRESH_VALUE)
    .setTargeting('pos', 'MR1')
    .setTargeting('section', 'lifestyle')
    .addService(googletag.pubads());

  // This listener will be called when an impression is considered viewable.
  googletag.pubads().addEventListener('impressionViewable', (event) => {
    const { slot } = event;
    const slotId = event.slot.getSlotElementId();
    printEventMessage('Impression has become viewable.', slotId);
    if (slot.getTargeting(REFRESH_KEY).indexOf(REFRESH_VALUE) > -1) {
      setTimeout(function () {
        googletag.pubads().refresh([slot]);
      }, SECONDS_TO_WAIT_AFTER_VIEWABILITY * 1000);
    }
  });

  googletag.pubads().setTargeting('sites', 'popbela');
  googletag
    .pubads()
    .setTargeting(
      'Keyword_tag',
      'fashion,beauty,love,zodiak,sex,sale,wedding,entertainment,family,horoscope,wolipop,detik,hijab,lifestyle'
    );
  googletag
    .pubads()
    .setTargeting(
      'adult',
      'fashion,beauty,love,zodiak,sex,sale,wedding,entertainment,family,horoscope,wolipop,detik,hijab,lifestyle'
    );
  googletag
    .pubads()
    .setTargeting(
      'KeyValue',
      'fashion,beauty,love,zodiak,sex,sale,wedding,entertainment,family,horoscope,wolipop,detik,hijab,lifestyle'
    );
  googletag
    .pubads()
    .setTargeting(
      'ov_audience_interest',
      'OV-99-mlb-act-3month,OV-29-02,OVAL-11,OVAL-14,OV-99-mlb-act-2week,OV-31-12,OV-31-14,OVAL-17,OV-99-mlb-act-1week,OVAL-16,OVAL-23,OV-32-09,OVAL-09,OVAL-10,OV-99-mlb-act-3week,OV-30-03,OVAL-15,OVAL-04,OVAL-13,OV-99-01,OVAL-22,OV-31-06,OVAL-08,OVAL-06,OV-28-02,OV-35-06,OVAL-18,OV-29-09,OV-99-mlb-act-1month,OV-32-05,OVAL-02,OV-29-04,OVAL-03,OVAL-25'
    );
  // Enable SRA and services.
  googletag.pubads().enableSingleRequest();
  googletag.enableServices();

  // Request and render all previously defined ad slots.
  googletag.display('div-gpt-ad-mr1');
});

function printEventMessage(
  eventMessage: string,
  slotId: string,
  details: { [key: string]: boolean | number | number[] | string | null } = {}
) {
  const row = document
    .getElementsByClassName('status-row')[0]
    .cloneNode(true) as HTMLDivElement;

  const cells = row.getElementsByClassName('status-cell');
  cells[0].textContent = slotId;
  cells[1].textContent = eventMessage;
  for (const key in details) {
    if (!details.hasOwnProperty(key) || !details[key]) continue;

    const detailElem = document.createElement('p');
    detailElem.className = 'status-detail';
    detailElem.textContent = `${key}: ${details[key]}`;
    cells[1].appendChild(detailElem);
  }
  cells[2].textContent = `${Date.now() - requestedTimestamp[slotId]}ms`;

  document.getElementsByClassName('status-container')[0].appendChild(row);
}

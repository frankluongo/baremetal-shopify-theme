import { KLAVIYO_URL, KLAVIYO_METRICS_URL, STATE_UPDATED } from "./constants";

export function urlEncode(obj) {
  return Object.keys(obj).map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k])).join("&");
}

export function urlToObj(url) {
  const urlObj = {}
  const params = url.split('&')
  params.forEach(param => {
    const keyVal = param.split('=');
    if (keyVal[1].includes('{')) {
      // const parsedObj = JSON.parse(keyVal[1]);
    }
    urlObj[keyVal[0]] = keyVal[1];
  });
}

export async function sendToKlaviyo({ $email, baseData, onFail, onSuccess }) {
  const body = urlEncode({
    ...baseData,
    $email,
  });
  try {
    const res = await fetch(KLAVIYO_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body,
    });
    const { success } = await res.json();
    if (!success) {
      onFail();
      return;
    }
    onSuccess();
  } catch (e) {
    console.log(e);
  }
}

export async function logKlaviyoMetrics({
  $email,
  $source,
  formId,
  formVersion,
}) {
  const body = JSON.stringify({
    metricGroup: "signup-forms",
    events: [
      {
        submittedFields: {
          $source,
          $email,
          $consent_method: "Klaviyo Form",
          $consent_form_id: formId,
          $consent_form_version: formVersion,
          services: { shopify: { source: "form" } },
        },
        action_type: "Submit Form",
        metric: "submitModal",
        form_id: formId,
        form_version_id: formVersion,
        company_id: "UfYcqy",
        form_type: "EMBED",
        device_type: "DESKTOP",
        hostname: "angelamonacojewelry.com",
        href: "https://angelamonacojewelry.com/",
        page_url: "https://angelamonacojewelry.com/",
      },
    ],
  });
  try {
    await fetch(KLAVIYO_METRICS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
      },
      body,
    });
  } catch (e) {
    console.log(e);
  }
}

export function removeItem(arr, item) {
  if (!arr || !arr.includes(item)) return;
  const itemIndex = arr.findIndex((el) => el === item);
  arr.splice(itemIndex, 1);
}

export function updateState({ detail = {}, dispatcher }) {
  const stateUpdate = new CustomEvent(STATE_UPDATED, {
    bubbles: true,
    detail,
  });
  dispatcher.dispatchEvent(stateUpdate);
}

export function cacheImg(src) {
  const image = new Image();
  image.src = src;
  return image;
}

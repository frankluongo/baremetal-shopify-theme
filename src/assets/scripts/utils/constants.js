export const KLAVIYO_URL = "https://a.klaviyo.com/ajax/subscriptions/subscribe";
export const KLAVIYO_METRICS_URL = "https://telemetrics.klaviyo.com/v1/metric";
export const ENGAGEMENT_GUIDE =
  "https://cdn.shopify.com/s/files/1/2375/7077/files/angela-monaco-jewelry-custom-ring-guide.pdf?268462";
export const klaviyoBaseData = {
  $fields:
    "$source,$email,$consent_method,$consent_form_id,$consent_form_version,services",
  $list_fields: "",
  $timezone_offset: -4,
  $consent_method: "Klaviyo Form",
  services: JSON.stringify({ shopify: { source: "form" } }),
};
export const STATE_UPDATED = "stateUpdated";

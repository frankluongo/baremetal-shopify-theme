import Modal from "./Modal";
import { ENGAGEMENT_GUIDE, klaviyoBaseData } from "./utils/constants";
import { sendToKlaviyo, logKlaviyoMetrics } from "./utils";

export default function EngagementForms() {
  const forms = document.querySelectorAll("[data-engagement-signup-form]");
  if (!forms) return;
  forms.forEach(EngagementForm);
}

function EngagementForm(form) {
  const email = form.querySelector("[data-email]");
  const { formVersion, g, id, $source } = form.dataset;
  const baseData = {
    ...klaviyoBaseData,
    g,
    $source,
    $consent_form_id: id,
    $consent_form_version: formVersion,
  };

  form.addEventListener("submit", onSubmit);

  function onSubmit(e) {
    e.preventDefault();
    if (!email.value) alert("Please enter a valid email address!");
    sendToKlaviyo({
      $email: email.value,
      baseData,
      onFail: alertUserOfError,
      onSuccess: onSuccess.bind(null, email.value),
    });
  }

  function onSuccess($email) {
    trackSignup();
    logKlaviyoMetrics({
      $email,
      $source,
      formId: id,
      formVersion,
    });
    alertUserOfSuccess();
  }

  function alertUserOfSuccess() {
    const content = document.createElement("div");
    content.classList.add("amj-modal__content");
    content.innerHTML = `
    <div class="h2">Success!</div>
    <p class="m-xsmall-top-2 m-xsmall-bottom-2">Thank you for signing up for our Engagement Ring Guide.</p>
    <a class="amj-button" href="${ENGAGEMENT_GUIDE}" target="_blank">Download It Here</a>
    `;
    new Modal({
      content,
      size: "small",
    });
  }

  function alertUserOfError() {
    const content = document.createElement("div");
    content.classList.add("amj-modal__content");
    content.innerHTML = `
    <div class="amj-h2">Uh oh!</div>
    <p class="m-xsmall-top-2 m-xsmall-bottom-2">You may already be subscribed or there could have been something wrong on our end, so here's the guide anyway!</p>
    <a class="amj-button" href="${ENGAGEMENT_GUIDE}" target="_blank">Download It Here</a>
    `;
    new Modal({
      content,
      size: "small",
    });
  }

  function trackSignup() {
    window.fbq("track", "CompleteRegistration", {
      // eslint-disable-next-line camelcase
      mailing_list: "Engagement Ring Guide",
    });
    window.fbq("trackCustom", "EngagementRingGuideSignups");
  }
}

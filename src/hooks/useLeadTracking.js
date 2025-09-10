import { useCallback } from "react";
import ReactGA from "react-ga4";

export const useLeadTracking = () => {
  const normalize = (str) =>
    (str || "")
      .toLowerCase()
      .replace(/[_\s]+/g, "_") // spaces & underscores → single underscore
      .trim();

  const trackButtonClick = useCallback(
    (source, action, propertyType = null) => {
      const normalize = (str) =>
        (str || "")
          .toLowerCase()
          .replace(/[_\s]+/g, "_")
          .trim();

      let eventAction = normalize(action);
      let eventLabel = normalize(source);

      // Pricing buttons → always add propertyType
      if (eventAction.includes("pricing") && propertyType) {
        eventAction = `${eventAction}_${normalize(propertyType)}`;
        // but don’t append propertyType again if source already has it
        if (!eventLabel.includes(normalize(propertyType))) {
          eventLabel = `${eventLabel}_${normalize(propertyType)}`;
        }
      }
      // Enquire now buttons → add source
      else if (eventAction.includes("enquire_now") && source) {
        eventAction = `${eventAction}_${normalize(source)}`;
      }

      // Cleanup duplicate _pricing
      eventAction = eventAction.replace(/(_pricing)+/g, "_pricing");
      eventLabel = eventLabel.replace(/(_pricing)+/g, "_pricing");

      ReactGA.event(eventAction, {
        event_category: "Button Click",
        event_label: eventLabel,
        lead_source: source,
        property_type: propertyType,
        funnel_stage: "interest",
      });
    },
    []
  );

  const trackFormSubmission = useCallback(
    (source, formType, propertyType = null) => {
      let eventAction;

      // Pricing form submissions → include propertyType
      if (propertyType) {
        eventAction = `${formType}_submit_${propertyType}`;
      }
      // Other sources → include source
      else if (source) {
        eventAction = `${formType}_submit_${normalize(source)}`;
      }
      // Fallback
      else {
        eventAction = `${formType}_submit`;
      }

      ReactGA.event({
        category: "Form Submission",
        action: eventAction,
        label: `${source}${propertyType ? ` - ${propertyType}` : ""}`,
        custom_parameters: {
          lead_source: source,
          property_type: propertyType,
          funnel_stage:
            formType === "contact_form" ? "lead" : "site_visit_request",
        },
      });
    },
    []
  );

  const trackFormOpen = useCallback((source, formType, propertyType = null) => {
    let eventAction;

    // Pricing forms → include propertyType
    if (propertyType) {
      eventAction = `${formType}_opened_${propertyType}`;
    }
    // Non-pricing forms → include source
    else if (source) {
      eventAction = `${formType}_opened_${normalize(source)}`;
    }
    // Fallback
    else {
      eventAction = `${formType}_opened`;
    }

    ReactGA.event({
      category: "Form Interaction",
      action: eventAction,
      label:
        propertyType && !normalize(source).includes(normalize(propertyType))
          ? `${source} - ${propertyType}`
          : source,
      custom_parameters: {
        lead_source: source,
        property_type: propertyType,
        funnel_stage: "consideration",
      },
    });
  }, []);

  return {
    trackButtonClick,
    trackFormSubmission,
    trackFormOpen,
  };
};

// Lead source constants
export const LEAD_SOURCES = {
  HERO: "hero_banner",
  OVERVIEW: "overview_section",
  PRICING_1BHK: "pricing_1bhk",
  PRICING_2BHK: "pricing_2bhk",
  PRICING_2_5BHK: "pricing_2_5bhk",
  PRICING_3BHK: "pricing_3bhk",
  MASTER_PLAN: "master_plan_section",
  FOOTER: "footer_section",
  CONTACT_FORM_LINK: "contact_form_internal_link",
  UNKNOWN: "unknown_source",
};

// Property types
export const PROPERTY_TYPES = {
  BHK1: "1_bhk",
  BHK2: "2_bhk",
  BHK2_5: "2_5_bhk",
  BHK3: "3_bhk",
};

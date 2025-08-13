import { useCallback } from "react";
import ReactGA from "react-ga4";

export const useLeadTracking = () => {
  const trackButtonClick = useCallback(
    (source, action, propertyType = null) => {
      ReactGA.event({
        category: "Button Click",
        action: action,
        label: `${source}${propertyType ? ` - ${propertyType}` : ""}`,
        custom_parameters: {
          lead_source: source,
          property_type: propertyType,
          funnel_stage: "interest",
        },
      });
    },
    []
  );

  const trackFormSubmission = useCallback(
    (source, formType, propertyType = null) => {
      ReactGA.event({
        category: "Form Submission",
        action: `${formType}_submit`,
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
    const normalize = (str) =>
      (str || "")
        .toLowerCase()
        .replace(/[_\s]+/g, "") // remove underscores & spaces
        .trim();

    ReactGA.event({
      category: "Form Interaction",
      action: `${formType}_opened`,
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

// Lead source constants - Updated to match your property types
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

// Property types - Updated to match your configurations
export const PROPERTY_TYPES = {
  BHK1: "1_bhk",
  BHK2: "2_bhk",
  BHK2_5: "2_5_bhk",
  BHK3: "3_bhk",
};
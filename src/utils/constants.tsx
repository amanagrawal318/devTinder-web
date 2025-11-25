export const BASE_URL =
  location.hostname === "localhost" ? "http://localhost:5000" : "/api";

export const PREMIUM_PLANS = {
  SILVER: { type: "SILVER", amount: 100 },
  GOLD: { type: "GOLD", amount: 150 },
};
